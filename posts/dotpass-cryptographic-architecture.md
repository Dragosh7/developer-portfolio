---
title: "Cryptographic Architecture of a Zero-Knowledge Password Vault: From PBKDF2 Key Derivation to AES Encryption and k-Anonymity Verification"
date: "2026-09-12"
author: "Dragoș Tecuci"
tags: ["Cryptography", "Python", "PBKDF2", "AES-256", "Zero-Knowledge", "Security Architecture", "UTCN Thesis"]
readingTime: "8 min"
summary: "An engineering deep-dive into the architectural decisions, threat models, and cryptographic primitives behind dotPass — a desktop password vault built with salted PBKDF2 key stretching, AES-256 encryption, and HaveIBeenPwned k-Anonymity breach detection."
---

# Cryptographic Architecture of a Zero-Knowledge Password Vault: From PBKDF2 Key Derivation to AES Encryption and k-Anonymity Verification

Password managers represent one of the most critical trust boundaries in modern software. If a password manager is compromised, every account, API key, and confidential credential stored within it is immediately jeopardized. 

During my Computer Science graduation work at the **Technical University of Cluj-Napoca (UTCN)**, I designed and implemented **dotPass** ([GitHub: Dragosh7/dotPass](https://github.com/Dragosh7/dotPass))—a desktop credential vault engineered around strict **Zero-Knowledge principles**, authenticated symmetric encryption, memory-hard key stretching, and privacy-preserving breach detection.

This article details the underlying threat modeling, cryptographic trade-offs, and architectural paradigms that differentiate a truly secure password manager from a naive database wrapper.

---

## 1. The Zero-Knowledge Threat Model

In cryptographic engineering, security is not defined by features; it is defined by the **threat model** and what the system guarantees under adversarial conditions.

For `dotPass`, the security architecture assumes three primary threat scenarios:
1. **Compromised Host Storage (Offline Attack):** An adversary steals the SQLite database file (`vault.db`) or gains physical access to the device's secondary storage.
2. **Side-Channel & In-Memory Inspection:** Malicious processes running on the user's operating system attempting to dump RAM or sniff cryptographic artifacts.
3. **Network Eavesdropping:** An adversary intercepting outbound traffic when the vault validates credentials against external breach databases.

To withstand these vectors, `dotPass` enforces a **strict Zero-Knowledge invariant**:
> *The master password is never written to disk, never logged, and never transmitted over any network socket. The decryption key exists exclusively in transient memory during active vault access and is derived deterministically from the user's master secret and a cryptographic salt.*

```
 ┌─────────────────────────┐
 │ Master Password (Secret)│
 └───────────┬─────────────┘
             │ + Cryptographic Per-User Salt (16 bytes CSPRNG)
             ▼
 ┌─────────────────────────────────────────────────────────┐
 │ PBKDF2 Key Derivation (HMAC-SHA256, 100,000+ Iterations) │
 └───────────────────────────┬─────────────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
 ┌─────────────────────────┐      ┌─────────────────────────┐
 │ 256-bit Symmetric Key   │      │ Key Verification Token   │
 │ (Transient In-Memory)   │      │ (Salted Hash for Auth)  │
 └──────────┬──────────────┘      └─────────────────────────┘
            │
            ▼
 ┌─────────────────────────────────────────────────────────┐
 │ AES-256 Symmetric Encryption Engine                     │
 │ (Encrypts/Decrypts Records On-Demand in SQLite Vault)   │
 └─────────────────────────────────────────────────────────┘
```

---

## 2. Key Derivation: Why Plain Hashes Fail and PBKDF2 Prevails

A fundamental mistake in amateur credential storage is computing a direct cryptographic hash (such as `SHA-256(password)`) and using the digest as an encryption key.

Modern GPUs and custom ASIC rigs can compute **billions of SHA-256 hashes per second**. If an attacker extracts the encrypted database, a simple SHA-256 key allows offline brute-forcing of standard 8-to-12 character passwords within minutes.

### The Mathematics of Salted PBKDF2
To render brute-force attacks computationally and economically infeasible, `dotPass` utilizes **PBKDF2 (Password-Based Key Derivation Function 2)** with `HMAC-SHA256`:

$$DK = \text{PBKDF2}(\text{PRF}, \text{Password}, \text{Salt}, c, dkLen)$$

Where:
- **PRF:** Pseudorandom function (`HMAC-SHA256`).
- **Salt:** 16 bytes of high-entropy random data generated via the operating system's Cryptographically Secure Pseudorandom Number Generator (`secrets.token_bytes(16)`). The salt prevents precomputed **Rainbow Table attacks** and ensures that identical passwords yield distinct encryption keys across different users.
- **Iteration Count ($c$):** Configured to **100,000+ iterations**. This forces an adversary attempting an offline dictionary attack to compute 100,000 chained HMAC operations for every single password candidate, increasing attack time from microseconds to multi-millennia for complex passphrases.
- **Key Length ($dkLen$):** 32 bytes (256 bits) perfectly matching the key requirements of AES-256.

```python
import os
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend

def derive_vault_key(master_password: str, salt: bytes) -> bytes:
    """
    Derives a 256-bit AES symmetric key from the master password using PBKDF2-HMAC-SHA256.
    Enforces a minimum iteration factor of 100,000 cycles.
    """
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100_000,
        backend=default_backend()
    )
    return kdf.derive(master_password.encode('utf-8'))
```

While newer memory-hard functions like **Argon2id** offer superior resistance against memory-constrained ASIC attacks, PBKDF2 with HMAC-SHA256 provides universal cross-platform compatibility without external C-extension binary compilation bottlenecks, ensuring flawless execution across Linux, Windows, and macOS desktops.

---

## 3. Symmetric Vault Encryption: Authenticated Cipher Architecture

Once the 256-bit encryption key is derived, individual credentials (usernames, passwords, secure notes, TOTP seeds) must be encrypted before serialization into the SQLite relational schema.

### CBC vs. GCM / Fernet: The Need for Authenticity
Standard block cipher modes like **CBC (Cipher Block Chaining)** provide confidentiality, but they do NOT guarantee **integrity**. Under CBC mode, an adversary who modifies ciphertext bits without knowing the key can induce predictable plaintext changes upon decryption (malleability) or mount **Padding Oracle Attacks**.

`dotPass` incorporates authenticated symmetric encryption (Fernet / AES-CBC + HMAC-SHA256 or AES-256-GCM):
1. **IV (Initialization Vector):** 16 bytes of fresh random IV per record, preventing identical plaintexts from producing identical ciphertexts.
2. **Encryption:** Plaintext is padded and encrypted via 256-bit AES.
3. **Authentication Tag (MAC):** An HMAC-SHA256 signature is calculated over the IV and ciphertext. If any byte in the database is tampered with, signature verification fails immediately before decryption is even attempted.

```
       Plaintext Record ───► [ AES-256 Encrypt (Key, IV) ] ───► Ciphertext
                                                                   │
                                     [ HMAC-SHA256 Signature ] ◄──┤
                                                │                  ▼
                                                └─────────► Final Vault Payload
                                                            [IV + Ciphertext + MAC]
```

---

## 4. Privacy-Preserving Breach Verification via k-Anonymity

One of `dotPass`'s flagship security features is automated breach detection: warning the user if their stored credentials have been exposed in known public data breaches.

However, sending stored passwords—or even full hashes of passwords—to an external REST API (such as HaveIBeenPwned) would fundamentally violate Zero-Knowledge principles.

### The k-Anonymity Mathematical Model
To solve this dilemma, `dotPass` implements **Troy Hunt's k-Anonymity protocol**:

1. When checking password $P$, the client calculates its full SHA-1 digest:
   $$\text{Hash} = \text{SHA1}(P)$$
   *(e.g., `21BD84B15C...`)*
2. The client splits the hash into a **5-character prefix** and a **35-character suffix**:
   - Prefix: `21BD8`
   - Suffix: `4B15C...`
3. The client queries the API sending **ONLY the 5-character prefix**:
   `GET https://api.pwnedpasswords.com/range/21BD8`
4. The API returns a list of *all* compromised hash suffixes starting with that 5-character prefix (typically 400–600 candidates), along with their breach prevalence count.
5. The client searches the received candidate list **locally in memory** for its matching suffix.

```
 Client Vault                                   HaveIBeenPwned API
 ────────────                                   ──────────────────
 SHA-1("MySecretPass")
 = 21BD8 4B15C...
      │
      │ 1. Sends ONLY 5-char prefix: "21BD8"
      ├───────────────────────────────────────────────► 
      │                                                Searches database for
      │                                                prefix "21BD8"...
      │ 2. Returns ~500 anonymous matching suffixes
      │    [ 01A2F... : 12, 4B15C... : 4, ... ]
      ◄───────────────────────────────────────────────┤
      │
 Local Memory Match:
 Found suffix "4B15C..." with count 4!
 -> Alert user: "Password exposed in 4 breaches!"
 (Plaintext never left the client computer!)
```

Through this protocol, **the remote server never learns what password the user is testing**, nor can network eavesdroppers deduce the credential. True privacy is mathematically guaranteed.

---

## 5. Defense-in-Depth: Intrusion Detection & Real-Time Alerts

Beyond static vault encryption, `dotPass` integrates dynamic telemetry and defensive tripwires:

- **Brute-Force Lockout:** Tracking failed decryption attempts with exponential backoff timers.
- **Geographic & SMS Alerts:** When an abnormal unlock attempt is detected (e.g., from an unverified IP or device context), the system triggers asynchronous notification hooks via external REST APIs, dispatching an immediate SMS alert to the user's verified phone number with geo-coordinates.
- **Cryptographic Password Generator:** Passwords generated within `dotPass` utilize system entropy sources (`secrets.choice`) rather than standard pseudorandom seeds (`random`), preventing PRNG state reconstruction.

---

## 6. Engineering Takeaways

Building `dotPass` reinforced several core principles that guide my software engineering and QA philosophy:

1. **Don't Roll Your Own Cryptography:** Rely on audited, battle-tested standard libraries (`cryptography`, standard NIST primitives) rather than inventing proprietary obfuscation algorithms.
2. **Shift Security Left:** Architectural decisions made during database design (such as storing independent salts per record and enforcing authenticated ciphertext envelopes) cannot be easily bolted on later.
3. **Verify Edge Cases with Chaos Testing:** In automated test suites, test what happens when network payloads are interrupted, when keys are misaligned by 1 bit, or when database files are corrupted. A resilient vault must fail safely and closed.

The complete open-source codebase for `dotPass` is available on GitHub:
👉 **[github.com/Dragosh7/dotPass](https://github.com/Dragosh7/dotPass)**
