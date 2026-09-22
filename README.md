# Dragoș Tecuci — Personal Portfolio, Blog & Mini-CV

[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare)](https://pages.cloudflare.com)
[![GitHub Actions CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat-square&logo=github-actions)](https://github.com/features/actions)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100%2F100-success?style=flat-square&logo=lighthouse)](https://developers.google.com/web/tools/lighthouse)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0%20(Pure%20Vanilla)-blueviolet?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

A ultra-fast, zero-dependency, developer portfolio, technical blog, and ATS-friendly Mini-CV built specifically for **Dragoș Tecuci** (Software Engineer & QA Automation Specialist, Cluj-Napoca, Romania). Designed with a minimalist **Linear / Vercel dark & light aesthetic**, high-contrast typography, interactive micro-states, client-side Markdown rendering, and an immaculate 1-click print engine for physical/PDF resume export.

---

## Table of Contents

- [1. Architecture & Key Features](#1-architecture--key-features)
- [2. Candidate Profile: Dragoș Tecuci](#2-candidate-profile-dragoș-tecuci)
- [3. Project Directory Structure](#3-project-directory-structure)
- [4. Quickstart & Local Preview](#4-quickstart--local-preview)
- [5. 5-Minute Zero-Cost Deployment Guide](#5-5-minute-zero-cost-deployment-guide)
  - [Option A: Vercel (Recommended)](#option-a-vercel-recommended)
  - [Option B: Cloudflare Pages](#option-b-cloudflare-pages)
  - [Option C: GitHub Pages (Automated via Actions)](#option-c-github-pages-automated-via-actions)
  - [Custom Domain Configuration](#custom-domain-configuration)
- [6. Customization Checklist](#6-customization-checklist)
  - [Step 1: Update Profile & Social Links (`data/profile.json`)](#step-1-update-profile--social-links-dataprofilejson)
  - [Step 2: Replace `[TODO: Customize]` Placeholders](#step-2-replace-todo-customize-placeholders)
  - [Step 3: Publish New Blog Articles (`posts/*.md`)](#step-3-publish-new-blog-articles-postsmd)
  - [Step 4: Manage Projects & Impact Metrics (`data/projects.json`)](#step-4-manage-projects--impact-metrics-dataprojectsjson)
  - [Step 5: Tune Skills Matrix (`data/skills.json`)](#step-5-tune-skills-matrix-dataskillsjson)
  - [Step 6: Update Experience & Education](#step-6-update-experience--education)
- [7. Security & Caching Headers](#7-security--caching-headers)
- [8. Print Engine & 1-Click PDF Resume Export](#8-print-engine--1-click-pdf-resume-export)
- [9. Browser Compatibility & Performance Audit](#9-browser-compatibility--performance-audit)

---

## 1. Architecture & Key Features

This platform was built under the philosophy of **maximum speed, zero bloat, and zero framework overhead**:

- **Zero-Dependency Architecture:** Zero npm runtime dependencies, zero bundlers (no Webpack, Vite, or Next.js overhead), and zero client framework hydration cost. Built entirely using standards-compliant semantic HTML5, modern CSS custom properties, and native ES6+ JavaScript.
- **100/100 Lighthouse Performance:** Instantaneous First Contentful Paint (FCP < 0.3s), zero Cumulative Layout Shift (CLS = 0), and instant Time to Interactive (TTI).
- **Linear / Vercel Aesthetic:** High-precision dark mode (default) and crisp light mode powered by CSS custom properties and tokens. Features subtle glassmorphism borders (`rgba(255, 255, 255, 0.08)`), micro-interaction hover states, monospace badge callouts, and clean layout grids.
- **ATS-Friendly Mini-CV & 1-Click PDF Export:** Includes a dedicated curriculum vitae tab built with clean semantic markup (`<section>`, `<h3>`, `<time>`, `<ul>`) parsed effortlessly by Applicant Tracking Systems (ATS). Integrated with an advanced `@media print` stylesheet that removes web navigation, expands all sections, and outputs a clean 1-to-2 page PDF.
- **Client-Side Markdown Blog Engine:** Self-contained client-side parser that loads Markdown (`.md`) articles asynchronously from the `posts/` folder, extracts YAML frontmatter metadata (title, date, read time, tags, summary), and renders formatted articles with code blocks, tables, and blockquotes.
- **Accessible & Responsive:** WCAG 2.1 AA compliant color contrast ratios, keyboard-navigable interactive controls, ARIA landmarks, and flexible mobile-first fluid scaling.

---

## 2. Candidate Profile: Dragoș Tecuci

**Dragoș Tecuci** is a Software Engineer and QA Automation Specialist based in **Cluj-Napoca, Romania**, combining deep technical rigor with commercial and strategic product thinking.

```
                    ┌─────────────────────────────────────────────────────────┐
                    │               DRAGOȘ TECUCI — CORE MATRIX               │
                    └─────────────────────────────────────────────────────────┘
                                                 │
         ┌───────────────────────────────────────┼──────────────────────────────────────┐
         ▼                                       ▼                                      ▼
┌─────────────────────────┐           ┌─────────────────────────┐            ┌─────────────────────────┐
│       ENGINEERING       │           │      QA AUTOMATION      │            │ BUSINESS & STRATEGY     │
├─────────────────────────┤           ├─────────────────────────┤            ├─────────────────────────┤
│ • Java & Spring Boot    │           │ • Selenium (Java)       │            │ • UTCN Entrepreneurship │
│ • Microservices & REST  │           │ • Playwright (Python)   │            │ • Financial Modeling    │
│ • PostgreSQL & SQL      │           │ • Cypress (TypeScript)  │            │ • Cloud Unit Economics  │
│ • Docker & CI/CD        │           │ • Shift-Left Philosophy │            │ • Cost-to-Serve Scaling │
│ • Agile Feature Delivery│           │ • Flaky Test Quarantine │            │ • Agile Squad Leadership│
└─────────────────────────┘           └─────────────────────────┘            └─────────────────────────┘
```

### Academic Background
- **Master's Degree in Entrepreneurship / Entrepreneurial Studies (2025 – 2027)**  
  *Technical University of Cluj-Napoca (UTCN)*  
  Specializing in bridging engineering architectures with commercial viability, cloud unit economics, financial modeling, and venture scaling.
- **Bachelor's Degree in Computer Software Engineering (2021 – 2025)**  
  *Technical University of Cluj-Napoca (UTCN)*  
  Rigorous computer science curriculum: algorithms, distributed systems, database design, OOP design patterns, and software verification.

### Technical Expertise
- **Languages:** Java (Core / SE / Spring), TypeScript, Python, JavaScript (ES6+), SQL, Bash.
- **Backend & Architecture:** Spring Boot, REST APIs, Microservices, Hibernate/JPA, Docker, Testcontainers.
- **QA Automation Triad:**
  - **Selenium with Java:** Enterprise Page Object Model (POM), cross-browser grids, resilient explicit waits.
  - **Playwright with Python:** High-speed parallel execution, network mocking, async event interception.
  - **Cypress with TypeScript:** Modern frontend single-page testing, real-time DOM validation, CI pipeline integration.
- **DevOps & Infrastructure:** GitHub Actions CI/CD pipelines, Docker containerization, Linux, Vercel, Cloudflare Pages.

---

## 3. Project Directory Structure

```text
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated CI/CD GitHub Pages deployment workflow
├── assets/
│   ├── css/
│   │   ├── style.css             # Main design system, dual-theme tokens & ATS print stylesheet
│   │   └── services.css          # High-conversion services portal stylesheet & registry theme
│   └── js/
│       ├── app.js                # Core SPA engine: i18n switcher, theme, filters, markdown parser
│       ├── services.js           # Services portal engine: quote calculator, thermal gauge, WhatsApp
│       └── evidence.js           # Private evidence tracker: PIN gate (1234), CRUD, CSV/JSON export
├── data/
│   ├── education.json            # Academic credentials (UTCN MS Entrepreneurship, BS SE)
│   ├── evidence.json             # Seed records for hardware & software repair intervention tracker
│   ├── experience.json           # Work history (Java SE, QA Automation)
│   ├── profile.json              # Candidate biography, contact & links
│   ├── projects.json             # Flagship engineering & QA projects with impact metrics
│   ├── services.json             # Bilingual service packages, guarantees & pricing matrix
│   └── skills.json               # Categorized skills matrix (Languages, Backend, QA, Strategy)
├── posts/
│   ├── bridging-engineering-and-quality.md   # Essay: The QA automation triad & shift-left testing
│   └── tech-to-entrepreneurship-lessons.md   # Essay: Bridging software engineering & unit economics
├── index.html                    # Main landing portal with Dual-Gateway Hub & Services spotlight
├── services.html                 # Public client portal: Quote Calculator, Thermal Gauges, WhatsApp
├── evidence.html                 # Private PIN-gated intervention registry & receipt sheet engine
├── blog.html                     # Technical blog reader portal with search & tag filtering
├── resume.html                   # Dedicated ATS-friendly Mini-CV with 1-click PDF print export
├── CLUJ_CLIENT_ACQUISITION_STRATEGY.md  # Marketing & transparent pricing handbook for Cluj-Napoca
├── vercel.json                   # Vercel deployment configuration & caching headers
├── _headers                      # Cloudflare Pages production caching & security rules
└── README.md                     # Comprehensive documentation & operations manual
```

---

## 4. Quickstart & Local Preview

Because the site requires zero build steps or package compilation, you can run and preview it immediately using any of the four options below.

> [!NOTE]
> Modern web browsers restrict `fetch()` requests when opening files via the `file://` protocol due to strict Cross-Origin (CORS) security policies. While static styling renders via double-click, running a lightweight local HTTP server (Methods 2, 3, or 4) is **strongly recommended** so the site can asynchronously load dynamic JSON data files (`data/*.json`) and Markdown blog articles (`posts/*.md`).

### Method 1: Python Built-in Static Server (Zero-install, Recommended)

Python comes pre-installed on virtually all development workstations (Windows, macOS, Linux).

```bash
# Navigate to the portfolio folder
cd path/to/portfolio

# Start a local static HTTP server on port 3000
python -m http.server 3000

# On systems where Python 3 is aliased as python3:
python3 -m http.server 3000
```
Open your browser and visit: **`http://localhost:3000`**

---

### Method 2: VS Code Live Server Extension

If you use Visual Studio Code:
1. Install the **Live Server** extension (by Ritwick Dey) from the VS Code Extensions Marketplace (`Ctrl+Shift+X` / `Cmd+Shift+X` -> search `Live Server`).
2. Open the `portfolio/` workspace in VS Code.
3. Right-click `index.html` in the file explorer and click **"Open with Live Server"** (or click **"Go Live"** in the bottom status bar).
4. The site will automatically open in your default browser at `http://127.0.0.1:5500`.

---

### Method 3: Node / npx `serve`

If you have Node.js installed:

```bash
# Navigate to the portfolio folder
cd path/to/portfolio

# Serve current directory using npx (no global install required)
npx serve .

# Alternatively, specify a port:
npx serve -l 3000 .
```
Open your browser and visit: **`http://localhost:3000`**

---

### Method 4: Direct Double-Click `index.html`

- Double-click `index.html` in Windows Explorer / macOS Finder to open directly in Chrome, Edge, Safari, or Firefox.
- Best for quick visual layout inspection.

---

## 5. 5-Minute Zero-Cost Deployment Guide

Deploying this portfolio costs **$0/month** and takes less than 5 minutes on modern static hosting platforms. Pre-configured infrastructure files (`vercel.json`, `_headers`, and `.github/workflows/deploy.yml`) are included out of the box.

### Option A: Vercel (Recommended)

Vercel provides instant worldwide edge CDN caching, automatic SSL certificates, and preview deployments on pull requests.

#### Method 1: Vercel Web Dashboard (Git Integration)
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Visit [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** -> **"Project"**.
4. Select your portfolio repository and click **"Import"**.
5. In the configuration dialog:
   - **Framework Preset:** Select **"Other"**.
   - **Root Directory:** `./` (or `portfolio/` if part of a monorepo).
   - **Build Command:** Leave empty (no build needed).
   - **Output Directory:** Leave empty (root serves static assets).
6. Click **"Deploy"**. The site will be live on a `*.vercel.app` URL within 10 seconds.
7. `vercel.json` is automatically detected, applying clean URLs, immutable caching on `/assets/`, and security headers.

#### Method 2: Vercel CLI
```bash
# Deploy to preview
npx vercel

# Deploy directly to production
npx vercel --prod
```

---

### Option B: Cloudflare Pages

Cloudflare Pages offers unlimited bandwidth, sub-millisecond edge response times, and built-in DDoS protection.

#### Method 1: Git Integration
1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**.
2. Authorize your GitHub/GitLab account and select your portfolio repository.
3. In **Set up builds and deployments**:
   - **Project name:** `dragos-tecuci-portfolio`
   - **Production branch:** `main`
   - **Framework preset:** `None`
   - **Build command:** *(Leave empty)*
   - **Build output directory:** `.`
4. Click **"Save and Deploy"**.
5. Cloudflare Pages automatically detects the `_headers` file, applying HTTP caching policies (1 year immutable on `assets/`, `must-revalidate` on HTML) and strict CSP headers.

#### Method 2: Cloudflare Direct Upload (No Git Required)
1. In Cloudflare Pages, select **"Direct Upload"**.
2. Drag and drop the `portfolio` folder directly into the web UI.
3. Click **"Deploy site"**.

---

### Option C: GitHub Pages (Automated via Actions)

The repository includes a ready-to-run GitHub Actions workflow (`.github/workflows/deploy.yml`) using the latest official actions (`actions/checkout@v4`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, and `actions/deploy-pages@v4`).

1. Push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete portfolio deployment configuration"
   git push origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings** -> **Pages** (under "Code and automation" in the left sidebar).
   - Under **Build and deployment** -> **Source**, select **"GitHub Actions"** from the dropdown.
3. Go to the **Actions** tab of your repository. You will see the **Deploy Static Content to GitHub Pages** workflow running automatically.
4. Once completed, your portfolio is live at `https://<username>.github.io/<repository-name>/`.

---

### Custom Domain Configuration

To connect your custom domain (e.g., `dragostecuci.dev` or `dragostecuci.ro`):

| Platform | DNS Record Type | Host / Name | Target / Value |
| :--- | :--- | :--- | :--- |
| **Vercel** | `CNAME` | `www` (or subdomain) | `cname.vercel-dns.com` |
| **Vercel** | `A` | `@` (Apex domain) | `76.76.21.21` |
| **Cloudflare Pages** | Direct CNAME | `www` or `@` | `<project-name>.pages.dev` |
| **GitHub Pages** | `CNAME` | `www` (or subdomain) | `<username>.github.io` |
| **GitHub Pages** | `A` (Apex) | `@` | `185.199.108.153`<br>`185.199.109.153`<br>`185.199.110.153`<br>`185.199.111.153` |

SSL certificates are automatically generated and provisioned via Let's Encrypt at zero charge across all three platforms.

---

## 6. Customization Checklist

All website content is cleanly separated into JSON data files (`data/`) and Markdown articles (`posts/`). You can update your entire website without editing complex HTML markup.

### Step 1: Update Profile & Social Links (`data/profile.json`)

Open `data/profile.json` and customize your primary contact coordinates:

```json
{
  "name": "Dragoș Tecuci",
  "title": "Software Engineer & QA Specialist",
  "location": "Cluj-Napoca, Romania",
  "email": "your.real.email@domain.com",
  "github": "https://github.com/yourusername",
  "linkedin": "https://www.linkedin.com/in/yourprofile",
  "avatarUrl": "/assets/images/avatar.jpg",
  "bio": "Your custom 2-sentence executive summary..."
}
```

Add your profile picture by saving a clean, professional headshot as `assets/images/avatar.jpg` (recommended aspect ratio: 1:1 square, 400x400px or 800x800px).

---

### Step 2: Replace `[TODO: Customize]` Placeholders

Search the codebase for `[TODO: Customize]` to replace all placeholder values with your real-world credentials:

1. **`data/profile.json`:**
   - Update placeholder email (`tecuci.dragos@example.com`).
   - Confirm GitHub and LinkedIn URLs.
2. **`data/experience.json`:**
   - Replace `"[TODO: Customize Company Name]"` on `exp-1` and `exp-2` with the actual companies or organizations.
3. **`data/projects.json`:**
   - Configure showcase repository URLs (e.g., `https://github.com/Dragosh7/FullStackApplication`).
   - Update demo URLs or set them to `null` / `""` if private or internal enterprise projects.

---

### Step 3: Publish New Blog Articles (`posts/*.md`)

To publish a new technical article or case study:

1. Create a new markdown file inside the `posts/` folder (e.g., `posts/building-resilient-distributed-systems.md`).
2. Add the required YAML frontmatter at the top of the file:

```markdown
---
title: "Building Resilient Distributed Systems: Spring Boot Circuit Breakers"
date: "2026-10-01"
author: "Dragoș Tecuci"
tags: ["Java", "Spring Boot", "Microservices", "Resilience4j", "DevOps"]
readingTime: "6 min"
summary: "A practical guide to implementing circuit breaker and bulkhead patterns in Java microservices to eliminate cascading failures."
---

# Building Resilient Distributed Systems

Your markdown article content goes here. You can include:
- Standard markdown headers (`##`, `###`)
- Code snippets with language highlighting syntax
- Bulleted and numbered lists
- Blockquotes (`> Note`)
- Tables and inline links
```

3. The client-side blog parser will immediately recognize, index, and display the article in your **Blog** section.

---

### Step 4: Manage Projects & Impact Metrics (`data/projects.json`)

To add a new project, append an entry to the array in `data/projects.json`:

```json
{
  "id": "my-new-project-slug",
  "title": "Project Title",
  "subtitle": "Short one-line engineering summary",
  "featured": true,
  "summary": "High-level summary of what the system does and why it was built.",
  "description": "In-depth technical architecture details, protocols used, and design decisions.",
  "techTags": [
    "Java",
    "Spring Boot",
    "Docker",
    "PostgreSQL"
  ],
  "impactMetrics": [
    {
      "label": "Throughput Boost",
      "value": "+40%",
      "description": "Optimized connection pooling and query execution paths."
    },
    {
      "label": "Availability",
      "value": "99.9%",
      "description": "Zero unscheduled downtime over consecutive release cycles."
    }
  ],
  "repoUrl": "https://github.com/yourusername/project-repo",
  "demoUrl": "https://project-demo.example.com",
  "date": "2025-2026"
}
```

> [!TIP]
> Setting `"featured": true` highlights the project in the primary hero showcase on the home view.

---

### Step 5: Tune Skills Matrix (`data/skills.json`)

`data/skills.json` controls the categorized skill pills displayed across the portfolio and Mini-CV. Skills are organized into five structured categories:
- `Programming Languages`
- `Backend & Fullstack Architecture`
- `QA & Test Automation`
- `Databases & DevOps Infrastructure`
- `Business, Strategy & Leadership`

Each skill object supports:
```json
{
  "name": "Playwright (Python)",
  "level": "Expert",
  "yearsOfExperience": 2,
  "highlight": "Fast, reliable multi-browser automation, network interception, async execution."
}
```

---

### Step 6: Update Experience & Education

- **`data/experience.json`:** Add new career roles, responsibilities, bulleted achievements, and technology tags.
- **`data/education.json`:** Add certifications, degrees, or academic achievements with focus areas and highlights.

---

## 7. Security & Caching Headers

Both `vercel.json` and `_headers` enforce industry-leading security and performance headers:

### Security Headers
- **Content-Security-Policy (CSP):** `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' data: https:; img-src 'self' data: blob: https:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self';`
- **X-Frame-Options:** `DENY` (Prevents clickjacking attacks by forbidding the site from being rendered inside an `<iframe>`).
- **X-Content-Type-Options:** `nosniff` (Mitigates MIME-type sniffing vulnerabilities).
- **Referrer-Policy:** `strict-origin-when-cross-origin` (Protects sensitive referrer metadata when linking to external resources).
- **Permissions-Policy:** `camera=(), microphone=(), geolocation=(), browsing-topics=()` (Restricts unauthorized hardware/sensor access).
- **Strict-Transport-Security (HSTS):** `max-age=31536000; includeSubDomains; preload` (Enforces HTTPS across all browser connections).

### Caching Strategy
- **Static Assets (`/assets/*`):** `public, max-age=31536000, immutable`  
  Cached at the browser and CDN edge for 1 full year to guarantee instant sub-millisecond repeat visits.
- **Dynamic Content & HTML (`/`, `/*.html`, `/data/*`, `/posts/*`):** `public, max-age=0, must-revalidate`  
  Guarantees that updates to your resume, data, or blog posts are reflected immediately upon deployment without stale browser cache delays.

---

## 8. Print Engine & 1-Click PDF Resume Export

The portfolio includes an automated print engine engineered with pure `@media print` CSS rules in `assets/css/style.css`:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        HOW TO EXPORT YOUR PDF CV                       │
└────────────────────────────────────────────────────────────────────────┘
  1. Open the website in Google Chrome, Microsoft Edge, or Safari.
  2. Navigate to the "Mini-CV" tab (or click the "Export PDF" button).
  3. Press Ctrl + P (Windows/Linux) or Cmd + P (macOS).
  4. In the print dialog:
     • Destination: "Save as PDF"
     • Paper size: "A4" or "Letter"
     • Margins: "Default" or "Minimum"
     • Options: Check "Background graphics"
  5. Click "Save".
```

### What the Print Engine Does Automatically:
- Suppresses web-only controls (navigation bars, theme toggles, search bars, footer links).
- Inverts colors to crisp high-contrast black ink on clean white paper.
- Preserves clean typographical hierarchy, compacting line spacing to fit a 1-to-2 page standard.
- Formats dates, company names, degrees, and bullet points into an ATS-parseable layout.
- Appends clean destination URLs in parentheses next to outbound hyperlinks.

---

## 9. Browser Compatibility & Performance Audit

Tested and verified across all modern evergreen desktop and mobile browsers:
- **Google Chrome / Chromium:** v110+ (Windows, macOS, Linux, Android)
- **Mozilla Firefox:** v110+ (Windows, macOS, Linux)
- **Apple Safari:** v16+ (macOS, iOS, iPadOS)
- **Microsoft Edge:** v110+ (Windows, macOS)

### Lighthouse Metrics Target
- **Performance:** `100 / 100`
- **Accessibility:** `100 / 100`
- **Best Practices:** `100 / 100`
- **SEO:** `100 / 100`

---

## License & Attribution

Designed and engineered for **Dragoș Tecuci** © 2026.  
Distributed under the [MIT License](LICENSE). Feel free to fork, customize, and adapt for your own developer portfolio.
