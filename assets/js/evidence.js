/**
 * ==============================================================================
 * DRAGOȘ TECUCI — WORK EVIDENCE & INTERVENTION TRACKER
 * Dedicated Standalone Registry Engine (evidence.js)
 * 
 * Features:
 *   - Zero External Dependencies: Pure Vanilla JavaScript (ES2022+)
 *   - Embedded Fallback Store: Exact seed data from evidence.json for zero-CORS file:/// support
 *   - LocalStorage Synchronization: Real-time persistence across browser sessions
 *   - PIN Security Gate: 4-digit input with auto-advance, backspace, paste, show/hide, shake physics
 *   - Real-time Dynamic Analytics: Recalculates Total Jobs, Completed, Total Revenue, Avg Thermal Drop
 *   - Real-time Multi-field Search & Category/Status Filter Engine
 *   - Full CRUD: Add, Edit, Delete, View Details with dynamic ID generator
 *   - Dual Export Tools: CSV with Excel UTF-8 BOM & Formatted JSON Backup
 *   - Physical Print Receipt Engine: Immaculate @media print handover sheet
 *   - Dark/Light Theme Engine synchronized with dt-portfolio-theme
 *   - Interactive Toast Notification System
 * ==============================================================================
 */

(function () {
  'use strict';

  /* ============================================================================
     1. CONSTANTS & SEED DATA (Embedded Fallback Store)
     ============================================================================ */
  const STORAGE_KEY = 'dt_evidence_data';
  const PIN_STORAGE_KEY = 'dt_evidence_pin';
  const SESSION_AUTH_KEY = 'dt_evidence_auth';
  const THEME_STORAGE_KEY = 'dt-portfolio-theme';
  const DEFAULT_PIN = '6969X';

  /**
   * Seed data mirroring data/evidence.json.
   * Guarantees 100% reliable boot even via file:/// protocol without CORS issues.
   */
  const SEED_EVIDENCE = [
    {
      id: "EV-2026-001",
      date: "2026-08-14",
      clientName: "Mihai Popescu",
      clientPhone: "+40 742 123 456",
      deviceModel: "Lenovo Legion Y540-15IRH",
      category: "Combo",
      issuesReported: "Supraîncălzire agresivă în jocuri (atingea 95°C pe CPU), scăderi majore de cadre (thermal throttling), ventilatoare la turație maximă continuă și zgomot asurzitor.",
      actionsTaken: "Demontare completă heatsink dual-fan. Desfundare radiatoare cupru pline de praf dens. Curățare pastă uscată de pe CPU și GPU cu alcool izopropilic 99.9%. Aplicare pastă termică premium Arctic MX-6. Reasamblare și strângere în cruce a șuruburilor heatsink. Test de stabilitate Cinebench R23 + FurMark la predare în prezența clientului.",
      tempBefore: 95,
      tempAfter: 69,
      thermalDrop: 26,
      price: 220,
      status: "Delivered",
      notes: "Predat clientului în cartierul Mănăștur. Clientul a asistat la testul de stres și a confirmat scăderea temperaturii cu 26°C și dispariția completă a căderilor de cadre în jocuri. Garanție 30 de zile suport post-intervenție inclus.",
      imagePlaceholder: "assets/images/gallery/work-1.jpg"
    },
    {
      id: "EV-2026-002",
      date: "2026-08-22",
      clientName: "Andreea Mureșan",
      clientPhone: "+40 748 765 432",
      deviceModel: "Dell Latitude 5420",
      category: "Combo",
      issuesReported: "Laptop de lucru lent la pornire (peste 90 secunde până la încărcarea desktop-ului), ventilator pornit zgomotos chiar și în repaus, memorie RAM insuficientă pentru fișiere mari de analiză financiară.",
      actionsTaken: "Curățare fizică de praf a ventilatorului și a carcasei slim. Curățare pastă uscată și aplicare compus termic Arctic MX-4. Upgrade memorie RAM de la 8GB la 32GB DDR4 dual-channel. Clonare bit-perfect de pe vechiul SSD lent pe un modul NVMe Samsung 980 1TB de înaltă viteză. Curățare cache de sistem și optimizare programe de startup.",
      tempBefore: 89,
      tempAfter: 62,
      thermalDrop: 27,
      price: 260,
      status: "Delivered",
      notes: "Intervenție finalizată în 3 ore în Zorilor. Timpul de pornire la rece a scăzut la sub 8 secunde. Test de memorie MemTest86 trecut cu 0 erori. Clienta foarte mulțumită de silențiozitatea în apelurile Teams.",
      imagePlaceholder: "assets/images/gallery/work-3.jpg"
    },
    {
      id: "EV-2026-003",
      date: "2026-09-02",
      clientName: "Radu Moldovan",
      clientPhone: "+40 751 234 567",
      deviceModel: "Asus ROG Strix G15 G512",
      category: "Hardware",
      issuesReported: "Temperaturi CPU de 93°C în sarcină, suprafața tastaturii frigea la atingere în zona tastelor WASD, ventilatorul din dreapta fluiera din cauza impurităților acumulate.",
      actionsTaken: "Dezasamblare atentă a carcasei și a modulului de răcire ROG. Îndepărtare puf și scame acumulate între palele ventilatoarelor și fantele de evacuare din cupru. Curățare reziduuri pastă veche de pe CPU și GPU dedicat. Aplicare pastă termică de înaltă performanță Noctua NT-H1. Reasamblare precisă și verificare contact termic.",
      tempBefore: 93,
      tempAfter: 68,
      thermalDrop: 25,
      price: 180,
      status: "Delivered",
      notes: "Test termic live la predare în cartierul Mănăștur. Tastatura rămâne complet rece la atingere, temperaturile maxime s-au stabilizat la 68°C în sarcină susținută de randare.",
      imagePlaceholder: "assets/images/gallery/work-2.jpg"
    },
    {
      id: "EV-2026-004",
      date: "2026-09-09",
      clientName: "Ioana Sas",
      clientPhone: "+40 740 987 654",
      deviceModel: "HP Pavilion Gaming 15-dk",
      category: "Software",
      issuesReported: "Infecție masivă cu programe de tip browser hijacker și adware, reclame pop-up nesolicitate pe desktop, instabilitate a sistemului de operare cu crash-uri frecvente și consum CPU de 100% în repaus.",
      actionsTaken: "Salvare completă de siguranță a documentelor, proiectelor de facultate și fotografiilor pe mediu extern criptat. Formatare curată și repartiționare GPT/UEFI. Instalare Windows 11 curat cu pachet oficial de drivere HP. Configurare suită Microsoft Office completă, browsere securizate cu protecție ad-block, utilitare de arhivare și securitate. Restaurare date cu verificare checksum.",
      tempBefore: 78,
      tempAfter: 54,
      thermalDrop: 24,
      price: 150,
      status: "Delivered",
      notes: "Predare în Mărăști. Sistemul a revenit la un consum normal de 1-2% CPU în repaus. Datele personale au fost restaurate intacte. Oferit ghid de bune practici pentru securitate web.",
      imagePlaceholder: "assets/images/gallery/work-4.jpg"
    },
    {
      id: "EV-2026-005",
      date: "2026-09-15",
      clientName: "Cristian Dumitrescu",
      clientPhone: "+40 745 345 678",
      deviceModel: "Custom Desktop PC (AMD Ryzen 5 5600X, RTX 3070)",
      category: "Combo",
      issuesReported: "PC-ul de editare video și gaming atingea 84°C pe procesor în randare DaVinci Resolve 4K, declanșând throttling pe placa video. Filtrele de praf ale carcasei erau complet îmbâcsite, iar traseul de aer era blocat de cabluri neorganizate.",
      actionsTaken: "Curățare profundă completă a carcasei și componentelor folosind aer uscat de înaltă presiune și pensule antistatice ESD. Spălare și uscare filtre magnetice de praf. Re-cablare profesională completă pe spatele carcasei pentru deblocarea fluxului de aer frontal. Înlocuire pastă termică pe procesor (cooler turn DeepCool) și placa video RTX 3070 cu Arctic MX-6. Reconfigurare curbă PWM ventilatoare din BIOS pentru funcționare silențioasă. Sesiune stres de 45 de minute AIDA64 + FurMark.",
      tempBefore: 84,
      tempAfter: 59,
      thermalDrop: 25,
      price: 200,
      status: "Completed",
      notes: "Predat clientului în Gheorgheni. În sarcină susținută de export video 4K temperaturile au scăzut de la 84°C la 59°C, sistemul devenind aproape inaudibil în timpul muncii.",
      imagePlaceholder: "assets/images/gallery/work-6.jpg"
    }
  ];

  /* State Variables */
  let registryData = [];
  let currentlySelectedJobId = null;

  /* ============================================================================
     2. UTILITY & TOAST NOTIFICATION HELPERS
     ============================================================================ */

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function showToast(message, type = 'success') {
    let container = document.getElementById('evidenceToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'evidenceToastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';

    const iconColor = type === 'error' ? 'var(--temp-hot)' : 'var(--accent-emerald)';
    const iconSvg = type === 'error' 
      ? `<svg class="toast-icon" style="stroke: ${iconColor};" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
      : `<svg class="toast-icon" style="stroke: ${iconColor};" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

    toast.innerHTML = `
      ${iconSvg}
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('toast-show');
    });

    setTimeout(() => {
      toast.classList.remove('toast-show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3200);
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('ro-RO').format(amount) + ' RON';
  }

  function truncateText(str, maxLength = 65) {
    if (!str) return '';
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength).trim() + '...';
  }

  /* ============================================================================
     3. LOCALSTORAGE SYNCHRONIZATION
     ============================================================================ */

  function loadRegistryData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          registryData = parsed;
          return;
        }
      }
    } catch (e) {
      console.warn('Eroare la citirea din LocalStorage, se utilizează seed fallback:', e);
    }

    // Default initialization with seed data
    registryData = JSON.parse(JSON.stringify(SEED_EVIDENCE));
    saveRegistryData();
  }

  function saveRegistryData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registryData));
    } catch (e) {
      console.error('Nu s-a putut salva în LocalStorage:', e);
      showToast('Eroare la salvarea datelor în LocalStorage!', 'error');
    }
  }

  function restoreSeedData() {
    if (confirm('Sigur doriți să reinițializați datele cu cele 5 înregistrări demonstrative originale? Orice modificare locală nesalvată extern va fi rescrisă.')) {
      registryData = JSON.parse(JSON.stringify(SEED_EVIDENCE));
      saveRegistryData();
      renderAll();
      showToast('Datele demonstrative au fost restaurate cu succes!');
    }
  }

  /* ============================================================================
     4. PIN GATE AUTHENTICATION & SECURITY
     ============================================================================ */

  function getStoredPin() {
    return localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN;
  }

  function setStoredPin(newPin) {
    localStorage.setItem(PIN_STORAGE_KEY, newPin);
  }

  function isSessionAuthenticated() {
    return sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
  }

  function markSessionAuthenticated() {
    sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
  }

  function clearSessionAuthentication() {
    sessionStorage.removeItem(SESSION_AUTH_KEY);
  }

  function initPinGate() {
    const overlay = document.getElementById('pinGateOverlay');
    const card = document.getElementById('pinGateCard');
    const inputGroup = document.getElementById('pinInputGroup');
    const digitInputs = document.querySelectorAll('.pin-digit-input');
    const btnUnlock = document.getElementById('btnPinUnlock');
    const btnTogglePin = document.getElementById('btnTogglePinVisibility');
    const errorMsg = document.getElementById('pinErrorMessage');
    const btnLock = document.getElementById('btnLockRegistry');

    if (!overlay || !card || digitInputs.length === 0) return;

    // Check if user is already authenticated in current session
    if (isSessionAuthenticated()) {
      overlay.classList.add('is-hidden');
    } else {
      overlay.classList.remove('is-hidden');
      setTimeout(() => {
        digitInputs[0].focus();
      }, 200);
    }

    // Toggle Pin Visibility
    let isPinVisible = false;
    if (btnTogglePin) {
      btnTogglePin.addEventListener('click', () => {
        isPinVisible = !isPinVisible;
        digitInputs.forEach(input => {
          input.type = isPinVisible ? 'text' : 'password';
        });
        const label = document.getElementById('pinToggleLabel');
        if (label) {
          label.textContent = isPinVisible ? 'Ascunde PIN' : 'Afișează PIN';
        }
        const eyeIcon = document.getElementById('pinEyeIcon');
        if (eyeIcon) {
          eyeIcon.innerHTML = isPinVisible
            ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>'
            : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
        }
      });
    }

    function getEnteredPin() {
      let pin = '';
      digitInputs.forEach(input => {
        pin += input.value.trim();
      });
      return pin;
    }

    function clearInputs() {
      digitInputs.forEach(input => {
        input.value = '';
      });
      if (digitInputs[0]) {
        digitInputs[0].focus();
      }
    }

    function triggerShake() {
      card.classList.add('shake');
      inputGroup.classList.add('shake');
      errorMsg.textContent = 'Cod PIN incorect. Vă rugăm să încercați din nou.';

      clearInputs();

      setTimeout(() => {
        card.classList.remove('shake');
        inputGroup.classList.remove('shake');
      }, 500);
    }

    // Inactivity timeout: 15 minutes
    let inactivityTimer = null;
    const INACTIVITY_LIMIT_MS = 15 * 60 * 1000;

    function resetInactivityTimer() {
      if (!isSessionAuthenticated()) return;
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (isSessionAuthenticated()) {
          clearSessionAuthentication();
          overlay.classList.remove('is-hidden');
          clearInputs();
          showToast('Sesiune expirată din motive de securitate (inactivitate 15 min). Registrul a fost blocat.');
        }
      }, INACTIVITY_LIMIT_MS);
    }

    function startInactivityTimer() {
      ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'].forEach(evt => {
        window.addEventListener(evt, resetInactivityTimer, { passive: true });
      });
      resetInactivityTimer();
    }

    if (isSessionAuthenticated()) {
      startInactivityTimer();
    }

    function attemptUnlock() {
      const entered = getEnteredPin().trim().toUpperCase();
      const validPin = getStoredPin().trim().toUpperCase();
      if (entered.length < validPin.length) {
        errorMsg.textContent = `Introduceți codul complet (${validPin.length} caractere).`;
        return;
      }

      if (entered === validPin) {
        errorMsg.textContent = '';
        markSessionAuthenticated();
        overlay.classList.add('is-hidden');
        showToast('Acces autorizat. Registrul de intervenții este deblocat.');
        startInactivityTimer();
        
        // Focus search bar
        const searchInput = document.getElementById('evidenceSearchInput');
        if (searchInput) {
          setTimeout(() => searchInput.focus(), 250);
        }
      } else {
        triggerShake();
      }
    }

    // Event listeners for digit/char inputs
    digitInputs.forEach((input, index) => {
      input.addEventListener('input', e => {
        const val = e.target.value;
        if (val.length > 0) {
          // Keep only the last character, uppercase it, filter alphanumeric
          const cleanChar = val.slice(-1).toUpperCase().replace(/[^0-9A-Z]/g, '');
          input.value = cleanChar;
          
          if (cleanChar && index < digitInputs.length - 1) {
            digitInputs[index + 1].focus();
          }

          // If all characters entered, auto-attempt unlock
          const currentPin = getEnteredPin();
          const targetLen = getStoredPin().length || 5;
          if (currentPin.length === targetLen) {
            attemptUnlock();
          }
        }
      });

      input.addEventListener('keydown', e => {
        if (e.key === 'Backspace') {
          if (!input.value && index > 0) {
            digitInputs[index - 1].focus();
            digitInputs[index - 1].value = '';
          }
        } else if (e.key === 'ArrowLeft' && index > 0) {
          digitInputs[index - 1].focus();
        } else if (e.key === 'ArrowRight' && index < digitInputs.length - 1) {
          digitInputs[index + 1].focus();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          attemptUnlock();
        }
      });

      // Handle paste
      input.addEventListener('paste', e => {
        e.preventDefault();
        const pastedData = (e.clipboardData || window.clipboardData).getData('text');
        const chars = pastedData.toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, digitInputs.length);
        if (chars.length > 0) {
          chars.split('').forEach((c, i) => {
            if (digitInputs[i]) {
              digitInputs[i].value = c;
            }
          });
          const targetLen = getStoredPin().length || 5;
          if (chars.length === targetLen) {
            attemptUnlock();
          } else if (digitInputs[chars.length]) {
            digitInputs[chars.length].focus();
          }
        }
      });
    });

    if (btnUnlock) {
      btnUnlock.addEventListener('click', attemptUnlock);
    }

    // Lock Registry button
    if (btnLock) {
      btnLock.addEventListener('click', () => {
        clearSessionAuthentication();
        overlay.classList.remove('is-hidden');
        clearInputs();
        errorMsg.textContent = '';
        showToast('Panoul a fost blocat cu succes.');
      });
    }
  }

  /* ============================================================================
     5. REAL-TIME DYNAMIC KPI CALCULATIONS
     ============================================================================ */

  function updateKpiStats() {
    const kpiTotal = document.getElementById('kpiTotalJobs');
    const kpiCompleted = document.getElementById('kpiCompletedJobs');
    const kpiCompletedRate = document.getElementById('kpiCompletedRate');
    const kpiRevenue = document.getElementById('kpiTotalRevenue');
    const kpiAvgDrop = document.getElementById('kpiAvgThermalDrop');

    const totalJobs = registryData.length;

    // Completed & Delivered count
    const completedJobs = registryData.filter(job => {
      const st = (job.status || '').toLowerCase();
      return st === 'delivered' || st === 'completed';
    }).length;

    const rate = totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 100;

    // Total Revenue (sum of prices in RON)
    const totalRevenue = registryData.reduce((acc, job) => {
      const p = parseFloat(job.price) || 0;
      return acc + p;
    }, 0);

    // Average Thermal Reduction (°C)
    const thermalJobs = registryData.filter(job => {
      const drop = job.thermalDrop !== undefined && job.thermalDrop !== null
        ? parseFloat(job.thermalDrop)
        : (parseFloat(job.tempBefore) - parseFloat(job.tempAfter));
      return !isNaN(drop) && drop > 0;
    });

    let avgThermalDrop = 0;
    if (thermalJobs.length > 0) {
      const sumDrop = thermalJobs.reduce((acc, job) => {
        const drop = job.thermalDrop !== undefined && job.thermalDrop !== null
          ? parseFloat(job.thermalDrop)
          : (parseFloat(job.tempBefore) - parseFloat(job.tempAfter));
        return acc + drop;
      }, 0);
      avgThermalDrop = (sumDrop / thermalJobs.length).toFixed(1);
    }

    if (kpiTotal) kpiTotal.textContent = totalJobs;
    if (kpiCompleted) kpiCompleted.textContent = completedJobs;
    if (kpiCompletedRate) kpiCompletedRate.innerHTML = `<span>${rate}% rată succes</span>`;
    if (kpiRevenue) kpiRevenue.textContent = formatCurrency(totalRevenue);
    if (kpiAvgDrop) kpiAvgDrop.textContent = avgThermalDrop > 0 ? `-${avgThermalDrop} °C` : '0.0 °C';
  }

  /* ============================================================================
     6. TABLE RENDERING & FILTER ENGINE
     ============================================================================ */

  function getStatusBadge(status) {
    const s = (status || '').toLowerCase();
    if (s === 'delivered') {
      return `<span class="status-pill status-delivered"><span class="status-dot-sm"></span>Predat</span>`;
    } else if (s === 'completed') {
      return `<span class="status-pill status-completed"><span class="status-dot-sm"></span>Finalizat</span>`;
    } else {
      return `<span class="status-pill status-progress"><span class="status-dot-sm"></span>În Lucru</span>`;
    }
  }

  function getCategoryBadge(category) {
    const c = (category || '').toLowerCase();
    if (c === 'combo') {
      return `<span class="category-badge category-combo">Combo</span>`;
    } else if (c === 'hardware') {
      return `<span class="category-badge category-hardware">Hardware</span>`;
    } else if (c === 'software') {
      return `<span class="category-badge category-software">Software</span>`;
    }
    return `<span class="category-badge">${escapeHtml(category || 'General')}</span>`;
  }

  function getThermalBadge(job) {
    const before = parseFloat(job.tempBefore);
    const after = parseFloat(job.tempAfter);
    const drop = job.thermalDrop !== undefined && job.thermalDrop !== null
      ? parseFloat(job.thermalDrop)
      : (!isNaN(before) && !isNaN(after) ? before - after : null);

    if (!isNaN(before) && !isNaN(after) && before > 0 && after > 0) {
      const dropTag = drop && drop > 0 ? `<span class="temp-drop-tag">-${drop}°C</span>` : '';
      const hotPct = Math.min(100, Math.max(10, Math.round((before / 105) * 100)));
      const coolPct = Math.min(100, Math.max(10, Math.round((after / 105) * 100)));
      return `
        <div class="temp-table-badge">
          <div class="temp-badge-row">
            <span style="color: var(--temp-hot, #f43f5e); font-weight: 600;">${before}°C</span>
            <span style="color: var(--text-tertiary, #94a3b8);">→</span>
            <span style="color: var(--temp-cool, #10b981); font-weight: 600;">${after}°C</span>
            ${dropTag}
          </div>
          <!-- Visual Thermal Delta Meter Track [5.2] -->
          <div class="thermal-meter-track" title="Temp: ${before}°C ➔ ${after}°C (-${drop}°C)">
            <div class="thermal-meter-fill-hot" style="width: ${hotPct}%;"></div>
            <div class="thermal-meter-fill-cool" style="width: ${coolPct}%;"></div>
          </div>
        </div>
      `;
    }
    return `<span style="color: var(--text-muted); font-family: var(--font-mono); font-size: 0.75rem;">—</span>`;
  }

  function filterRegistryData() {
    const searchInput = document.getElementById('evidenceSearchInput');
    const categorySelect = document.getElementById('evidenceCategoryFilter');
    const statusSelect = document.getElementById('evidenceStatusFilter');

    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const cat = categorySelect ? categorySelect.value : 'all';
    const stat = statusSelect ? statusSelect.value : 'all';

    return registryData.filter(job => {
      // Category filter
      if (cat !== 'all') {
        if ((job.category || '').toLowerCase() !== cat.toLowerCase()) {
          return false;
        }
      }

      // Status filter
      if (stat !== 'all') {
        if ((job.status || '').toLowerCase() !== stat.toLowerCase()) {
          return false;
        }
      }

      // Search query across fields
      if (query) {
        const matchesName = (job.clientName || '').toLowerCase().includes(query);
        const matchesPhone = (job.clientPhone || '').toLowerCase().includes(query);
        const matchesDevice = (job.deviceModel || '').toLowerCase().includes(query);
        const matchesId = (job.id || '').toLowerCase().includes(query);
        const matchesIssues = (job.issuesReported || '').toLowerCase().includes(query);
        const matchesActions = (job.actionsTaken || '').toLowerCase().includes(query);
        const matchesNotes = (job.notes || '').toLowerCase().includes(query);

        if (!matchesName && !matchesPhone && !matchesDevice && !matchesId && !matchesIssues && !matchesActions && !matchesNotes) {
          return false;
        }
      }

      return true;
    });
  }

  function renderTable() {
    const tbody = document.getElementById('evidenceTableBody');
    const emptyState = document.getElementById('evidenceEmptyState');
    if (!tbody) return;

    const filtered = filterRegistryData();

    if (filtered.length === 0) {
      tbody.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    tbody.innerHTML = filtered.map(job => {
      return `
        <tr data-job-id="${escapeHtml(job.id)}">
          <td class="td-id">${escapeHtml(job.id)}</td>
          <td style="font-family: var(--font-mono); font-size: 0.75rem;">${escapeHtml(job.date)}</td>
          <td>
            <div class="td-client">${escapeHtml(job.clientName)}</div>
            <span class="td-client-phone">${escapeHtml(job.clientPhone)}</span>
          </td>
          <td class="td-device">${escapeHtml(job.deviceModel)}</td>
          <td>${getCategoryBadge(job.category)}</td>
          <td style="max-width: 240px; white-space: normal; line-height: 1.35;" title="${escapeHtml(job.actionsTaken)}">
            ${escapeHtml(truncateText(job.actionsTaken, 70))}
          </td>
          <td>${getThermalBadge(job)}</td>
          <td class="td-price">${formatCurrency(job.price || 0)}</td>
          <td>${getStatusBadge(job.status)}</td>
          <td style="text-align: right;">
            <div class="table-actions" style="justify-content: flex-end;">
              <!-- View Details -->
              <button type="button" class="btn-table-action action-view" data-action="view" data-id="${escapeHtml(job.id)}" title="Vezi Detalii Complete / View Details" aria-label="Detalii ${escapeHtml(job.id)}">
                <svg viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
              <!-- Edit -->
              <button type="button" class="btn-table-action action-edit" data-action="edit" data-id="${escapeHtml(job.id)}" title="Editează Intervenția / Edit Job" aria-label="Editează ${escapeHtml(job.id)}">
                <svg viewBox="0 0 24 24">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <!-- Print Receipt -->
              <button type="button" class="btn-table-action action-print" data-action="print" data-id="${escapeHtml(job.id)}" title="Printează Fișă Service / Print Receipt" aria-label="Printează ${escapeHtml(job.id)}">
                <svg viewBox="0 0 24 24">
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
              </button>
              <!-- Delete -->
              <button type="button" class="btn-table-action action-delete" data-action="delete" data-id="${escapeHtml(job.id)}" title="Șterge Înregistrarea / Delete Job" aria-label="Șterge ${escapeHtml(job.id)}">
                <svg viewBox="0 0 24 24">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderAll() {
    updateKpiStats();
    renderTable();
  }

  /* ============================================================================
     7. CRUD OPERATIONS: ADD & EDIT MODAL
     ============================================================================ */

  function generateNextId() {
    let maxNum = 0;
    const currentYear = new Date().getFullYear();
    const prefix = `EV-${currentYear}-`;

    registryData.forEach(item => {
      if (item.id && typeof item.id === 'string') {
        const parts = item.id.split('-');
        if (parts.length === 3) {
          const num = parseInt(parts[2], 10);
          if (!isNaN(num) && num > maxNum) {
            maxNum = num;
          }
        }
      }
    });

    const nextNum = String(maxNum + 1).padStart(3, '0');
    return `${prefix}${nextNum}`;
  }

  function openJobModal(mode = 'add', jobId = null) {
    const backdrop = document.getElementById('jobModalBackdrop');
    const form = document.getElementById('jobForm');
    const title = document.getElementById('jobModalTitle');
    if (!backdrop || !form) return;

    form.reset();
    document.getElementById('formJobId').value = '';

    if (mode === 'add') {
      title.textContent = 'Adaugă Intervenție Nouă';
      // Set default today's date
      const today = new Date().toISOString().split('T')[0];
      document.getElementById('formDate').value = today;
      document.getElementById('formStatus').value = 'Completed';
      document.getElementById('formCategory').value = 'Combo';
    } else if (mode === 'edit' && jobId) {
      const job = registryData.find(j => j.id === jobId);
      if (!job) {
        showToast('Intervenția nu a fost găsită.', 'error');
        return;
      }
      title.textContent = `Editează Intervenția ${job.id}`;
      document.getElementById('formJobId').value = job.id;
      document.getElementById('formClientName').value = job.clientName || '';
      document.getElementById('formClientPhone').value = job.clientPhone || '';
      document.getElementById('formDeviceModel').value = job.deviceModel || '';
      document.getElementById('formCategory').value = job.category || 'Combo';
      document.getElementById('formDate').value = job.date || '';
      document.getElementById('formStatus').value = job.status || 'Completed';
      document.getElementById('formPrice').value = job.price !== undefined ? job.price : '';
      document.getElementById('formTempBefore').value = job.tempBefore !== undefined ? job.tempBefore : '';
      document.getElementById('formTempAfter').value = job.tempAfter !== undefined ? job.tempAfter : '';
      document.getElementById('formIssuesReported').value = job.issuesReported || '';
      document.getElementById('formActionsTaken').value = job.actionsTaken || '';
      document.getElementById('formNotes').value = job.notes || '';
    }

    backdrop.classList.add('is-active');
    setTimeout(() => {
      document.getElementById('formClientName').focus();
    }, 150);
  }

  function closeJobModal() {
    const backdrop = document.getElementById('jobModalBackdrop');
    if (backdrop) backdrop.classList.remove('is-active');
  }

  function saveJobForm() {
    const form = document.getElementById('jobForm');
    if (!form) return;

    const idInput = document.getElementById('formJobId').value;
    const clientName = document.getElementById('formClientName').value.trim();
    const clientPhone = document.getElementById('formClientPhone').value.trim();
    const deviceModel = document.getElementById('formDeviceModel').value.trim();
    const category = document.getElementById('formCategory').value;
    const date = document.getElementById('formDate').value;
    const status = document.getElementById('formStatus').value;
    const priceRaw = document.getElementById('formPrice').value;
    const tempBeforeRaw = document.getElementById('formTempBefore').value;
    const tempAfterRaw = document.getElementById('formTempAfter').value;
    const issuesReported = document.getElementById('formIssuesReported').value.trim();
    const actionsTaken = document.getElementById('formActionsTaken').value.trim();
    const notes = document.getElementById('formNotes').value.trim();

    // Form Validations
    if (!clientName || !clientPhone || !deviceModel || !date || !priceRaw || !issuesReported || !actionsTaken) {
      showToast('Vă rugăm să completați toate câmpurile obligatorii (*)', 'error');
      return;
    }

    const price = parseFloat(priceRaw) || 0;
    const tempBefore = tempBeforeRaw !== '' ? parseFloat(tempBeforeRaw) : null;
    const tempAfter = tempAfterRaw !== '' ? parseFloat(tempAfterRaw) : null;
    const thermalDrop = (tempBefore !== null && tempAfter !== null) ? Math.max(0, tempBefore - tempAfter) : null;

    if (idInput) {
      // Edit existing job
      const index = registryData.findIndex(j => j.id === idInput);
      if (index !== -1) {
        registryData[index] = {
          ...registryData[index],
          clientName,
          clientPhone,
          deviceModel,
          category,
          date,
          status,
          price,
          tempBefore,
          tempAfter,
          thermalDrop,
          issuesReported,
          actionsTaken,
          notes
        };
        saveRegistryData();
        renderAll();
        closeJobModal();
        showToast(`Intervenția ${idInput} a fost actualizată!`);
      }
    } else {
      // Add new job
      const newId = generateNextId();
      const newJob = {
        id: newId,
        date,
        clientName,
        clientPhone,
        deviceModel,
        category,
        issuesReported,
        actionsTaken,
        tempBefore,
        tempAfter,
        thermalDrop,
        price,
        status,
        notes
      };

      // Add to beginning of registry
      registryData.unshift(newJob);
      saveRegistryData();
      renderAll();
      closeJobModal();
      showToast(`Intervenția ${newId} a fost salvată cu succes!`);
    }
  }

  function deleteJob(jobId) {
    const job = registryData.find(j => j.id === jobId);
    if (!job) return;

    const confirmMsg = `Sigur doriți să ștergeți intervenția ${job.id} (${job.clientName} — ${job.deviceModel})?\nAceastă acțiune este ireversibilă.`;
    if (confirm(confirmMsg)) {
      registryData = registryData.filter(j => j.id !== jobId);
      saveRegistryData();
      renderAll();
      showToast(`Intervenția ${job.id} a fost ștearsă.`);
    }
  }

  /* ============================================================================
     8. JOB DETAILS MODAL & PRINT RECEIPT ENGINE
     ============================================================================ */

  function openDetailsModal(jobId) {
    const job = registryData.find(j => j.id === jobId);
    if (!job) return;

    currentlySelectedJobId = jobId;
    const backdrop = document.getElementById('detailsModalBackdrop');
    const modalBody = document.getElementById('detailsModalBody');
    const modalTitle = document.getElementById('detailsModalTitle');

    if (!backdrop || !modalBody) return;

    modalTitle.textContent = `Fișă Intervenție: ${job.id}`;

    const before = parseFloat(job.tempBefore);
    const after = parseFloat(job.tempAfter);
    const drop = job.thermalDrop !== undefined && job.thermalDrop !== null
      ? parseFloat(job.thermalDrop)
      : (!isNaN(before) && !isNaN(after) ? before - after : null);

    let thermalSectionHtml = '';
    if (!isNaN(before) && !isNaN(after) && before > 0 && after > 0) {
      const percentReduction = Math.min(100, Math.round((drop / before) * 100));
      thermalSectionHtml = `
        <div class="job-thermal-badge-card">
          <div class="thermal-metric-item">
            <span class="thermal-metric-label">Temp. Inițială (Load)</span>
            <span class="thermal-metric-val hot">${before}°C</span>
          </div>
          <div class="thermal-metric-delta">
            <span class="delta-text">-${drop}°C Scădere</span>
            <div class="thermal-reduction-progress-wrap" title="Eficiență disipare: -${drop}°C (-${percentReduction}%)">
              <div class="thermal-reduction-progress-bar" style="width: ${percentReduction}%;"></div>
            </div>
            <span class="delta-percent">-${percentReduction}% Sarcină Termică</span>
          </div>
          <div class="thermal-metric-item" style="text-align: right;">
            <span class="thermal-metric-label">Temp. Stabilizată</span>
            <span class="thermal-metric-val cool">${after}°C</span>
          </div>
        </div>
      `;
    }

    modalBody.innerHTML = `
      <div class="job-details-grid">
        <!-- Header Info Bar -->
        <div class="job-details-header-card">
          <div>
            <div class="job-meta-title">${escapeHtml(job.id)}</div>
            <div class="job-meta-sub">Data finalizare: <strong>${escapeHtml(job.date)}</strong></div>
          </div>
          <div class="flex items-center gap-2">
            ${getCategoryBadge(job.category)}
            ${getStatusBadge(job.status)}
          </div>
        </div>

        <!-- 2 Column Client & Device Specs -->
        <div class="job-info-columns">
          <div class="job-info-box">
            <div class="job-info-box-title">Client &amp; Contact</div>
            <div class="job-info-value">
              <div><strong>Nume:</strong> ${escapeHtml(job.clientName)}</div>
              <div><strong>Telefon:</strong> <a href="tel:${escapeHtml(job.clientPhone)}" style="color: var(--accent-primary); text-decoration: none;">${escapeHtml(job.clientPhone)}</a></div>
            </div>
          </div>

          <div class="job-info-box">
            <div class="job-info-box-title">Echipament &amp; Onorariu</div>
            <div class="job-info-value">
              <div><strong>Model:</strong> ${escapeHtml(job.deviceModel)}</div>
              <div><strong>Preț Total:</strong> <span style="font-weight: bold; color: var(--text-primary);">${formatCurrency(job.price || 0)}</span></div>
            </div>
          </div>
        </div>

        <!-- Thermal Telemetry Card -->
        ${thermalSectionHtml}

        <!-- Issues Reported -->
        <div class="job-info-box">
          <div class="job-info-box-title">Defecțiuni &amp; Simptome Reclamate</div>
          <div class="job-info-value" style="color: var(--text-secondary);">
            ${escapeHtml(job.issuesReported)}
          </div>
        </div>

        <!-- Actions Taken -->
        <div class="job-info-box">
          <div class="job-info-box-title">Operațiuni Tehnice &amp; Soluții Aplicate</div>
          <div class="job-info-value" style="color: var(--text-secondary);">
            ${escapeHtml(job.actionsTaken)}
          </div>
        </div>

        <!-- Notes -->
        ${job.notes ? `
          <div class="job-info-box">
            <div class="job-info-box-title">Note Suplimentare &amp; Garanție</div>
            <div class="job-info-value" style="color: var(--text-secondary);">
              ${escapeHtml(job.notes)}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    backdrop.classList.add('is-active');
  }

  function closeDetailsModal() {
    const backdrop = document.getElementById('detailsModalBackdrop');
    if (backdrop) backdrop.classList.remove('is-active');
  }

  /**
   * Prepares and triggers the Print Receipt handover view
   */
  function printJobReceipt(jobId) {
    const job = registryData.find(j => j.id === jobId);
    if (!job) return;

    const printableContainer = document.getElementById('printableJobSheet');
    if (!printableContainer) return;

    const before = parseFloat(job.tempBefore);
    const after = parseFloat(job.tempAfter);
    const drop = job.thermalDrop !== undefined && job.thermalDrop !== null
      ? parseFloat(job.thermalDrop)
      : (!isNaN(before) && !isNaN(after) ? before - after : null);

    // Populate the printable job sheet matching services.css @media print guidelines
    printableContainer.innerHTML = `
      <div class="print-header">
        <div>
          <div class="print-title">DRAGOȘ TECUCI — REPARAȚII &amp; MENTENANȚĂ IT</div>
          <div class="print-sub">Cluj-Napoca, România &bull; Tel: +40 750 186 095 &bull; Web: dt-tech-service.vercel.app</div>
          <div class="print-sub">Fișă de Lucru Tehnic &amp; Proces Verbal Predare-Primire</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 14pt; font-weight: 800; font-family: monospace;">${escapeHtml(job.id)}</div>
          <div class="print-sub">Data: ${escapeHtml(job.date)}</div>
          <div class="print-sub">Status: <strong>${escapeHtml(job.status)}</strong></div>
        </div>
      </div>

      <div class="print-grid">
        <div class="print-box">
          <div class="print-box-title">Date Client &amp; Echipament</div>
          <div style="font-size: 9.5pt; line-height: 1.6;">
            <div><strong>Client:</strong> ${escapeHtml(job.clientName)}</div>
            <div><strong>Telefon:</strong> ${escapeHtml(job.clientPhone)}</div>
            <div><strong>Model Dispozitiv:</strong> ${escapeHtml(job.deviceModel)}</div>
            <div><strong>Categorie:</strong> ${escapeHtml(job.category)}</div>
          </div>
        </div>

        <div class="print-box">
          <div class="print-box-title">Raport Termic &amp; Detalii Financiare</div>
          <div style="font-size: 9.5pt; line-height: 1.6;">
            <div><strong>Temp. Înainte:</strong> ${before ? before + ' °C (în sarcină)' : 'N/A'}</div>
            <div><strong>Temp. După:</strong> ${after ? after + ' °C (stabilizat)' : 'N/A'}</div>
            <div><strong>Reducere Termică:</strong> ${drop ? '-' + drop + ' °C' : 'N/A'}</div>
            <div><strong>Cost Achitat:</strong> <span style="font-size: 11pt; font-weight: bold;">${formatCurrency(job.price || 0)}</span></div>
            <div><strong>Garanție:</strong> 30 de zile suport post-intervenție</div>
          </div>
        </div>
      </div>

      <div class="print-box" style="margin-bottom: 12pt;">
        <div class="print-box-title">Defecțiuni &amp; Simptome Reclamate la Recepție</div>
        <div style="font-size: 9.5pt; line-height: 1.5; color: #222222;">
          ${escapeHtml(job.issuesReported)}
        </div>
      </div>

      <div class="print-box" style="margin-bottom: 12pt;">
        <div class="print-box-title">Operațiuni Tehnice &amp; Soluții Aplicate</div>
        <div style="font-size: 9.5pt; line-height: 1.5; color: #222222;">
          ${escapeHtml(job.actionsTaken)}
        </div>
      </div>

      <div class="print-box" style="margin-bottom: 14pt;">
        <div class="print-box-title">Constatări Finale, Teste de Stabilitate &amp; Recomandări</div>
        <div style="font-size: 9.5pt; line-height: 1.5; color: #222222;">
          ${escapeHtml(job.notes || 'Intervenție executată conform specificațiilor producătorului. Echipamentul a fost testat și funcționează în parametri optimi.')}
        </div>
      </div>

      <div class="print-signatures">
        <div class="signature-line">
          <strong>Tehnician IT</strong><br>
          Dragoș Tecuci<br>
          <em>Semnătură &amp; Ștampilă</em>
        </div>
        <div class="signature-line">
          <strong>Recepționat de Client</strong><br>
          ${escapeHtml(job.clientName)}<br>
          <em>Am primit echipamentul testat și funcțional</em>
        </div>
      </div>
    `;

    // Add printing class to body so only this receipt prints cleanly
    document.body.classList.add('printing-single-receipt');

    window.print();

    // Clean up class after print dialog closes
    const cleanUp = () => {
      document.body.classList.remove('printing-single-receipt');
      window.removeEventListener('afterprint', cleanUp);
    };
    window.addEventListener('afterprint', cleanUp);
    setTimeout(cleanUp, 1500);
  }

  /* ============================================================================
     9. CSV & JSON EXPORTERS
     ============================================================================ */

  function exportCsv() {
    if (registryData.length === 0) {
      showToast('Nu există date pentru export.', 'error');
      return;
    }

    const headers = [
      'ID',
      'Data',
      'Client',
      'Telefon',
      'Model Dispozitiv',
      'Categorie',
      'Defectiuni Reclamate',
      'Operatiuni Efectuate',
      'Temp Inainte (C)',
      'Temp Dupa (C)',
      'Reducere Termica (C)',
      'Pret (RON)',
      'Status',
      'Note'
    ];

    const rows = registryData.map(job => {
      const before = job.tempBefore !== undefined && job.tempBefore !== null ? job.tempBefore : '';
      const after = job.tempAfter !== undefined && job.tempAfter !== null ? job.tempAfter : '';
      const drop = job.thermalDrop !== undefined && job.thermalDrop !== null ? job.thermalDrop : '';

      const fields = [
        job.id,
        job.date,
        job.clientName,
        job.clientPhone,
        job.deviceModel,
        job.category,
        job.issuesReported,
        job.actionsTaken,
        before,
        after,
        drop,
        job.price,
        job.status,
        job.notes || ''
      ];

      return fields.map(val => {
        const str = String(val === null || val === undefined ? '' : val);
        // Escape quotes
        return `"${str.replace(/"/g, '""')}"`;
      }).join(',');
    });

    // Add UTF-8 BOM (\uFEFF) for native Excel compatibility with Romanian characters
    const csvContent = '\uFEFF' + headers.join(',') + '\r\n' + rows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const today = new Date().toISOString().split('T')[0];
    const link = document.createElement('a');
    link.href = url;
    link.download = `registru_interventii_dt_${today}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Registrul a fost exportat cu succes în format CSV!');
  }

  function exportJson() {
    if (registryData.length === 0) {
      showToast('Nu există date pentru export.', 'error');
      return;
    }

    const jsonContent = JSON.stringify(registryData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const today = new Date().toISOString().split('T')[0];
    const link = document.createElement('a');
    link.href = url;
    link.download = `registru_interventii_dt_${today}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Registrul a fost exportat cu succes în format JSON!');
  }

  /* ============================================================================
     10. CHANGE PIN MODAL
     ============================================================================ */

  function initChangePin() {
    const backdrop = document.getElementById('changePinModalBackdrop');
    const btnOpen = document.getElementById('btnOpenChangePin');
    const btnClose = document.getElementById('btnCloseChangePinModal');
    const btnCancel = document.getElementById('btnCancelChangePin');
    const btnSave = document.getElementById('btnSaveNewPin');
    const form = document.getElementById('changePinForm');
    const errorMsg = document.getElementById('changePinErrorMessage');

    if (!backdrop) return;

    function openModal() {
      if (form) form.reset();
      if (errorMsg) errorMsg.textContent = '';
      backdrop.classList.add('is-active');
      setTimeout(() => {
        const curInput = document.getElementById('currentPinInput');
        if (curInput) curInput.focus();
      }, 150);
    }

    function closeModal() {
      backdrop.classList.remove('is-active');
    }

    function savePin() {
      const curVal = document.getElementById('currentPinInput').value.trim();
      const newVal = document.getElementById('newPinInput').value.trim();
      const confirmVal = document.getElementById('confirmPinInput').value.trim();

      const storedPin = getStoredPin();

      if (curVal !== storedPin) {
        errorMsg.textContent = 'PIN-ul curent este incorect.';
        return;
      }

      if (!/^[0-9a-zA-Z]{4,8}$/.test(newVal)) {
        errorMsg.textContent = 'PIN-ul nou trebuie să aibă între 4 și 8 caractere alfanumerice.';
        return;
      }

      if (newVal !== confirmVal) {
        errorMsg.textContent = 'Confirmarea nu corespunde cu noul PIN.';
        return;
      }

      setStoredPin(newVal);
      closeModal();
      showToast('PIN-ul a fost actualizat cu succes!');
    }

    if (btnOpen) btnOpen.addEventListener('click', openModal);
    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnCancel) btnCancel.addEventListener('click', closeModal);
    if (btnSave) btnSave.addEventListener('click', savePin);

    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        savePin();
      });
    }

    // Close on escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && backdrop.classList.contains('is-active')) {
        closeModal();
      }
    });
  }

  /* ============================================================================
     11. THEME ENGINE SYNCHRONIZATION
     ============================================================================ */

  function initTheme() {
    function getPreferredTheme() {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark';
    }

    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'light') {
        document.body.classList.add('light-theme');
      } else {
        document.body.classList.remove('light-theme');
      }

      const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
      toggleButtons.forEach(btn => {
        const next = theme === 'dark' ? 'luminoasă' : 'întunecată';
        btn.setAttribute('aria-label', `Comută la tema ${next}`);
        btn.setAttribute('title', `Comută la tema ${next}`);
      });
    }

    function toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_STORAGE_KEY, next);
      applyTheme(next);
    }

    // Initialize with current preference
    applyTheme(getPreferredTheme());

    // Listen to clicks on any theme toggle button
    document.addEventListener('click', e => {
      const btn = e.target.closest('.theme-toggle-btn');
      if (btn) {
        e.preventDefault();
        toggleTheme();
      }
    });

    // Listen to OS preference change if user hasn't explicitly overridden
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
          applyTheme(e.matches ? 'light' : 'dark');
        }
      });
    }
  }

  /* ============================================================================
     12. EVENT WIRING & INITIALIZATION
     ============================================================================ */

  function initEventBindings() {
    // Search input
    const searchInput = document.getElementById('evidenceSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        renderTable();
      });
    }

    // Filters
    const catFilter = document.getElementById('evidenceCategoryFilter');
    if (catFilter) {
      catFilter.addEventListener('change', () => {
        renderTable();
      });
    }

    const statFilter = document.getElementById('evidenceStatusFilter');
    if (statFilter) {
      statFilter.addEventListener('change', () => {
        renderTable();
      });
    }

    // Reset filters button in empty state
    const btnReset = document.getElementById('btnResetFilters');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (catFilter) catFilter.value = 'all';
        if (statFilter) statFilter.value = 'all';
        renderTable();
      });
    }

    // Add Job Button
    const btnAdd = document.getElementById('btnAddNewJob');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        openJobModal('add');
      });
    }

    // Job Modal Close & Cancel
    const btnCloseJob = document.getElementById('btnCloseJobModal');
    const btnCancelJob = document.getElementById('btnCancelJobForm');
    const btnSaveJob = document.getElementById('btnSaveJobForm');

    if (btnCloseJob) btnCloseJob.addEventListener('click', closeJobModal);
    if (btnCancelJob) btnCancelJob.addEventListener('click', closeJobModal);
    if (btnSaveJob) btnSaveJob.addEventListener('click', saveJobForm);

    const jobForm = document.getElementById('jobForm');
    if (jobForm) {
      jobForm.addEventListener('submit', e => {
        e.preventDefault();
        saveJobForm();
      });
    }

    // Table Actions Delegation (View, Edit, Delete, Print)
    const tableBody = document.getElementById('evidenceTableBody');
    if (tableBody) {
      tableBody.addEventListener('click', e => {
        const actionBtn = e.target.closest('[data-action]');
        if (!actionBtn) return;

        const action = actionBtn.getAttribute('data-action');
        const jobId = actionBtn.getAttribute('data-id');

        if (action === 'view') {
          openDetailsModal(jobId);
        } else if (action === 'edit') {
          openJobModal('edit', jobId);
        } else if (action === 'delete') {
          deleteJob(jobId);
        } else if (action === 'print') {
          printJobReceipt(jobId);
        }
      });
    }

    // Details Modal Actions
    const btnCloseDetails = document.getElementById('btnCloseDetailsModal');
    const btnCloseDetailsBottom = document.getElementById('btnCloseDetailsBottom');
    const btnEditFromDetails = document.getElementById('btnEditFromDetails');
    const btnPrintReceipt = document.getElementById('btnPrintReceiptAction');

    if (btnCloseDetails) btnCloseDetails.addEventListener('click', closeDetailsModal);
    if (btnCloseDetailsBottom) btnCloseDetailsBottom.addEventListener('click', closeDetailsModal);

    if (btnEditFromDetails) {
      btnEditFromDetails.addEventListener('click', () => {
        if (currentlySelectedJobId) {
          const id = currentlySelectedJobId;
          closeDetailsModal();
          openJobModal('edit', id);
        }
      });
    }

    if (btnPrintReceipt) {
      btnPrintReceipt.addEventListener('click', () => {
        if (currentlySelectedJobId) {
          printJobReceipt(currentlySelectedJobId);
        }
      });
    }

    // Exporters
    const btnCsv = document.getElementById('btnExportCsv');
    const btnJson = document.getElementById('btnExportJson');
    if (btnCsv) btnCsv.addEventListener('click', exportCsv);
    if (btnJson) btnJson.addEventListener('click', exportJson);

    // Restore Seed Data
    const btnRestore = document.getElementById('btnRestoreSeedData');
    if (btnRestore) {
      btnRestore.addEventListener('click', restoreSeedData);
    }

    // Close modals on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeJobModal();
        closeDetailsModal();
      }
    });

    // Close modals on clicking backdrop
    const jobBackdrop = document.getElementById('jobModalBackdrop');
    if (jobBackdrop) {
      jobBackdrop.addEventListener('click', e => {
        if (e.target === jobBackdrop) closeJobModal();
      });
    }

    const detailsBackdrop = document.getElementById('detailsModalBackdrop');
    if (detailsBackdrop) {
      detailsBackdrop.addEventListener('click', e => {
        if (e.target === detailsBackdrop) closeDetailsModal();
      });
    }
  }

  /* ============================================================================
     13. BOOTSTRAP
     ============================================================================ */

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadRegistryData();
    initPinGate();
    initChangePin();
    initEventBindings();
    renderAll();
  });

})();
