/**
 * ==============================================================================
 * DRAGOȘ TECUCI — PERSONAL PORTFOLIO, BLOG & MINI-CV
 * Production Client-Side Core Engine (app.js)
 * 
 * Features:
 *   - Dark/Light Theme Engine with LocalStorage & OS Preference Sync
 *   - Mobile Drawer Navigation with Outside Click & ESC Key Dismissal
 *   - Project Categorization & Real-time Filter Engine
 *   - Search & Tag Filtering for Blog Articles
 *   - Client-Side Markdown Parser with Frontmatter Extraction
 *   - Deep-linking URL Routing (?post=... / #post=...)
 *   - Embedded Markdown Fallback (Guarantees zero-CORS file:/// protocol support)
 *   - Reading Progress Bar & Scroll Position Tracking
 *   - Copy to Clipboard with Interactive Floating Toast Notification
 *   - In-Page Scrollspy & Active Navigation State
 * 
 * Zero external dependencies. Modern Vanilla JavaScript (ES2022+).
 * ==============================================================================
 */

(function () {
  'use strict';

  /* ============================================================================
     1. EMBEDDED ARTICLE FALLBACKS (Guarantees 100% offline & file:/// execution)
     ============================================================================ */
  const EMBEDDED_POSTS = {
    'bridging-engineering-and-quality': `---
title: "Bridging Software Engineering and Quality: Why Developers Should Think Like QA Engineers"
date: "2026-08-15"
author: "Dragoș Tecuci"
tags: ["Software Engineering", "QA Automation", "Java", "Playwright", "Cypress", "Selenium", "DevOps", "Testing Strategy"]
readingTime: "5 min"
summary: "An in-depth exploration of how hands-on test automation across Selenium, Playwright, and Cypress transforms developer perspective, accelerates delivery, and creates bulletproof software architectures."
---

# Bridging Software Engineering and Quality: Why Developers Should Think Like QA Engineers

In many software organizations, an invisible wall still stands between the engineers writing application features and the quality assurance teams verifying them. Developers push code to a staging branch, mentally check off the ticket, and pass the baton downstream. When QA flags an edge case or an unhandled timeout, the cycle restarts with context switching, friction, and delays.

Having worked both as a dedicated **Software QA Engineer** and as a **Fullstack Software Engineer (Java)**, I have experienced both sides of this divide. The most valuable realization of my career has been simple: **engineers who think like QA specialists build fundamentally superior, more resilient systems.** 

Quality is not a final verification gate—it is an architectural discipline that must begin before the first line of production code is written.

---

## The Shift-Left Reality: Defect Prevention over Defect Detection

When developers focus exclusively on the "happy path," code tends to be brittle. Edge cases, slow network conditions, concurrency race conditions, and graceful error recovery are often treated as afterthoughts.

When you adopt a quality-first mindset, your entire workflow shifts left:
1. **Defensive API Design:** Instead of assuming clean payloads, you architect validation boundaries, strict schema enforcement, and explicit error contracts.
2. **Observability as a First-Class Citizen:** You design backend services with structured logging and deterministic state transitions because you know how difficult opaque failures are to debug.
3. **Testability by Construction:** You write modular, decoupled services because you know that code that is hard to test is almost always code that is poorly designed.

To truly understand how to design testable systems, however, you must understand the modern test automation ecosystem.

---

## The Automation Triad: Selenium, Playwright, and Cypress Compared

During my time specializing in QA automation, I developed deep proficiency in the industry's three leading automation paradigms: **Selenium with Java**, **Playwright with Python**, and **Cypress with TypeScript**. Each represents distinct engineering philosophies, architectural trade-offs, and ideal deployment scenarios.

\`\`\`
       ┌────────────────────────────────────────────────────────┐
       │             THE TEST AUTOMATION LANDSCAPE              │
       └────────────────────────────────────────────────────────┘
                 │                         │                    │
                 ▼                         ▼                    ▼
     ┌───────────────────────┐ ┌──────────────────────┐ ┌───────────────┐
     │    Selenium (Java)    │ │ Playwright (Python)  │ │ Cypress (TS)  │
     │  Enterprise Standard  │ │ Modern Multi-Context │ │ Frontend DX   │
     │  WebDriver Protocol   │ │ DevTools Protocol /  │ │ Inside Browser│
     │  Broad Browser Matrix │ │ WebSockets           │ │ Single Tab    │
     └───────────────────────┘ └──────────────────────┘ └───────────────┘
\`\`\`

Here is a technical comparison based on real-world production implementations:

| Feature / Dimension | Selenium (Java) | Playwright (Python) | Cypress (TypeScript) |
| :--- | :--- | :--- | :--- |
| **Underlying Protocol** | W3C WebDriver (HTTP JSON Wire) | Chrome DevTools Protocol & CDP/Bidi via WebSockets | In-browser execution (evaluates directly in the DOM iframe) |
| **Language Strengths** | Strong static typing, deep Java enterprise ecosystem, strict OOP (Page Object Model) | Clean, readable syntax, native async (\`asyncio\`), high data manipulation capability | TypeScript-first, intuitive assertion chaining, natural fit for web developers |
| **Execution Speed** | Moderate (HTTP request per action introduces slight latency) | Blazing fast (persistent WebSocket bidirectional connection) | Fast for single-page apps; bounded by single-process browser thread |
| **Multi-tab & Multi-user** | Complex window handle switching; requires explicit session coordination | Native browser contexts; simulate multiple users concurrently in isolation | Does not natively support multi-tab or multiple simultaneous browser windows |
| **Network Interception** | Historically limited; requires proxy setups (e.g., BrowserMob) or BiDi APIs | Native request/response interception, route mocking, and payload alteration | Excellent native network stubbing (\`cy.intercept()\`) |
| **Debugging Experience** | IDE breakpoints, remote logging, external screen recordings | Interactive trace viewer, step-by-step DOM snapshots, video playback | Time-travel interactive runner, DOM snapshot inspecting in DevTools |
| **Best Suited For** | Legacy enterprise test suites, extensive grid setups, multi-device cross-browser coverage | High-throughput E2E suites, multi-tenant/multi-role workflows, complex async flows | Rapid frontend component and integration testing in modern JS/TS frameworks |

### 1. Selenium with Java: The Enterprise Workhorse
Selenium remains the undisputed standard in large enterprise environments where software is tested across an expansive matrix of legacy browsers, operating systems, and remote device clouds (e.g., BrowserStack, Sauce Labs). Pairing Selenium with Java allows teams to leverage compile-time type safety, robust design patterns like the Page Factory, and battle-tested frameworks like TestNG and JUnit.

However, Selenium's reliance on discrete HTTP commands over WebDriver can lead to test flakiness if explicit wait strategies aren't implemented meticulously. Developers learning Selenium quickly develop an instinctive respect for DOM state readiness and asynchronous JavaScript rendering.

### 2. Playwright with Python: Speed, Multi-Contexts, and Async Ergonomics
Microsoft’s Playwright transformed browser automation by moving away from HTTP polling to a persistent WebSocket connection directly over browser debugging protocols. 

In Python, Playwright shines brightest when testing complex, multi-role web applications. For example, testing an administrative approval workflow requires two different users: an employee submitting an expense report and a manager approving it. With Playwright's lightweight **Browser Contexts**, you can instantiate two isolated browser sessions within milliseconds in the same test script—without launching separate browser instances:

\`\`\`python
# Simulating multi-user collaboration in Playwright Python
async def test_dual_user_approval(playwright):
    browser = await playwright.chromium.launch()
    
    # Employee context (isolated cookies & storage)
    employee_context = await browser.new_context()
    emp_page = await employee_context.new_page()
    await emp_page.goto("https://app.example.com/submit")
    await emp_page.fill("#amount", "1250")
    await emp_page.click("button#submit-claim")

    # Manager context (completely independent session)
    manager_context = await browser.new_context()
    mgr_page = await manager_context.new_page()
    await mgr_page.goto("https://app.example.com/approvals")
    await mgr_page.click("text=Approve Claim $1250")

    await browser.close()
\`\`\`

This level of speed, combined with built-in auto-waiting and network request stubbing, makes Playwright an outstanding choice for modern CI/CD pipelines.

### 3. Cypress with TypeScript: The Frontend Developer’s Dream
Cypress revolutionized frontend developer experience by executing directly inside the browser run loop alongside the application code. For teams building Single Page Applications (SPAs) with TypeScript, Cypress feels like a natural extension of the development environment.

With features like time-travel debugging and native \`cy.intercept()\` capabilities, diagnosing why a UI component failed to render takes seconds rather than hours. While Cypress enforces architectural constraints—such as running within a single browser tab—its deterministic execution within the front-end event loop makes it unbeatable for rapid component and regression testing.

---

## How QA Expertise Supercharges Fullstack Java Development

Transitioning from full-time QA automation into fullstack Java engineering gave me an unfair advantage. When I design a Spring Boot microservice or an interactive frontend today, my perspective is fundamentally different:

### 1. Writing Inherently Testable Code
Because I have spent hundreds of hours debugging brittle, non-deterministic tests, I write production code that avoids testability anti-patterns:
- **Deterministic Selectors:** I ensure UI components carry meaningful, resilient \`data-testid\` attributes rather than forcing test runners to rely on fragile CSS class hierarchies that break during redesigns.
- **Dependency Injection & Decoupling:** In Java backend services, I structure business logic with clear interfaces, making unit testing with Mockito clean and unambiguous.
- **Explicit State Transitions:** I avoid race conditions by ensuring asynchronous state changes emit clear signals or database statuses rather than relying on implicit timings.

### 2. Mastering the Shift-Left Test Pyramid
The ideal engineering workflow does not rely on heavy E2E tests to catch basic logic bugs. As shown in the classic test pyramid, tests should be balanced:
- **Unit Tests (JUnit / Mockito):** Validate business logic in isolation at millisecond speeds.
- **Integration Tests (Testcontainers / SpringBootTest):** Validate real database transactions, message queues, and API contracts.
- **End-to-End Tests (Playwright / Cypress / Selenium):** Reserved for mission-critical customer journeys (checkout, authentication, data export).

Having built large-scale E2E test suites, I know firsthand the maintenance cost of high-level tests. Therefore, as a developer, I push as much validation as possible into fast unit and integration tests, keeping the E2E suite lean, reliable, and fast.

### 3. Rapid Root-Cause Triage
When an alert fires in production or a pipeline breaks on a pull request, many developers struggle to pinpoint whether the issue is network latency, a front-end rendering bug, or a backend database lock. QA automation engineers develop an intuition for tracing failures through network payloads, browser console logs, and backend traces. This diagnostic muscle drastically reduces Mean Time to Resolution (MTTR).

---

## Conclusion: Building Software That Endures

Software engineering is not merely about making features work when everything goes right. It is about engineering systems that behave predictably when things go wrong.

By internalizing the principles of QA automation—understanding browser execution loops, network boundaries, and rigorous edge-case verification—developers elevate their craft. When engineering and quality unite in the same mindset, we stop building fragile prototypes and start delivering resilient, high-impact software that scales seamlessly with the business.
`,

    'tech-to-entrepreneurship-lessons': `---
title: "From Code to Capital: What My UTCN Entrepreneurship Master's Taught Me About Engineering"
date: "2026-09-02"
author: "Dragoș Tecuci"
tags: ["Entrepreneurship", "Software Architecture", "Financial Modeling", "Unit Economics", "UTCN", "Engineering Leadership"]
readingTime: "6 min"
summary: "Reflections from a software engineer pursuing a Master's in Entrepreneurship at the Technical University of Cluj-Napoca (UTCN). Why understanding financial modeling, cost planning, and unit economics fundamentally transforms how we design software systems."
---

# From Code to Capital: What My UTCN Entrepreneurship Master's Taught Me About Engineering

After completing my Bachelor’s degree in Computer Software Engineering at the **Technical University of Cluj-Napoca (UTCN)** and working hands-on as a software engineer and QA specialist, many of my peers expected me to follow the conventional trajectory: enroll in an advanced distributed systems or artificial intelligence graduate program.

Instead, I chose to pursue a **Master's degree in Entrepreneurship and Entrepreneurial Studies at UTCN (2025 - 2027)**.

To some, stepping from deep backend Java architectures and browser automation into financial statements, cost planning, and go-to-market strategies seemed like a pivot away from engineering. In reality, it has been the exact opposite. Understanding the business mechanics behind technology has made me a significantly better software engineer.

The industry does not suffer from a shortage of code. It suffers from a shortage of engineers who understand how software creates, captures, and protects commercial value.

---

## 1. Escaping the "Feature Factory" Trap

In engineering school and early career stages, success is often measured by velocity and technical elegance: How many story points were closed? How sophisticated is the microservice orchestration? Did we implement the newest design pattern?

At UTCN's Entrepreneurship program, the initial paradigm shift is immediate: **Code is not an asset; code is an operating liability that must generate a net-positive return on investment (ROI).**

Every line of code written:
- Incurs an upfront capital expenditure (engineering salary and opportunity cost).
- Demands ongoing maintenance and operational overhead (cloud hosting, dependencies, security patching).
- Increases surface area for bugs, performance regressions, and customer dissatisfaction.

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│                   THE FEATURE FACTORY vs. VALUE ENGINE                 │
├────────────────────────────────────────────────────────────────────────┤
│ FEATURE FACTORY:                                                       │
│   Ideas ──> Backlog ──> Code Written ──> Shipped ──> [Ignored by users]│
│                                                                        │
│ VALUE ENGINE (Entrepreneurial Engineering):                            │
│   Business Hypothesis ──> Lean Prototype ──> User Validation           │
│         ▲                                             │                │
│         └────────── Measured ROI & Data Feedback ◄────┘                │
└────────────────────────────────────────────────────────────────────────┘
\`\`\`

When engineers learn strategic innovation frameworks, we stop acting as passive ticket-takers in a "feature factory." Instead, we start interrogating requirements with business intent:
- *What specific customer pain point does this endpoint alleviate?*
- *Will shipping this capability improve customer retention or decrease customer acquisition cost (CAC)?*
- *Can we validate this hypothesis with a lean prototype before spending three sprints building a distributed Kafka pipeline?*

---

## 2. Unit Economics & Financial Modeling for Software Architects

One of the most transformative modules in the UTCN curriculum centers on **financial management, cost planning, and cash flow modeling**. In technical circles, we analyze systems using algorithmic Big-O notation: time complexity $O(N)$ and space complexity $O(1)$. 

In business, software architecture is governed by **Unit Economics**.

### Cloud Unit Economics: What Does a Single User Cost?
Consider a high-throughput Java backend service deployed on Kubernetes. A technical architect asks: *Can it handle 10,000 requests per second with sub-50ms latency?*

An entrepreneurial engineer asks: *What is our Cost of Goods Sold (COGS) per monthly active user? If our subscription price is $15/month and each user consumes $3.80 in cloud compute, database I/O, and third-party API calls, how does our gross margin scale as our user base grows from 1,000 to 100,000?*

\`\`\`
┌───────────────────────────────────────────────────────────────┐
│              SOFTWARE UNIT ECONOMICS FORMULA                  │
├───────────────────────────────────────────────────────────────┤
│   Gross Profit Margin = (ARPU - Cost-to-Serve) / ARPU         │
│                                                               │
│   Where Cost-to-Serve (COGS) includes:                        │
│   - Cloud compute & database allocations                      │
│   - Third-party API / LLM token consumption                   │
│   - QA verification & automated CI pipeline runtime           │
│   - Customer support ticket handling for defect triage        │
└───────────────────────────────────────────────────────────────┘
\`\`\`

When developers fail to factor in unit economics, companies experience the painful phenomenon of "scaling into bankruptcy"—growing top-line user numbers while gross margins collapse due to unoptimized database queries, redundant polling, and memory leaks.

### The True Cost of Technical Debt
Financial modeling clarifies the exact cost of technical debt. Technical debt is not an abstract aesthetic flaw; it behaves exactly like financial debt with compounding interest:
- **Principal:** The shortcuts taken to rush a feature out the door.
- **Interest Payments:** The 20% slowdown in team sprint velocity every week because the codebase has become convoluted and fragile.
- **Default:** When a catastrophic outage or critical data corruption causes enterprise client churn.

By framing technical refactoring in financial terms—demonstrating how addressing architectural debt saves hundreds of engineering hours and protects gross revenue—engineers can communicate with CFOs and engineering directors in their native language.

---

## 3. Building Resilient Systems as Sustainable Businesses

Engineering resilience and business sustainability are two sides of the same coin. During my career in QA automation and fullstack engineering, I treated automated testing and fault tolerance as technical virtues. Through the lens of entrepreneurial studies, I now view them as **capital preservation and risk mitigation**.

### 1. Defect Costs Compound Exponentially
The classic Boehm software defect cost curve states that a bug caught in production costs up to 100x more to fix than one caught during design or unit testing. In business terms:
- A bug caught in local tests costs 15 minutes of developer time (~$20).
- The same bug slipping into production can trigger emergency hotfixes, database rollbacks, customer support spikes, SLA penalty payouts, and brand reputation damage costing thousands of dollars.

Implementing shift-left automated testing across Selenium, Playwright, and Cypress is not just good development hygiene; it directly protects the company's operating cash flow and runway.

### 2. Strategic "Build vs. Buy" Decisions
Early-stage startups and established product teams frequently waste precious capital building in-house tooling that provides zero competitive advantage. An entrepreneurial engineer rigorously evaluates:
- **Core Value Proposition:** Build proprietary technology only where it delivers unique differentiation (e.g., our specialized routing algorithm or proprietary ML model).
- **Commodity Capabilities:** Buy or leverage managed solutions for commodity infrastructure (e.g., Auth0 for authentication, Stripe for payments, Datadog for telemetry).

Building a custom authentication system might be intellectually satisfying for an engineer, but spending three months of developer payroll on a problem solved by off-the-shelf APIs burns runway without adding enterprise valuation.

---

## 4. The Rise of the Strategic Engineer

Cluj-Napoca has long been celebrated as the Silicon Valley of Eastern Europe, known for its deep engineering talent. But as the tech ecosystem matures, pure outsourced execution is giving way to high-impact product leadership and homegrown ventures.

The engineers who will lead the next generation of tech companies must possess a dual vocabulary:
- They can discuss Java virtual machine garbage collection tuning, database index cardinality, and Playwright async test fixtures.
- But they can also articulate Contribution Margin, Customer Lifetime Value (LTV), Payback Periods, and Risk-Adjusted Cash Flows.

\`\`\`
       ┌─────────────────────────────────────────────────────────┐
       │              THE DUAL-VOCABULARY ENGINEER               │
       └─────────────────────────────────────────────────────────┘
                    ▲                               ▲
                    │                               │
       ┌────────────────────────┐      ┌─────────────────────────┐
       │ TECHNICAL EXCELLENCE   │      │ BUSINESS ACUMEN         │
       │ - Spring Boot & Java   │      │ - Financial Modeling    │
       │ - QA Automation (E2E)  │      │ - Cloud Unit Economics  │
       │ - CI/CD & Reliability  │      │ - Cost & Runway Planning│
       │ - Distributed Systems  │      │ - Product-Market Fit    │
       └────────────────────────┘      └─────────────────────────┘
\`\`\`

---

## Conclusion: Engineering the Future

My Master's in Entrepreneurship at UTCN is not an exit from engineering; it is an amplification of it. 

When software engineers appreciate balance sheets and cost models, we make smarter architectural trade-offs. We build systems that are not only performant and clean, but also economically viable, operationally resilient, and built to survive in competitive markets.

Bridging the gap between code and capital is where true innovation happens—and that is the mindset I bring to every project, codebase, and team I join.
`
  };

  /* ============================================================================
     2. THEME ENGINE (Dark / Light Mode)
     ============================================================================ */
  const THEME_STORAGE_KEY = 'dt-portfolio-theme';

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

    // Update all theme toggle buttons
    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    toggleButtons.forEach(btn => {
      const nextTheme = theme === 'dark' ? 'light' : 'dark';
      btn.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
      btn.setAttribute('title', `Switch to ${nextTheme} theme`);
    });
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    applyTheme(newTheme);
  }

  function initTheme() {
    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    // Bind theme toggle clicks
    document.addEventListener('click', e => {
      const toggleBtn = e.target.closest('.theme-toggle-btn');
      if (toggleBtn) {
        e.preventDefault();
        toggleTheme();
      }
    });

    // Listen to OS scheme changes if user hasn't explicitly set a preference
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
          applyTheme(e.matches ? 'light' : 'dark');
        }
      });
    }
  }

  /* ============================================================================
     3. MOBILE NAVIGATION DRAWER
     ============================================================================ */
  function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-toggle-btn');
    const drawer = document.querySelector('.mobile-drawer');

    if (!toggleBtn || !drawer) return;

    function openDrawer() {
      drawer.classList.add('open', 'is-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.setAttribute('aria-label', 'Close mobile navigation');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open', 'is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Open mobile navigation');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = drawer.classList.contains('open') || drawer.classList.contains('is-open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Close when clicking any nav link in drawer
    drawer.addEventListener('click', e => {
      if (e.target.closest('.nav-link') || e.target.closest('a')) {
        closeDrawer();
      }
    });

    // Close when clicking outside drawer
    document.addEventListener('click', e => {
      const isOpen = drawer.classList.contains('open') || drawer.classList.contains('is-open');
      if (isOpen && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeDrawer();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeDrawer();
      }
    });
  }

  /* ============================================================================
     4. PROJECT FILTER ENGINE
     ============================================================================ */
  function updateProjectFilterCounts() {
    const filterContainer = document.querySelector('.projects-filter-bar');
    const projectCards = document.querySelectorAll('.project-card');
    if (!filterContainer || projectCards.length === 0) return;

    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      const filter = btn.getAttribute('data-filter') || 'all';
      let count = 0;
      if (filter === 'all') {
        count = projectCards.length;
      } else {
        projectCards.forEach(card => {
          const category = (card.getAttribute('data-category') || '').toLowerCase();
          if (category.includes(filter.toLowerCase())) {
            count++;
          }
        });
      }

      let countBadge = btn.querySelector('.filter-count');
      if (!countBadge) {
        countBadge = document.createElement('span');
        countBadge.className = 'filter-count';
        btn.appendChild(countBadge);
      }
      countBadge.textContent = count.toString();
    });
  }

  function initProjectFilters() {
    const filterContainer = document.querySelector('.projects-filter-bar');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterContainer || projectCards.length === 0) return;

    // Calculate dynamic project counts based exactly on what is in the DOM
    updateProjectFilterCounts();

    const filterButtons = filterContainer.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') || 'all';

        // Update active class
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter cards
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          if (filter === 'all' || category.includes(filter)) {
            card.classList.remove('is-hidden');
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  /* ============================================================================
     5. CLIPBOARD UTILITY & FLOATING TOAST
     ============================================================================ */
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('toast-show');
    });

    // Remove after 3.2 seconds
    setTimeout(() => {
      toast.classList.remove('toast-show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3200);
  }

  function copyToClipboard(text, successMessage) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => {
          showToast(successMessage || `Copied "${text}" to clipboard!`);
        })
        .catch(() => {
          fallbackCopyToClipboard(text, successMessage);
        });
    } else {
      fallbackCopyToClipboard(text, successMessage);
    }
  }

  function fallbackCopyToClipboard(text, successMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      showToast(successMessage || `Copied "${text}" to clipboard!`);
    } catch (err) {
      showToast(`Copy manually: ${text}`);
    } finally {
      document.body.removeChild(textArea);
    }
  }

  function initCopyButtons() {
    document.addEventListener('click', e => {
      const copyBtn = e.target.closest('[data-copy-text]');
      if (copyBtn) {
        e.preventDefault();
        const text = copyBtn.getAttribute('data-copy-text');
        const defaultMsg = currentLang === 'ro' ? 'Copiat în clipboard!' : 'Copied to clipboard!';
        const message = copyBtn.getAttribute('data-copy-message') || defaultMsg;
        copyToClipboard(text, message);

        // Immediate visual inline feedback on the button
        const originalHTML = copyBtn.innerHTML;
        const feedbackText = currentLang === 'ro' ? '✓ Copiat!' : '✓ Copied!';
        copyBtn.innerHTML = `<span>${feedbackText}</span>`;
        copyBtn.classList.add('is-copied');

        setTimeout(() => {
          copyBtn.innerHTML = originalHTML;
          copyBtn.classList.remove('is-copied');
        }, 2000);
      }
    });
  }

  /* ============================================================================
     6. ROBUST CLIENT-SIDE MARKDOWN-TO-HTML PARSER
     Supports: Frontmatter, Headings, Code Blocks, Tables, Lists, Blockquotes,
               Bold, Italics, Links, Inline Code, Horizontal Rules.
     ============================================================================ */
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function parseFrontmatter(raw) {
    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
    const match = raw.match(frontmatterRegex);

    if (!match) {
      return { metadata: {}, content: raw };
    }

    const yamlBlock = match[1];
    const content = raw.slice(match[0].length);
    const metadata = {};

    yamlBlock.split(/\r?\n/).forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim();
        let val = line.slice(colonIndex + 1).trim();

        // Strip quotes
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }

        // Parse array [a, b]
        if (val.startsWith('[') && val.endsWith(']')) {
          try {
            val = JSON.parse(val.replace(/'/g, '"'));
          } catch {
            val = val.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
          }
        }

        metadata[key] = val;
      }
    });

    return { metadata, content };
  }

  function parseMarkdown(rawMarkdown) {
    const { metadata, content } = parseFrontmatter(rawMarkdown);

    const lines = content.split(/\r?\n/);
    const htmlParts = [];
    let inCodeBlock = false;
    let codeLanguage = '';
    let codeBuffer = [];
    let inTable = false;
    let tableRows = [];
    let inList = false;
    let listType = ''; // 'ul' or 'ol'
    let inBlockquote = false;
    let blockquoteBuffer = [];

    function flushBlockquote() {
      if (inBlockquote && blockquoteBuffer.length > 0) {
        const innerText = blockquoteBuffer.join(' ');
        htmlParts.push(`<blockquote><p>${parseInlineMarkdown(innerText)}</p></blockquote>`);
        blockquoteBuffer = [];
        inBlockquote = false;
      }
    }

    function flushList() {
      if (inList) {
        htmlParts.push(`</${listType}>`);
        inList = false;
        listType = '';
      }
    }

    function flushTable() {
      if (inTable && tableRows.length > 0) {
        let tableHtml = '<div class="table-wrapper"><table>';
        tableRows.forEach((row, idx) => {
          // Skip markdown divider row |:---|:---|
          if (/^\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/.test(row)) return;

          const cells = row.split('|').map(c => c.trim()).filter((c, i, arr) => {
            // Keep content cells, trim leading/trailing empty cells from border pipes
            if ((i === 0 || i === arr.length - 1) && c === '') return false;
            return true;
          });

          if (cells.length === 0) return;

          if (idx === 0) {
            tableHtml += '<thead><tr>';
            cells.forEach(cell => {
              tableHtml += `<th>${parseInlineMarkdown(cell)}</th>`;
            });
            tableHtml += '</tr></thead><tbody>';
          } else {
            tableHtml += '<tr>';
            cells.forEach(cell => {
              tableHtml += `<td>${parseInlineMarkdown(cell)}</td>`;
            });
            tableHtml += '</tr>';
          }
        });
        tableHtml += '</tbody></table></div>';
        htmlParts.push(tableHtml);
        tableRows = [];
        inTable = false;
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Fenced code block toggling
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          flushBlockquote();
          flushList();
          flushTable();
          inCodeBlock = true;
          codeLanguage = line.trim().slice(3).trim();
          codeBuffer = [];
        } else {
          inCodeBlock = false;
          const escapedCode = escapeHtml(codeBuffer.join('\n'));
          const langClass = codeLanguage ? ` class="language-${escapeHtml(codeLanguage)}"` : '';
          htmlParts.push(`<pre class="code-block"><code${langClass}>${escapedCode}</code></pre>`);
          codeBuffer = [];
          codeLanguage = '';
        }
        continue;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        continue;
      }

      // Markdown Table row
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        flushBlockquote();
        flushList();
        inTable = true;
        tableRows.push(line.trim());
        continue;
      } else if (inTable) {
        flushTable();
      }

      // Blockquotes
      if (line.trim().startsWith('>')) {
        flushList();
        inBlockquote = true;
        blockquoteBuffer.push(line.trim().replace(/^>\s?/, ''));
        continue;
      } else if (inBlockquote) {
        flushBlockquote();
      }

      // Unordered list
      const ulMatch = line.match(/^(\s*)[-*+]\s+(.*)$/);
      if (ulMatch) {
        flushBlockquote();
        if (!inList || listType !== 'ul') {
          flushList();
          inList = true;
          listType = 'ul';
          htmlParts.push('<ul>');
        }
        htmlParts.push(`<li>${parseInlineMarkdown(ulMatch[2])}</li>`);
        continue;
      }

      // Ordered list
      const olMatch = line.match(/^(\s*)\d+\.\s+(.*)$/);
      if (olMatch) {
        flushBlockquote();
        if (!inList || listType !== 'ol') {
          flushList();
          inList = true;
          listType = 'ol';
          htmlParts.push('<ol>');
        }
        htmlParts.push(`<li>${parseInlineMarkdown(olMatch[2])}</li>`);
        continue;
      }

      // If not in a list anymore, flush list
      if (inList && line.trim() === '') {
        flushList();
        continue;
      }

      // Horizontal Rule
      if (/^(\*{3,}|-{3,}|_{3,})$/.test(line.trim())) {
        flushBlockquote();
        flushList();
        htmlParts.push('<hr class="section-divider">');
        continue;
      }

      // Headings
      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        flushBlockquote();
        flushList();
        const level = headingMatch[1].length;
        const text = headingMatch[2];
        const id = text.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        htmlParts.push(`<h${level} id="${id}">${parseInlineMarkdown(text)}</h${level}>`);
        continue;
      }

      // Blank line
      if (line.trim() === '') {
        flushBlockquote();
        continue;
      }

      // Regular Paragraph
      flushBlockquote();
      flushList();
      htmlParts.push(`<p>${parseInlineMarkdown(line)}</p>`);
    }

    // Flush any pending state
    flushBlockquote();
    flushList();
    flushTable();

    return {
      metadata,
      html: htmlParts.join('\n')
    };
  }

  function parseInlineMarkdown(text) {
    if (!text) return '';

    let out = escapeHtml(text);

    // Inline code `code`
    out = out.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold **text** or __text__
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/__([^_]+)__/g, '<strong>$1</strong>');

    // Italics *text* or _text_
    out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    out = out.replace(/_([^_]+)_/g, '<em>$1</em>');

    // Strikethrough ~~text~~
    out = out.replace(/~~([^~]+)~~/g, '<del>$1</del>');

    // Links [title](url)
    out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, title, url) => {
      const isExternal = url.startsWith('http://') || url.startsWith('https://');
      const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${url}"${targetAttr}>${title}</a>`;
    });

    return out;
  }

  /* ============================================================================
     7. BLOG PORTAL & ARTICLE READER ENGINE
     ============================================================================ */
  function initBlogPortal() {
    const listContainer = document.getElementById('articles-list-container');
    const readerContainer = document.getElementById('article-reader-container');
    const readerContent = document.getElementById('article-reader-content');
    const searchInput = document.getElementById('blog-search-input');
    const tagsContainer = document.getElementById('blog-tags-filter');
    const progressBar = document.getElementById('reading-progress-bar');

    if (!listContainer || !readerContainer || !readerContent) return;

    // Helper: Load article by slug
    async function loadArticle(slug) {
      // 1. Try to fetch from network if supported
      let rawMarkdown = '';
      try {
        if (window.location.protocol !== 'file:') {
          const resp = await fetch(`posts/${slug}.md`);
          if (resp.ok) {
            rawMarkdown = await resp.text();
          }
        }
      } catch (e) {
        // Fallback to embedded posts
      }

      // 2. Fallback to embedded dictionary
      if (!rawMarkdown && EMBEDDED_POSTS[slug]) {
        rawMarkdown = EMBEDDED_POSTS[slug];
      }

      if (!rawMarkdown) {
        renderError(`Article "${slug}" could not be found.`);
        return;
      }

      const parsed = parseMarkdown(rawMarkdown);
      renderArticle(slug, parsed);
    }

    function renderError(message) {
      listContainer.style.display = 'none';
      readerContainer.style.display = 'block';
      readerContent.innerHTML = `
        <div class="callout callout-warning">
          <div>
            <h3>Article Not Found</h3>
            <p>${escapeHtml(message)}</p>
            <p><a href="blog.html" class="btn btn-secondary btn-sm">Return to Articles</a></p>
          </div>
        </div>
      `;
    }

    function renderArticle(slug, parsed) {
      const meta = parsed.metadata || {};
      const title = meta.title || 'Untitled Article';
      const date = meta.date || '';
      const readingTime = meta.readingTime || '5 min';
      const tags = Array.isArray(meta.tags) ? meta.tags : [];

      document.title = `${title} — Dragoș Tecuci`;

      // Render Header and Article Body
      const tagsHtml = tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join(' ');

      readerContent.innerHTML = `
        <div class="article-header-meta">
          <a href="blog.html" class="back-to-articles-btn" id="btn-back-to-articles">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to all articles
          </a>

          <div class="blog-meta">
            ${date ? `<span class="blog-date">${escapeHtml(date)}</span>` : ''}
            <span class="blog-read-time">${escapeHtml(readingTime)} read</span>
            <span class="blog-read-time">By ${escapeHtml(meta.author || 'Dragoș Tecuci')}</span>
          </div>

          <div class="tag-list" style="margin-top: 1rem; margin-bottom: 0;">
            ${tagsHtml}
          </div>
        </div>

        <div class="article-reader prose">
          ${parsed.html}
        </div>

        <div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border-default); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <a href="blog.html" class="back-to-articles-btn" style="margin-bottom: 0;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            ${currentLang === 'ro' ? 'Înapoi la toate articolele' : 'Back to all articles'}
          </a>
          <button class="btn btn-secondary btn-share-article" id="btn-share-article">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
            </svg>
            ${currentLang === 'ro' ? 'Distribuie Articol' : 'Share Article'}
          </button>
        </div>
      `;

      listContainer.style.display = 'none';
      readerContainer.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'instant' });

      // 1. Enhance code blocks with wrapper, header, language badge and copy button
      readerContent.querySelectorAll('.article-reader pre').forEach(preEl => {
        const codeEl = preEl.querySelector('code');
        if (!codeEl) return;
        
        let lang = 'CODE';
        const match = (codeEl.className || '').match(/language-([a-zA-Z0-9#+]+)/i);
        if (match) {
          lang = match[1].toUpperCase();
        } else if (preEl.className && preEl.className.includes('language-')) {
          const m = preEl.className.match(/language-([a-zA-Z0-9#+]+)/i);
          if (m) lang = m[1].toUpperCase();
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        
        const header = document.createElement('div');
        header.className = 'code-block-header';
        header.innerHTML = `
          <span class="code-block-lang">${escapeHtml(lang)}</span>
          <button type="button" class="code-copy-btn" title="${currentLang === 'ro' ? 'Copiază codul' : 'Copy code'}">
            <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>${currentLang === 'ro' ? 'Copiază' : 'Copy'}</span>
          </button>
        `;

        preEl.parentNode.insertBefore(wrapper, preEl);
        wrapper.appendChild(header);
        wrapper.appendChild(preEl);

        const copyBtn = header.querySelector('.code-copy-btn');
        copyBtn.addEventListener('click', () => {
          const text = codeEl.innerText || codeEl.textContent;
          copyToClipboard(text, currentLang === 'ro' ? 'Cod copiat!' : 'Code copied!');
          copyBtn.classList.add('is-copied');
          copyBtn.innerHTML = `<span>${currentLang === 'ro' ? '✓ Copiat!' : '✓ Copied!'}</span>`;
          setTimeout(() => {
            copyBtn.classList.remove('is-copied');
            copyBtn.innerHTML = `
              <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>${currentLang === 'ro' ? 'Copiază' : 'Copy'}</span>
            `;
          }, 2000);
        });
      });

      // 2. Generate Table of Contents (TOC) if article has 2+ headings
      const headings = readerContent.querySelectorAll('.article-reader h2, .article-reader h3');
      if (headings.length >= 2) {
        const tocContainer = document.createElement('nav');
        tocContainer.className = 'article-toc';
        tocContainer.setAttribute('aria-label', currentLang === 'ro' ? 'Cuprins articol' : 'Table of Contents');
        
        let tocListHtml = '';
        headings.forEach((heading, idx) => {
          let id = heading.id;
          if (!id) {
            id = 'sec-' + idx + '-' + heading.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            heading.id = id;
          }
          const isH3 = heading.tagName.toLowerCase() === 'h3';
          tocListHtml += `
            <li class="article-toc-item ${isH3 ? 'toc-h3' : 'toc-h2'}">
              <a href="#${id}" class="article-toc-link">
                <span>${isH3 ? '↳' : '•'}</span>
                <span>${escapeHtml(heading.textContent)}</span>
              </a>
            </li>
          `;
        });

        tocContainer.innerHTML = `
          <div class="article-toc-title">
            <span>📑</span>
            <span>${currentLang === 'ro' ? 'Cuprins Articol' : 'Table of Contents'}</span>
          </div>
          <ul class="article-toc-list">
            ${tocListHtml}
          </ul>
        `;

        const readerEl = readerContent.querySelector('.article-reader');
        if (readerEl) {
          readerContent.insertBefore(tocContainer, readerEl);
        }
      }

      // 3. Wire all back buttons (both top and bottom) smoothly without reload
      readerContent.querySelectorAll('.back-to-articles-btn').forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          history.pushState(null, '', 'blog.html');
          showListView();
        });
      });

      // 4. Share button with Web Share API or Clipboard fallback
      const shareBtn = readerContent.querySelector('.btn-share-article');
      if (shareBtn) {
        shareBtn.addEventListener('click', async e => {
          e.preventDefault();
          if (navigator.share) {
            try {
              await navigator.share({
                title: document.title,
                text: title,
                url: window.location.href
              });
              return;
            } catch (err) {
              // Aborted or not allowed, fallback
            }
          }
          copyToClipboard(window.location.href, currentLang === 'ro' ? 'Link articol copiat!' : 'Article link copied!');
          shareBtn.classList.add('is-copied');
          shareBtn.innerHTML = `<span>${currentLang === 'ro' ? '✓ Link Copiat!' : '✓ Link Copied!'}</span>`;
          setTimeout(() => {
            shareBtn.classList.remove('is-copied');
            shareBtn.innerHTML = `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
              </svg>
              ${currentLang === 'ro' ? 'Distribuie Articol' : 'Share Article'}
            `;
          }, 2000);
        });
      }
    }

    function showListView() {
      document.title = 'Blog & Engineering Writing — Dragoș Tecuci';
      listContainer.style.display = 'block';
      readerContainer.style.display = 'none';
      if (progressBar) progressBar.style.width = '0%';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Check URL parameters on load or popstate
    function checkRoute() {
      const urlParams = new URLSearchParams(window.location.search);
      const postParam = urlParams.get('post') || window.location.hash.replace(/^#post=/, '').replace(/^#/, '');

      if (postParam && EMBEDDED_POSTS[postParam]) {
        loadArticle(postParam);
      } else if (postParam && postParam.length > 2) {
        loadArticle(postParam);
      } else {
        showListView();
      }
    }

    window.addEventListener('popstate', checkRoute);
    checkRoute();

    // Reading Progress Bar handler
    window.addEventListener('scroll', () => {
      if (readerContainer.style.display !== 'none' && progressBar) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
          progressBar.style.width = `${progress}%`;
        }
      }
    }, { passive: true });

    // Search & Tag Filter for Article Cards
    const cards = listContainer.querySelectorAll('.blog-card');

    function filterCards() {
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const activeTagBtn = tagsContainer ? tagsContainer.querySelector('.filter-btn.active') : null;
      const activeTag = activeTagBtn ? activeTagBtn.getAttribute('data-tag') : 'all';

      let visibleCount = 0;

      cards.forEach(card => {
        const title = (card.querySelector('.blog-title') ? card.querySelector('.blog-title').textContent : '').toLowerCase();
        const excerpt = (card.querySelector('.blog-excerpt') ? card.querySelector('.blog-excerpt').textContent : '').toLowerCase();
        const tags = (card.getAttribute('data-tags') || '').toLowerCase();

        const matchesQuery = !query || title.includes(query) || excerpt.includes(query) || tags.includes(query);
        const matchesTag = activeTag === 'all' || tags.includes(activeTag.toLowerCase());

        if (matchesQuery && matchesTag) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      const noResultsEl = document.getElementById('no-articles-message');
      if (noResultsEl) {
        noResultsEl.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    function updateBlogTagCounts() {
      if (!tagsContainer) return;
      const tagButtons = tagsContainer.querySelectorAll('.filter-btn');
      tagButtons.forEach(btn => {
        const tag = btn.getAttribute('data-tag') || 'all';
        let count = 0;
        if (tag === 'all') {
          count = cards.length;
        } else {
          cards.forEach(card => {
            const tags = (card.getAttribute('data-tags') || '').toLowerCase();
            if (tags.includes(tag.toLowerCase())) {
              count++;
            }
          });
        }

        let countBadge = btn.querySelector('.filter-count');
        if (!countBadge) {
          countBadge = document.createElement('span');
          countBadge.className = 'filter-count';
          btn.appendChild(countBadge);
        }
        countBadge.textContent = count.toString();
      });
    }

    // Dynamic initial count on blog tags
    updateBlogTagCounts();

    if (searchInput) {
      searchInput.addEventListener('input', filterCards);
    }

    if (tagsContainer) {
      tagsContainer.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (btn) {
          tagsContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          filterCards();
        }
      });
    }
  }

  /* ============================================================================
     8. ACTIVE NAVIGATION HIGHLIGHT & SCROLLSPY
     ============================================================================ */
  function initNavHighlight() {
    const currentPath = window.location.pathname.toLowerCase();
    const navLinks = document.querySelectorAll('.nav-menu .nav-link, .mobile-drawer .nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      const cleanHref = href.toLowerCase();

      // Check for matching page
      if (
        (cleanHref === 'blog.html' && currentPath.includes('blog')) ||
        (cleanHref === 'resume.html' && currentPath.includes('resume')) ||
        (cleanHref === 'index.html' && (currentPath.endsWith('index.html') || currentPath.endsWith('/')))
      ) {
        link.classList.add('active');
      }
    });

    // In-page scrollspy for index.html anchors
    if (currentPath.endsWith('index.html') || currentPath.endsWith('/') || !currentPath.includes('.')) {
      const sections = document.querySelectorAll('section[id]');
      if (sections.length === 0) return;

      window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSectionId = section.getAttribute('id');
          }
        });

        if (currentSectionId) {
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
              if (href === `#${currentSectionId}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            }
          });
        }
      }, { passive: true });
    }
  }

  /* ============================================================================
     9. BILINGUAL TRANSLATION ENGINE (RO | EN) FOR PORTFOLIO & BLOG
     ============================================================================ */
  const LANG_STORAGE_KEY = 'preferredLang';

  const TRANSLATIONS = {
    ro: {
      'nav.about': 'Despre mine',
      'nav.experience': 'Experiență',
      'nav.projects': 'Proiecte',
      'nav.skills': 'Abilități',
      'nav.services': '🛠️ Servicii Cluj',
      'nav.blog': 'Blog',
      'nav.resume': 'Mini-CV',
      'nav.contact': 'Contact',

      'hero.status': 'Disponibil pentru proiecte &amp; colaborări',
      'hero.title': 'Dragoș Tecuci - <br><span class="text-accent-gradient">Inginer Software</span> &amp; QA Specialist',
      'hero.bio': 'Fullstack Developer &amp; Tester QA stabilit în <strong>Cluj-Napoca, România</strong>, masterand în <strong>Antreprenoriat la UTCN</strong> (2025–2027). Construiesc backend-uri Java fiabile, creez cadre robuste de testare automată (Cypress, Selenium) și ofer mentenanță meticuloasă hardware &amp; termică pentru PC/laptopuri comunității locale.',
      'hero.cta_services': '<span>🛠️ Servicii Cluj</span><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
      'hero.cta_blog': '<span>Citește Blogul</span><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
      'hero.cta_cv': '<span>Vezi Mini-CV</span><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
      'hero.copy_email': 'Copiază Email',

      'gateway.tech.badge': '📍 Cluj-Napoca Local',
      'gateway.tech.turnaround': 'Rezolvare 2–4 ore',
      'gateway.tech.title': '<span>🛠️</span> Servicii PC &amp; Laptop',
      'gateway.tech.desc': 'Instalare Windows 10/11 optimizat, curățare completă de praf și înlocuire pastă termică premium (Arctic MX-6 / Noctua) cu <strong>test de temperatură pe loc, la predare</strong>.',
      'gateway.tech.f1': '<span style="color: var(--accent-emerald);">✔</span> Formatare corectă, drivere &amp; pachet Office',
      'gateway.tech.f2': '<span style="color: var(--accent-emerald);">✔</span> Răcire optimizată (-27°C în FurMark/Cinebench)',
      'gateway.tech.f3': '<span style="color: var(--accent-emerald);">✔</span> Upgrade SSD/RAM &amp; asistență gratuită',
      'gateway.tech.btn_catalog': '<span>Vezi Catalog &amp; Tarife</span><svg viewBox="0 0 24 24" style="width: 14px; height: 14px;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',

      'gateway.eng.badge': '💻 Fullstack &amp; QA',
      'gateway.eng.turnaround': 'UTCN MS \'27',
      'gateway.eng.title': '<span>⚙️</span> Inginerie Software &amp; QA',
      'gateway.eng.desc': 'Microservicii Java &amp; Spring Boot rezistente, triada de testare automată (Selenium, Playwright, Cypress) și modelare financiară a costurilor cloud.',
      'gateway.eng.f1': '<span style="color: var(--accent-primary);">✔</span> 15k req/min throughput &amp; zero regresii critice',
      'gateway.eng.f2': '<span style="color: var(--accent-primary);">✔</span> Arhitectură shift-left &amp; CI/CD pipelines',
      'gateway.eng.f3': '<span style="color: var(--accent-primary);">✔</span> Masterat Antreprenoriat la UTCN Cluj',
      'gateway.eng.btn_projects': '<span>Proiecte Flagship</span>',
      'gateway.eng.btn_cv': '<span>Mini-CV 📄</span>',

      'metrics.m1_value': '2+ Ani',
      'metrics.m1_label': 'Inginerie Software &amp; QA',
      'metrics.m1_sub': 'Microservicii Java, Spring Boot &amp; testare shift-left',
      'metrics.m2_value': '3 Cadre',
      'metrics.m2_label': 'Testare Automată E2E',
      'metrics.m2_sub': 'Selenium (Java), Playwright (Python), Cypress (TS)',
      'metrics.m3_value': '15k req/min',
      'metrics.m3_label': 'Debit Microservicii',
      'metrics.m3_sub': 'Pipeline comenzi concurent cu zero regresii critice',
      'metrics.m4_value': 'UTCN Dual',
      'metrics.m4_label': 'Masterat Antreprenoriat + Licență',
      'metrics.m4_sub': 'Măiestrie software + modelare unit economics &amp; ROI',

      'techspotlight.eyebrow': '🛠️ Servicii Cluj-Napoca',
      'techspotlight.title': 'Servicii Software &amp; Mentenanță Laptop / PC',
      'techspotlight.desc': 'Servicii de calitate superioară realizate de un inginer software. Rezolvare rapidă în aceeași zi, prețuri transparente și <strong>testul de temperatură efectuat la fața locului</strong>, la predare.',
      'techspotlight.c1_tag': '💻 Software',
      'techspotlight.c1_time': '2–3 ore',
      'techspotlight.c1_title': 'Instalare Windows 10/11 + Office',
      'techspotlight.c1_desc': 'Formatare corectă partiții, instalare oficială Windows fără bloatware, instalare toate driverele și pachet complet Microsoft Office + utilitare.',
      'techspotlight.c1_btn': 'Detalii Serviciu',
      'techspotlight.c2_tag': '🔧 Hardware',
      'techspotlight.c2_time': '1.5–2 ore',
      'techspotlight.c2_title': 'Curățare Praf + Pastă Arctic MX-6',
      'techspotlight.c2_desc': 'Demontare meticuloasă, curățare ventilatoare și radiatoare de cupru, schimb pastă termică de înaltă conductivitate și test temperatură pe loc.',
      'techspotlight.c2_btn': 'Detalii Serviciu',
      'techspotlight.c3_badge': '⚡ Pachet Rebirth Total',
      'techspotlight.c3_save': 'Economisești 80 RON',
      'techspotlight.c3_title': 'Curățare Completă + Windows Curat',
      'techspotlight.c3_desc': 'Soluția completă: curățare de praf, pastă termică nouă, Windows 10/11 instalat pe curat, drivere, Office și backup de siguranță fișiere.',
      'techspotlight.c3_btn': 'Calculează &amp; Comandă',
      'techspotlight.banner_title': 'Ai nevoie de o intervenție sau o estimare exactă în Cluj?',
      'techspotlight.banner_desc': 'Vizitează portalul dedicat cu calculator de preț în timp real, simulator termic și galerie cu lucrări efectuate.',
      'techspotlight.banner_btn1': '<span>Deschide Pagina de Servicii &amp; Calculator ➔</span>',
      'techspotlight.banner_btn2': '<span>💬 Scrie-mi pe WhatsApp</span>',

      'exp.eyebrow': 'Traiectorie Profesională',
      'exp.title': 'Experiență &amp; Educație',
      'exp.desc': 'Îmbinând ingineria backend fullstack cu verificarea calității automate și modelarea strategică de business.',
      'exp.btn_cv': '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg><span>Vezi &amp; Printează Mini-CV (PDF)</span>',

      'proj.eyebrow': 'Sisteme &amp; Arhitecturi',
      'proj.title': 'Proiecte Flagship',
      'proj.desc': 'Inițiative inginerești axate pe microservicii distribuite, cadre avansate de testare automată și calculatoare de unit economics.',
      'proj.filter_all': 'Toate Proiectele',
      'proj.filter_backend': 'Backend &amp; Fullstack',
      'proj.filter_qa': 'QA &amp; Automatizare',
      'proj.filter_strategy': 'Sisteme &amp; Strategie',

      'skills.eyebrow': 'Competențe Tehnice',
      'skills.title': 'Abilități &amp; Tehnologii',
      'skills.desc': 'O privire de ansamblu asupra limbajelor de programare, arhitecturilor backend, suitelor de testare și modelării economice.',

      'blog.eyebrow': 'Perspective &amp; Articole Inginerești',
      'blog.title': 'Ultimele Articole',
      'blog.desc': 'Analize tehnice aprofundate despre testarea modernă și reflexii despre îmbinarea ingineriei software cu studiile antreprenoriale.',
      'blog.btn_all': '<span>Explorează Toate Articolele</span><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
      'blog.read_more': '<span>Citește Articolul</span><svg viewBox="0 0 24 24" style="width: 14px; height: 14px;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',

      'contact.eyebrow': 'Colaborare &amp; Contact',
      'contact.title': 'Hai să construim ceva durabil împreună',
      'contact.desc': 'Fie că ai nevoie de un inginer Java perseverent, un arhitect QA pentru a crește calitatea livrărilor, sau o gândire antreprenorială axată pe eficiență, mi-ar face mare plăcere să colaborăm.',
      'contact.btn_email': '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg><span>Copiază Email</span>',
      'contact.btn_linkedin': '<svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 1.62 1.62 1.62 1.62 0 0 0-1.62-1.62z"/></svg><span>Conectează-te pe LinkedIn</span>',
      'contact.btn_cv': '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg><span>Vezi Mini-CV</span>',

      'nav.evidence': 'Evidență Lucrări 🔒',
      'projects.btn_repo': 'GitHub Repository ↗',
      'projects.p1_title': 'Platformă Scalabilă de Management Energetic &amp; Telemetrie',
      'projects.p2_title': 'Cozi Multithreaded &amp; Concurrency Management Engine',
      'projects.p3_title': 'API Intercepts &amp; Resilient UI Test Automation Harness',
      'projects.p4_title': 'Suită Nativă de Benchmarking &amp; Telemetrie Termică',

      'blog.header_title': 'Perspective Tehnice &amp; Ghiduri',
      'blog.header_desc': 'Articole inginerești aprofundate despre testare automată, arhitecturi reziliente și antreprenoriat.',
      'blog.search_placeholder': 'Caută articole după titlu, tag sau concept...',
      'blog.filter_all': 'Toate Articolele',
      'blog.filter_qa': 'QA &amp; Automatizare',
      'blog.filter_architecture': 'Arhitectură',
      'blog.filter_entrepreneurship': 'Antreprenoriat',

      'footer.copy': '&copy; 2026 Dragoș Tecuci. Creat cu atenție în Cluj-Napoca, România.'
    },
    en: {
      'nav.about': 'About',
      'nav.experience': 'Experience',
      'nav.projects': 'Projects',
      'nav.skills': 'Skills',
      'nav.services': '🛠️ Tech Services (Cluj)',
      'nav.blog': 'Blog',
      'nav.resume': 'Mini-CV',
      'nav.contact': 'Get in Touch',

      'hero.status': 'Available for high-impact opportunities',
      'hero.title': 'Dragoș Tecuci - <br><span class="text-accent-gradient">Software Engineer</span> &amp; QA Specialist',
      'hero.bio': 'Fullstack &amp; QA automation engineer based in <strong>Cluj-Napoca, Romania</strong>, pursuing a <strong>Master\'s in Entrepreneurship at UTCN</strong> (2025–2027). I build dependable, concurrent Java backends, craft resilient automated test harnesses (Cypress, Selenium), and provide meticulous PC/laptop hardware &amp; thermal maintenance for the local tech community.',
      'hero.cta_services': '<span>🛠️ Tech Services</span><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
      'hero.cta_blog': '<span>Read Blog</span><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
      'hero.cta_cv': '<span>View Mini-CV</span><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
      'hero.copy_email': 'Copy Email',

      'gateway.tech.badge': '📍 Cluj-Napoca Local',
      'gateway.tech.turnaround': '2–4h Turnaround',
      'gateway.tech.title': '<span>🛠️</span> PC &amp; Laptop Services',
      'gateway.tech.desc': 'Optimized Windows 10/11 installation, thorough dust cleaning, and premium thermal paste replacement (Arctic MX-6 / Noctua) with <strong>live thermal benchmark test at handover</strong>.',
      'gateway.tech.f1': '<span style="color: var(--accent-emerald);">✔</span> Clean partition formatting, drivers &amp; Office pack',
      'gateway.tech.f2': '<span style="color: var(--accent-emerald);">✔</span> Optimized thermals (-27°C in FurMark/Cinebench)',
      'gateway.tech.f3': '<span style="color: var(--accent-emerald);">✔</span> SSD/RAM upgrades &amp; free aftercare support',
      'gateway.tech.btn_catalog': '<span>View Catalog &amp; Pricing</span><svg viewBox="0 0 24 24" style="width: 14px; height: 14px;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',

      'gateway.eng.badge': '💻 Fullstack &amp; QA',
      'gateway.eng.turnaround': 'UTCN MS \'27',
      'gateway.eng.title': '<span>⚙️</span> Software Engineering &amp; QA',
      'gateway.eng.desc': 'Resilient Java &amp; Spring Boot microservices, the automated testing triad (Selenium, Playwright, Cypress), and cloud unit-economics financial modeling.',
      'gateway.eng.f1': '<span style="color: var(--accent-primary);">✔</span> 15k req/min throughput &amp; zero critical regressions',
      'gateway.eng.f2': '<span style="color: var(--accent-primary);">✔</span> Shift-left testing &amp; automated CI/CD pipelines',
      'gateway.eng.f3': '<span style="color: var(--accent-primary);">✔</span> UTCN Master\'s in Entrepreneurship (Cluj-Napoca)',
      'gateway.eng.btn_projects': '<span>Flagship Projects</span>',
      'gateway.eng.btn_cv': '<span>Mini-CV 📄</span>',

      'metrics.m1_value': '2+ Yrs',
      'metrics.m1_label': 'Production Software &amp; QA',
      'metrics.m1_sub': 'Java microservices, Spring Boot &amp; shift-left testing',
      'metrics.m2_value': '3 Engines',
      'metrics.m2_label': 'Automation Frameworks',
      'metrics.m2_sub': 'Selenium (Java), Playwright (Python), Cypress (TS)',
      'metrics.m3_value': '15k req/min',
      'metrics.m3_label': 'Microservices Throughput',
      'metrics.m3_sub': 'High-concurrency order pipeline with zero regressions',
      'metrics.m4_value': 'UTCN Dual',
      'metrics.m4_label': 'MS Entrepreneurship + BS SE',
      'metrics.m4_sub': 'Software craftsmanship + financial modeling &amp; unit economics',

      'techspotlight.eyebrow': '🛠️ Cluj-Napoca Local Services',
      'techspotlight.title': 'Software Setup &amp; Laptop / PC Maintenance',
      'techspotlight.desc': 'High-standard tech care executed by a software engineer. Same-day turnaround, transparent pricing, and <strong>live thermal benchmark test performed on-site</strong> at handover.',
      'techspotlight.c1_tag': '💻 Software',
      'techspotlight.c1_time': '2–3 hours',
      'techspotlight.c1_title': 'Clean Windows 10/11 + Office Pack',
      'techspotlight.c1_desc': 'Clean GPT/UEFI formatting, official bloatware-free Windows, full driver suite, and complete Microsoft Office + daily utilities.',
      'techspotlight.c1_btn': 'Service Details',
      'techspotlight.c2_tag': '🔧 Hardware',
      'techspotlight.c2_time': '1.5–2 hours',
      'techspotlight.c2_title': 'Deep Thermal Overhaul + Arctic MX-6',
      'techspotlight.c2_desc': 'Meticulous disassembly, copper heatsink and fan dust removal, high-conductivity thermal paste replacement, and live thermal test.',
      'techspotlight.c2_btn': 'Service Details',
      'techspotlight.c3_badge': '⚡ Total Rebirth Bundle',
      'techspotlight.c3_save': 'Save 80 RON',
      'techspotlight.c3_title': 'Full Rebirth: Deep Clean + Fresh Windows',
      'techspotlight.c3_desc': 'The complete refresh: dust removal, fresh thermal paste, clean Windows 10/11 install, drivers, Office suite, and safe data backup.',
      'techspotlight.c3_btn': 'Calculate &amp; Order',
      'techspotlight.banner_title': 'Need a repair, maintenance, or exact quote in Cluj?',
      'techspotlight.banner_desc': 'Explore our dedicated services portal with real-time quote calculator, thermal simulator, and verified work gallery.',
      'techspotlight.banner_btn1': '<span>Open Tech Services &amp; Calculator ➔</span>',
      'techspotlight.banner_btn2': '<span>💬 Message on WhatsApp</span>',

      'exp.eyebrow': 'Professional Trajectory',
      'exp.title': 'Experience &amp; Education',
      'exp.desc': 'Combining rigorous fullstack backend engineering with automated quality verification and strategic business modeling.',
      'exp.btn_cv': '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg><span>View &amp; Print Standalone Mini-CV (PDF)</span>',

      'proj.eyebrow': 'Proven Systems &amp; Frameworks',
      'proj.title': 'Flagship Projects',
      'proj.desc': 'Selected engineering initiatives across high-throughput distributed microservices, multi-framework test automation harnesses, and financial unit-economics dashboards.',
      'proj.filter_all': 'All Projects',
      'proj.filter_backend': 'Backend &amp; Fullstack',
      'proj.filter_qa': 'QA &amp; Automation',
      'proj.filter_strategy': 'Systems &amp; Strategy',

      'skills.eyebrow': 'Technical Competencies',
      'skills.title': 'Skills &amp; Technologies',
      'skills.desc': 'A comprehensive overview of programming languages, architecture paradigms, automation frameworks, and strategic business modeling disciplines.',

      'blog.eyebrow': 'Engineering Insights &amp; Reflections',
      'blog.title': 'Latest Articles',
      'blog.desc': 'Deep technical dives into modern test automation paradigms and reflections on bridging computer software engineering with entrepreneurship studies.',
      'blog.btn_all': '<span>Explore All Blog Articles</span><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
      'blog.read_more': '<span>Read Article</span><svg viewBox="0 0 24 24" style="width: 14px; height: 14px;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',

      'contact.eyebrow': 'Collaboration &amp; Inquiries',
      'contact.title': 'Let\'s Build Something Solid Together',
      'contact.desc': 'Whether you\'re looking for a disciplined fullstack Java engineer, a test automation architect to elevate your QA pipelines, or an entrepreneurial mindset to assess unit economics and scale product delivery, I would love to connect.',
      'contact.btn_email': '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg><span>Copy Email Address</span>',
      'contact.btn_linkedin': '<svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 1.62 1.62 1.62 1.62 0 0 0-1.62-1.62z"/></svg><span>Connect on LinkedIn</span>',
      'nav.evidence': 'Evidence Log 🔒',
      'projects.btn_repo': 'GitHub Repository ↗',
      'projects.p1_title': 'Scalable Energy Management &amp; Real-Time Telemetry Platform',
      'projects.p2_title': 'Multithreaded Task Queue &amp; Concurrency Management Engine',
      'projects.p3_title': 'API Intercepts &amp; Resilient UI Test Automation Harness',
      'projects.p4_title': 'Native Hardware Benchmarking &amp; Thermal Telemetry Suite',

      'blog.header_title': 'Technical Insights &amp; Guides',
      'blog.header_desc': 'In-depth engineering essays on test automation paradigms, resilient backends, and entrepreneurship.',
      'blog.search_placeholder': 'Search articles by title, tag, or topic...',
      'blog.filter_all': 'All Articles',
      'blog.filter_qa': 'QA &amp; Automation',
      'blog.filter_architecture': 'Architecture',
      'blog.filter_entrepreneurship': 'Entrepreneurship',

      'footer.copy': '&copy; 2026 Dragoș Tecuci. Crafted with precision in Cluj-Napoca, Romania.'
    }
  };

  let currentLang = 'ro';

  function getPreferredLanguage() {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'ro' || saved === 'en') return saved;
    return 'ro';
  }

  function setLanguage(lang) {
    if (lang !== 'ro' && lang !== 'en') return;
    currentLang = lang;
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    document.documentElement.lang = lang;

    // Update active state in segmented pills across navbar and mobile drawer
    const toggleBtns = document.querySelectorAll('.lang-btn, .lang-toggle-btn');
    toggleBtns.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      const isActive = btnLang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    const langToggleContainers = document.querySelectorAll('.lang-toggle');
    langToggleContainers.forEach(container => {
      container.setAttribute('data-active-lang', lang);
    });

    // Update all text nodes marked with data-i18n
    const dictionary = TRANSLATIONS[lang] || TRANSLATIONS.ro;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dictionary[key]) {
        el.innerHTML = dictionary[key];
      }
    });

    // Update attributes marked with data-i18n-attr
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const raw = el.getAttribute('data-i18n-attr');
      const [attr, key] = raw.split(':');
      if (attr && key && dictionary[key]) {
        el.setAttribute(attr, dictionary[key]);
      }
    });

    // Refresh dynamic project counts based on current DOM
    updateProjectFilterCounts();
  }

  function initLanguage() {
    const preferred = getPreferredLanguage();
    setLanguage(preferred);

    document.addEventListener('click', e => {
      const langBtn = e.target.closest('.lang-btn, .lang-toggle-btn');
      if (langBtn) {
        e.preventDefault();
        const selectedLang = langBtn.getAttribute('data-lang');
        if (selectedLang && selectedLang !== currentLang) {
          setLanguage(selectedLang);
        }
      }
    });
  }

  /* ============================================================================
     10. GLOBAL INITIALIZATION
     ============================================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initLanguage();
    initProjectFilters();
    initCopyButtons();
    initBlogPortal();
    initNavHighlight();
  });

  // Export minimal API to window for inline onclick handlers if needed
  window.DT = {
    toggleTheme,
    copyToClipboard,
    showToast,
    parseMarkdown,
    setLanguage,
    currentLang: () => currentLang,
    EMBEDDED_POSTS
  };

})();
