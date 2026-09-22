/**
 * ==============================================================================
 * DRAGOȘ TECUCI — TECH REPAIR & WORK EVIDENCE WEB PLATFORM
 * Production Client-Side Services Portal Engine (services.js)
 * 
 * Target Page:
 *   - services.html (Public Tech Repair, Maintenance & Estimation Platform)
 * 
 * Features:
 *   - In-memory embedded services.json fallback (Guarantees 100% offline & file:/// execution)
 *   - Instant Bilingual Engine (RO | EN) with zero-reload dynamic DOM translation
 *   - LocalStorage persistence for preferred language ('preferredLang')
 *   - Theme synchronization with 'theme' and 'dt-portfolio-theme' (Dark / Light)
 *   - Interactive Quote Estimator with real-time RON sum calculation & dynamic WhatsApp action
 *   - Work & Cleaning Gallery with category filtering and full-screen lightbox modal
 *   - Interactive Thermal Performance Gauge comparison (95°C -> 68°C, -27°C delta)
 *   - Mobile navigation drawer handling with outside-click and ESC key dismissal
 * 
 * Zero external dependencies. Modern Vanilla JavaScript (ES2022+).
 * ==============================================================================
 */

(function () {
  'use strict';

  /* ============================================================================
     1. EMBEDDED SERVICES DATA FALLBACK (Guarantees 100% file:/// & offline support)
     ============================================================================ */
  const SERVICES_DATA_FALLBACK = {
    "provider": {
      "name": "Dragoș Tecuci",
      "role": "Software Engineer & Hardware/Systems Specialist",
      "tagline": "Making coding look easy, with coffee",
      "github": "https://github.com/Dragosh7",
      "linkedin": "https://www.linkedin.com/in/tecuci-dragos",
      "phone": "+40 700 000 000",
      "phonePlaceholderNote": "[TODO: Customize phone]",
      "whatsappUrl": "https://wa.me/40700000000",
      "whatsappPlaceholderNote": "[TODO: Customize WhatsApp]",
      "email": "tecuci.dragos@example.com",
      "emailPlaceholderNote": "[TODO: Customize email]",
      "location": "Cluj-Napoca, Romania",
      "neighborhoods": [
        "Mănăștur",
        "Mărăști",
        "Zorilor",
        "Centru",
        "Gheorgheni"
      ],
      "pickupDropoffNote": "Predare personală sau preluare/predare flexibilă în cartierele principale din Cluj-Napoca.",
      "pickupDropoffNoteEn": "Flexible personal drop-off or pickup/delivery across major Cluj-Napoca neighborhoods."
    },
    "ro": {
      "meta": {
        "title": "Servicii Software & Mentenanță Hardware PC / Laptop | Dragoș Tecuci Cluj-Napoca",
        "subtitle": "Mentenanță termică riguroasă, pastă termică de înaltă performanță, instalare Windows optimizat și upgrade-uri hardware rapide în Cluj-Napoca.",
        "badge": "Cluj-Napoca & Împrejurimi",
        "rating": "5.0 ★★★★★ (Garanție la Predare)",
        "location": "Cluj-Napoca (Mănăștur, Mărăști, Zorilor, Centru, Gheorgheni)"
      },
      "hero": {
        "headline": "Performanță Maximă și Răcire Fără Compromis Pentru PC-ul Sau Laptopul Tău",
        "subheadline": "Servicii software rapide și mentenanță hardware meticuloasă realizate de un inginer software. Testăm temperaturile la fața locului, la predare, pentru ca tu să vezi exact diferența înainte să plătești.",
        "ctaPrimary": "Solicită Programare",
        "ctaSecondary": "Vezi Servicii & Prețuri",
        "ctaGallery": "Galerie Lucrări",
        "whatsappCta": "Scrie-mi pe WhatsApp",
        "phoneCta": "Apelează Acum"
      },
      "originalAnnouncements": {
        "softwareAnnouncement": {
          "title": "Anunț Servicii Software Rapide & Optimizare",
          "content": "Te ajut cu servicii software rapide, realizate cu atenție și profesionalism, ca tu să te poți baza pe dispozitivul tău la capacitate maximă.\n\nServicii oferite:\n- Instalare / Reinstalare Windows (10 sau 11): Include formatare corectă, instalarea tuturor driverelor necesare și optimizarea sistemului pentru viteză.\n- Pachet Programe de Bază: Microsoft Office (Word, Excel, PowerPoint), playere video/audio, arhivatoare, browsere și antivirus.\n- Instalări software la cerere: Programe specifice pentru școală, editare sau design, plus diagnosticare și devirusare.\n\nGaranția calității: Predau echipamentul doar după ce îl testez complet. Suplimentar, beneficiezi de asistență tehnică gratuită după instalare, pentru a mă asigura că te bucuri de performanța maximă a noului tău sistem, fără nicio grijă.\n\nLucrez ordonat, rapid și îmi respect întotdeauna clienții. Salvează-ți datele importante înainte, sau te pot ajuta eu cu backup-ul! Pentru detalii și prețuri, lasă-mi un mesaj aici sau sună-mă."
        },
        "hardwareAnnouncement": {
          "title": "Anunț Mentenanță Hardware & Termică",
          "content": "Ofer servicii de mentenanță hardware cu maximă grijă pentru dispozitivul tău, folosind materiale premium pentru a-i prelungi durata de viață.\n\nCum te pot ajuta:\n- Curățare completă de praf: Demontare atentă, curățarea ventilatorului, a radiatoarelor și a plăcii de bază.\n- Înlocuire pastă termică: Folosesc pastă termică de înaltă performanță pentru o răcire optimă a procesorului și a plăcii video.\n- Upgrade-uri hardware: Asistență și montaj pentru SSD-uri sau memorie RAM suplimentară, dacă dorești ca laptopul/PC-ul tău să ruleze mult mai rapid.\n\nGaranția intervenției: Folosesc unelte adecvate și garantez o asamblare impecabilă. Facem testul de temperatură la fața locului, la predare, ca să vezi exact diferența înainte să plătești."
        }
      },
      "softwareServices": [
        {
          "id": "win-install",
          "title": "Instalare / Reinstalare Windows (10 sau 11)",
          "shortDescription": "Formatare corectă, partiționare GPT/UEFI, instalare curată de la zero, toate driverele oficiale și optimizare completă pentru viteză.",
          "duration": "2 - 3 ore",
          "priceRange": "120 - 150 RON",
          "features": [
            "Formatare curată și structurare sigură a partițiilor (GPT / UEFI)",
            "Instalare pachet complet de drivere oficiale (Chipset, GPU, Audio, Wi-Fi, Bluetooth)",
            "Optimizare sistem de operare: dezactivare telemetrie, bloatware și servicii inutile de fundal",
            "Optimizare setări de pornire (Startup) pentru timpi de boot ultra-rapizi",
            "Actualizare securitate Windows Update la zi"
          ],
          "guarantee": "Testare completă de stabilitate înainte de predare + asistență tehnică gratuită post-instalare."
        },
        {
          "id": "office-utility-pack",
          "title": "Pachet Programe de Bază & Utilitare Esențiale",
          "shortDescription": "Configurarea completă a aplicațiilor zilnice de birou, multimedia, navigare securizată și protecție antivirus.",
          "duration": "1 - 2 ore",
          "priceRange": "60 - 80 RON (40 RON în combinație cu reinstalarea Windows)",
          "features": [
            "Microsoft Office complet (Word, Excel, PowerPoint, Outlook) pregătit de lucru",
            "Playere video/audio dedicate cu codecuri complete (VLC Media Player)",
            "Utilitare de compresie și arhivare de înaltă viteză (7-Zip, WinRAR)",
            "Browsere web rapide configurate cu extensii sigure anti-reclamă (Chrome, Brave, Firefox, Edge)",
            "Soluție antivirus activă, firewall configurat și cititor PDF performant"
          ],
          "guarantee": "Fără programe ascunse, reclame sau extensii nedorite. Sistem curat și pregătit pentru utilizare imediată."
        },
        {
          "id": "custom-software",
          "title": "Instalări Software la Cerere & Programe Specializate",
          "shortDescription": "Instalare și configurare de programe specifice pentru școală, facultate, programare, editare grafică, audio sau modelare 3D.",
          "duration": "1 - 2 ore",
          "priceRange": "50 - 100 RON (în funcție de volumul și specificul programelor)",
          "features": [
            "Programe educaționale și platforme universitare (Teams, Zoom, unelte de calcul/statistică)",
            "Suite de creație și design grafic / editare foto & video",
            "Medii de dezvoltare software și unelte de inginerie (IDE-uri, Git, Docker, Python/Java)",
            "Configurare corectă a dependențelor de sistem (DirectX, Visual C++ Redistributables, .NET Runtime)"
          ],
          "guarantee": "Verificarea lansării și a compatibilității hardware pentru fiecare program instalat."
        },
        {
          "id": "diagnostic-virus-removal",
          "title": "Diagnosticare Sistem & Devirusare Profesională",
          "shortDescription": "Scanare avansată și eliminare malware, spyware, mineri ascunși și recuperarea stabilității sistemului de operare.",
          "duration": "2 - 3 ore",
          "priceRange": "80 - 120 RON",
          "features": [
            "Scanare profundă la nivel de fișiere, memorie și regiștri Windows",
            "Eliminare infecții troian, ransomware, adware intruziv și scripturi de minerit crypto",
            "Reparare integritate fișiere sistem Windows (SFC / DISM repair)",
            "Curățare regiștri deteriorați și eliminare extensii malițioase din browsere"
          ],
          "guarantee": "Curățare fără pierderea documentelor personale și recomandări personalizate pentru prevenție."
        },
        {
          "id": "backup-data-migration",
          "title": "Salvare & Migrare Date (Backup Profesional)",
          "shortDescription": "Copiere de siguranță a documentelor, pozelor, parolelor și setărilor importante înainte de orice intervenție majoră.",
          "duration": "1 - 3 ore (în funcție de volumul de date)",
          "priceRange": "70 - 120 RON",
          "features": [
            "Backup selectiv complet: Desktop, Documente, Poze, Proiecte, Marcaje (Bookmarks) browser",
            "Migrare sigură a datelor de pe HDD/SSD vechi pe medii externe sau pe noul drive de stocare",
            "Verificare de integritate bit-cu-bit (checksum) pentru a preveni fișiere corupte",
            "Restaurare structurată a folderelor pe noul sistem de operare"
          ],
          "guarantee": "Confidențialitate absolută a datelor. Datele tale personale nu sunt niciodată deschise, inspectate sau copiate în afara procedurii cerute."
        }
      ],
      "hardwareServices": [
        {
          "id": "dust-cleaning",
          "title": "Curățare Completă de Praf & Mentenanță Sistem Răcire",
          "shortDescription": "Demontare atentă, îndepărtarea scamelor și prafului dens din radiatoare, palele ventilatoarelor și circuitele plăcii de bază.",
          "duration": "1 - 2 ore",
          "priceRange": "80 - 100 RON",
          "features": [
            "Dezasamblare meticuloasă folosind unelte specializate de precizie și brățară antistatică ESD",
            "Curățare minuțioasă a turbinelor ventilatoarelor și degresare ax ventilator când este necesar",
            "Desfundare canale de aerisire din radiatoarele din cupru/aluminiu prin suflare controlată cu aer uscat",
            "Curățare fante de admisie aer de pe carcasa inferioară și filtrele antipraf"
          ],
          "guarantee": "Restabilirea fluxului optim de aer și reducerea imediată a turației agresive a ventilatoarelor."
        },
        {
          "id": "thermal-paste-replacement",
          "title": "Înlocuire Pastă Termică de Înaltă Performanță",
          "shortDescription": "Curățare chimică a pastei vechi uscate și aplicare pastă termică premium (Arctic MX-4, Arctic MX-6 sau Noctua NT-H1) pe CPU și GPU.",
          "duration": "1 - 2 ore",
          "priceRange": "100 - 140 RON (Laptop) / 90 - 120 RON (Desktop PC)",
          "features": [
            "Îndepărtarea compusului termic vechi/întărit folosind alcool izopropilic de puritate 99.9% de grad electronic",
            "Aplicare pastă termică de vârf: Arctic MX-4, Arctic MX-6 sau Noctua NT-H1 cu conductivitate termică excelentă",
            "Verificare și repoziționare thermal pads pentru VRM și cipurile de memorie VRAM",
            "Strângere uniformă în cruce a șuruburilor heatsink pentru presiune de contact optimă pe die-ul procesorului"
          ],
          "guarantee": "Garanția scăderii temperaturii: diferență de 15°C - 30°C în sarcină susținută și eliminarea thermal throttling-ului."
        },
        {
          "id": "hardware-upgrades",
          "title": "Upgrade-uri Hardware (SSD & Memorie RAM)",
          "shortDescription": "Consultanță pentru alegerea componentelor potrivite, asistență la achiziție și montaj profesional pentru o viteză de lucru multiplicată.",
          "duration": "1 - 2 ore",
          "priceRange": "60 - 90 RON (Manoperă montaj / clonare)",
          "features": [
            "Consultanță tehnică compatibilitate hardware (NVMe M.2, SATA III, DDR4, DDR5)",
            "Montaj atent al modulului SSD sau memoriei RAM fără forțare conectori sau cleme",
            "Clonare completă disc vechi pe noul SSD (pornire identică a sistemului) sau instalare nouă de la zero",
            "Testare stabilitate memorie (MemTest86) și bench de viteză read/write SSD"
          ],
          "guarantee": "Sistem de 4-10x mai rapid la deschiderea aplicațiilor și a fișierelor de mari dimensiuni."
        },
        {
          "id": "thermal-bench-testing",
          "title": "Testare Termică la Predare & Benchmarking Sintetic",
          "shortDescription": "Sesiune de stres sintetic (Cinebench, FurMark, AIDA64) realizată la fața locului în prezența ta pentru a vedea datele reale înainte de plată.",
          "duration": "20 - 30 minute",
          "priceRange": "Inclus gratuit în pachete (40 RON diagnostic separat)",
          "features": [
            "Monitorizare senzori temperatură în timp real (Core Temp, HWiNFO64)",
            "Test de stres pe procesor (CPU) și placă video (GPU)",
            "Măsurare precisă înainte și după mentenanță: temperaturi minime, maxime și medii",
            "Verificarea menținerii frecvențelor Turbo Boost fără căderi de performanță"
          ],
          "guarantee": "Transparență 100%. Plătești doar când vezi dovada scăderii de temperatură și a stabilității sistemului."
        }
      ],
      "packages": [
        {
          "id": "pkg-office-refresh",
          "name": "Pachetul Office Refresh",
          "badge": "Recomandat Pentru Birou & Școală",
          "idealFor": "Laptopuri de uz zilnic, lucru de acasă, navigare web, studiu și aplicații office care au început să meargă greoi.",
          "price": "200 RON",
          "estimatedTime": "3 - 4 ore",
          "savings": "Economisești 50 RON față de tarifele individuale",
          "includes": [
            "Curățare completă de praf a ventilatorului și radiatoarelor",
            "Înlocuire pastă termică cu Arctic MX-4 / MX-6",
            "Instalare / Reinstalare Windows 10 sau 11 curat cu drivere oficiale",
            "Pachet complet Microsoft Office + Programe zilnice esențiale",
            "Optimizare de pornire și testare stabilitate la predare"
          ]
        },
        {
          "id": "pkg-thermal-pro-gamer",
          "name": "Pachetul Thermal Pro Gamer",
          "badge": "Cel Mai Popular Printre Gameri",
          "idealFor": "Laptopuri de gaming (Legion, ROG, Predator, TUF, Omen) și PC-uri care ating 90°C+ și pierd cadre în jocuri.",
          "price": "190 RON",
          "estimatedTime": "2 - 3 ore",
          "savings": "Economisești 20 RON față de componente separate + include testare Cinebench & FurMark la fața locului",
          "includes": [
            "Demontare completă heatsink dual-fan / triple-fan și curățare profundă lamele radiator",
            "Curățare die CPU/GPU cu alcool izopropilic 99.9% și aplicare pastă termică premium Noctua NT-H1 sau Arctic MX-6",
            "Verificare și împrospătare contact thermal pads pe VRAM și circuite de alimentare VRM",
            "Test de stres termic la predare (Cinebench + FurMark) pentru verificare scădere temperatură (15°C - 30°C drop)",
            "Profil optimizare flux de aer și sfaturi dedicate de undervolting / cooling pad"
          ]
        },
        {
          "id": "pkg-rebirth-total",
          "name": "Pachetul Rebirth Total",
          "badge": "Transformare Radicală a Dispozitivului",
          "idealFor": "Dispozitive vechi de 2-5 ani cu HDD lent sau memorie puțină, care se încălzesc și se blochează frecvent.",
          "price": "280 RON",
          "estimatedTime": "4 - 5 ore",
          "savings": "Economisești 80 RON + manoperă completă hardware și software inclusă",
          "includes": [
            "Mentenanță termică completă (curățare meticuloasă de praf + pastă termică premium)",
            "Montaj SSD nou de mare viteză și/sau upgrade memorie RAM (componente la alegerea clientului)",
            "Backup și migrare completă fără pierderi a datelor și pozelor vechi",
            "Instalare de la zero Windows 11 pe noul SSD cu optimizare extremă de viteză",
            "Configurare suită Office, utilitare esențiale și testare comparativă înainte/după"
          ]
        }
      ],
      "guarantees": [
        {
          "id": "on-the-spot-testing",
          "title": "Testare la Predare",
          "subtitle": "Vezi diferența pe loc înainte să plătești",
          "description": "Nu te lăsăm doar cu promisiuni. La predarea echipamentului rulăm teste de stres și comparăm temperaturile înainte și după intervenție. Vezi exact scăderea de 15°C - 30°C pe ecran, în timp real."
        },
        {
          "id": "free-followup-support",
          "title": "Asistență Tehnică Gratuită",
          "subtitle": "Suport direct după instalare",
          "description": "După fiecare intervenție software sau hardware, beneficiezi de asistență tehnică gratuită. Dacă ai o întrebare sau vreo setare suplimentară de făcut, sunt la un mesaj distanță pentru ca tu să fii 100% liniștit."
        },
        {
          "id": "premium-compounds",
          "title": "Materiale Premium & Unelte Adecvate",
          "subtitle": "Arctic MX-4, Arctic MX-6 și Noctua NT-H1",
          "description": "Refuzăm compromisurile. Folosim doar paste termice recunoscute internațional pentru fiabilitate și conductivitate termică pe termen lung, alcool izopropilic pur 99.9% și unelte antistatice de precizie."
        },
        {
          "id": "data-privacy-respect",
          "title": "Respect & Confidențialitate Date 100%",
          "subtitle": "Securitate garantată pentru fișierele tale",
          "description": "Fișierele, fotografiile și documentele tale sunt strict confidențiale. Lucrez ordonat, etic și profesionist. Datele tale nu sunt deschise, copiate sau distribuite niciodată."
        }
      ],
      "faq": [
        {
          "question": "Cât durează o intervenție obișnuită de curățare și înlocuire a pastei termice?",
          "answer": "O mentenanță hardware completă (curățare meticuloasă de praf și aplicare pastă termică de top) durează în general între 1 și 2 ore. Dacă se alege un pachet complet cu reinstalare de Windows și migrare de date, durata este de 3 până la 4 ore. Echipamentul este returnat de regulă în aceeași zi."
        },
        {
          "question": "Cum procedăm cu datele mele personale? Este nevoie să fac backup înainte?",
          "answer": "Dacă este posibil, recomandăm să îți salvezi fișierele critice pe un stick USB sau în cloud înainte de predare. Totuși, dacă sistemul tău nu mai pornește sau ai nevoie de ajutor, oferim serviciu dedicat de salvare completă și restaurare a datelor, garantând confidențialitatea 100% a tuturor fișierelor."
        },
        {
          "question": "Cum funcționează testul de temperatură la predare?",
          "answer": "La predarea echipamentului pornim împreună un program de monitorizare a senzorilor termici (HWiNFO / Core Temp) și rulăm un test sintetic de stres (Cinebench pentru procesor și FurMark pentru placa video). Comparăm valorile maxime înregistrate înainte de curățare cu cele de după, pentru a vedea clar scăderea de temperatură (deseori între 15°C și 30°C) înainte de efectuarea plății."
        },
        {
          "question": "Unde se face predarea echipamentului în Cluj-Napoca?",
          "answer": "Suntem flexibili: putem stabili întâlnirea pentru predare și preluare în cartierele principale din Cluj-Napoca (Mănăștur, Mărăști, Zorilor, Centru, Gheorgheni) sau direct la locația stabilită de comun acord. Pentru cazuri speciale, putem discuta preluarea direct de la domiciliul tău."
        },
        {
          "question": "De ce este necesară schimbarea pastei termice dacă laptopul încă funcționează?",
          "answer": "Pasta termică din fabrică se usucă și se întărește în mod natural după 12 - 24 luni de utilizare. Când pasta se usucă, transferul de căldură către radiator scade dramatic, iar procesorul intră în protecție termică (thermal throttling), reducându-și frecvența pentru a nu se arde. Schimbarea periodică a pastei previne degradarea ireversibilă a plăcii de bază și menține laptopul silențios și rapid."
        }
      ],
      "galleryCategories": [
        "Toate",
        "Curățare Laptop",
        "Pastă Termică",
        "Upgrade Hardware",
        "Configurare Windows"
      ],
      "galleryItems": [
        {
          "id": "work-1",
          "deviceModel": "Lenovo Legion Y540-15IRH",
          "category": "Pastă Termică",
          "categorySlug": "thermal-paste",
          "image": "assets/images/gallery/work-1.jpg",
          "tempBefore": 95,
          "tempAfter": 69,
          "thermalDrop": 26,
          "compoundUsed": "Arctic MX-6",
          "title": "Mentenanță Termică Laptop Gaming Lenovo Legion",
          "clientIssue": "Laptopul se încălzea excesiv în jocuri (atingea 95°C), ventilatoarele zgomotoase rulau continuu la turație maximă și apăreau scăderi mari de cadre (FPS drops).",
          "solution": "Curățare profundă de praf dens a celor două ventilatoare și a radiatoarelor din cupru. Curățare chimică a pastei vechi uscate de pe CPU și GPU cu alcool izopropilic 99.9% și aplicare pastă de vârf Arctic MX-6.",
          "result": "Temperatură redusă cu 26°C sub sarcină susținută, tastatură vizibil mai rece la atingere și zero scăderi de FPS în sesiuni intense de gaming."
        },
        {
          "id": "work-2",
          "deviceModel": "Asus ROG Strix G15 G512",
          "category": "Curățare Laptop",
          "categorySlug": "laptop-cleaning",
          "image": "assets/images/gallery/work-2.jpg",
          "tempBefore": 93,
          "tempAfter": 68,
          "thermalDrop": 25,
          "compoundUsed": "Noctua NT-H1",
          "title": "Curățare Completă Sistem Răcire Asus ROG Strix",
          "clientIssue": "Ventilatoarele scoteau un fluierat ascuțit, iar lamelele de evacuare erau complet blocate de scame și praf presat, provocând blocarea laptopului în randări 3D.",
          "solution": "Demontare completă a modulului de răcire, desfundare radiatoare cu jet de aer uscat controlat, recondiționare pale ventilatoare și aplicare pastă Noctua NT-H1 pe procesor și placa video dedicată.",
          "result": "Scădere de 25°C a temperaturii maxime, dispariția zgomotului parazit și funcționare stabilă în teste de stres FurMark și Cinebench."
        },
        {
          "id": "work-3",
          "deviceModel": "Dell Latitude 5420",
          "category": "Upgrade Hardware",
          "categorySlug": "hardware-upgrades",
          "image": "assets/images/gallery/work-3.jpg",
          "tempBefore": 89,
          "tempAfter": 62,
          "thermalDrop": 27,
          "compoundUsed": "Arctic MX-4",
          "title": "Upgrade SSD NVMe, Memorie RAM 32GB & Mentenanță Dell Latitude",
          "clientIssue": "Laptop de birou lent la pornire (peste 90 secunde), ventilator turat deranjant în apeluri video Teams/Zoom și memorie insuficientă pentru fișiere Excel mari.",
          "solution": "Curățare carcasă slim și ventilator, aplicare pastă termică Arctic MX-4, upgrade memorie de la 8GB la 32GB DDR4 dual-channel și clonare fără pierderi pe SSD rapid NVMe M.2 1TB.",
          "result": "Timp de bootare redus la sub 8 secunde, temperatură în apeluri redusă cu 27°C, sistem complet silențios în scenarii de lucru intensiv de birou."
        },
        {
          "id": "work-4",
          "deviceModel": "HP Pavilion Gaming 15-dk",
          "category": "Curățare Laptop",
          "categorySlug": "laptop-cleaning",
          "image": "assets/images/gallery/work-4.jpg",
          "tempBefore": 96,
          "tempAfter": 71,
          "thermalDrop": 25,
          "compoundUsed": "Arctic MX-6",
          "title": "Mentenanță Termică & Optimizare Software HP Pavilion Gaming",
          "clientIssue": "Laptopul se oprea brusc din cauza supraîncălzirii (96°C) și sistemul de operare era plin de programe malițioase de tip adware și reclame pop-up.",
          "solution": "Curățare amănunțită a sistemului de răcire dual-fan, aplicare pastă Arctic MX-6, salvare securizată a pozelor și proiectelor, reinstalare curată Windows 11 și pachet complet de productivitate.",
          "result": "Temperatură scăzută cu 25°C, eliminare completă a opririlor forțate și sistem de operare rapid, fără nicio urmă de adware."
        },
        {
          "id": "work-5",
          "deviceModel": "Acer Swift 3 SF314",
          "category": "Configurare Windows",
          "categorySlug": "windows-setup",
          "image": "assets/images/gallery/work-5.jpg",
          "tempBefore": 86,
          "tempAfter": 58,
          "thermalDrop": 28,
          "compoundUsed": "Noctua NT-H1",
          "title": "Configurare Windows 11 Curat & Mentenanță Ultrabook Acer Swift 3",
          "clientIssue": "Ultrabook subțire care se încingea la baza carcasei chiar și la simpla navigare web, cu bateria descărcându-se rapid din cauza proceselor de fundal scăpate de sub control.",
          "solution": "Curățare ventilator ultra-slim, înlocuire pastă uscată cu Noctua NT-H1, reinstalare Windows 11 optimizat fără servicii inutile și configurare curbe energetice pentru conservarea autonomiei.",
          "result": "Temperatură redusă cu 28°C în sarcină, bază rece și confortabilă pe birou sau în poală, autonomie extinsă a bateriei cu peste 2 ore."
        },
        {
          "id": "work-6",
          "deviceModel": "Custom Gaming PC (Ryzen 5 5600X + RTX 3070)",
          "category": "Upgrade Hardware",
          "categorySlug": "hardware-upgrades",
          "image": "assets/images/gallery/work-6.jpg",
          "tempBefore": 84,
          "tempAfter": 59,
          "thermalDrop": 25,
          "compoundUsed": "Arctic MX-6",
          "title": "Mentenanță Completă PC Gaming, Re-Cable Management & Răcire",
          "clientIssue": "Unitate centrală de gaming și randare video cu airflow strangulat de cabluri neordonate, filtre de praf îmbâcsite și temperaturi ridicate în DaVinci Resolve.",
          "solution": "Suflare completă a carcasei cu aer uscat de înaltă presiune, spălare filtre magnetice, cable management profesional ascuns pe spatele carcasei, pastă Arctic MX-6 pe CPU și GPU și configurare curbe PWM silențioase în BIOS.",
          "result": "Temperatură mai joasă cu 25°C în randare 4K susținută, flux de aer liber în carcasă și profil acustic aproape inaudibil în timpul sesiunilor de lucru."
        }
      ]
    },
    "en": {
      "meta": {
        "title": "Software Services & Hardware Maintenance for PC & Laptops | Dragoș Tecuci Cluj-Napoca",
        "subtitle": "Precision thermal maintenance, premium thermal paste, clean Windows optimization, and fast hardware upgrades in Cluj-Napoca.",
        "badge": "Cluj-Napoca & Surroundings",
        "rating": "5.0 ★★★★★ (Verified On-Handover Guarantee)",
        "location": "Cluj-Napoca (Mănăștur, Mărăști, Zorilor, City Center, Gheorgheni)"
      },
      "hero": {
        "headline": "Peak Performance and Uncompromised Cooling for Your PC or Laptop",
        "subheadline": "Fast software setup and meticulous hardware maintenance delivered by a software engineer. We benchmark and test temperatures live upon handover so you see the exact difference before paying.",
        "ctaPrimary": "Request Booking",
        "ctaSecondary": "View Services & Pricing",
        "ctaGallery": "Work Gallery",
        "whatsappCta": "Message on WhatsApp",
        "phoneCta": "Call Now"
      },
      "originalAnnouncements": {
        "softwareAnnouncement": {
          "title": "Fast Software Services & System Optimization Announcement",
          "content": "I assist you with fast software services, delivered with meticulous care and professionalism, so you can count on your machine at peak capacity.\n\nServices offered:\n- Windows 10 / 11 Clean Installation & Reinstallation: Includes correct disk formatting, complete official driver installations, and speed-tuned OS optimization.\n- Essential Productivity Pack: Microsoft Office suite (Word, Excel, PowerPoint), media players, archivers, secure browsers, and antivirus protection.\n- On-Demand Software Setup: Specialized tools for school, university, development, graphic design or video editing, plus deep diagnostics and malware disinfection.\n\nQuality Guarantee: I only hand back equipment after thorough stability testing. Additionally, you receive free follow-up technical support after setup to make sure you enjoy peak performance with zero friction.\n\nOrderly, fast, and always client-first. Please back up your essential data beforehand, or let me handle the full backup for you! Drop me a message here or call me for details and quotes."
        },
        "hardwareAnnouncement": {
          "title": "Hardware Maintenance & Thermal Servicing Announcement",
          "content": "I provide precision hardware maintenance with utmost care for your device, utilizing premium compounds to extend its operating lifespan.\n\nHow I can help you:\n- Deep Dust Cleaning: Careful chassis disassembly, thorough cleaning of cooling fans, copper heatsinks, and motherboard circuits.\n- Thermal Paste Replacement: High-performance thermal compound applied for optimal CPU and GPU cooling efficiency.\n- Hardware Upgrades: Sourcing guidance and precise installation for SSDs or additional RAM modules if you want your laptop or PC to run significantly faster.\n\nIntervention Guarantee: Professional ESD-safe tooling and guaranteed immaculate reassembly. We conduct an on-the-spot thermal benchmark test upon handover so you inspect the temperature drop before paying."
        }
      },
      "softwareServices": [
        {
          "id": "win-install",
          "title": "Windows 10 & 11 Clean Installation / Reinstallation",
          "shortDescription": "Proper GPT/UEFI formatting, clean OS deployment from scratch, full official drivers, and performance debloating.",
          "duration": "2 - 3 hours",
          "priceRange": "120 - 150 RON",
          "features": [
            "Proper disk formatting and modern GPT / UEFI partition layout",
            "Complete official manufacturer driver suite installation (Chipset, GPU, Audio, Wi-Fi, Bluetooth)",
            "OS performance tuning: disabling background telemetry, telemetry bloat, and unnecessary daemons",
            "Startup application streamlining for instant cold boot times",
            "Full cumulative Windows Update security patch application"
          ],
          "guarantee": "Comprehensive pre-delivery stability testing + free post-installation follow-up support."
        },
        {
          "id": "office-utility-pack",
          "title": "Essential Office & Productivity Pack",
          "shortDescription": "Turnkey configuration for everyday office tasks, multimedia playback, secure ad-free web browsing, and active protection.",
          "duration": "1 - 2 hours",
          "priceRange": "60 - 80 RON (40 RON when bundled with Windows reinstall)",
          "features": [
            "Full Microsoft Office setup (Word, Excel, PowerPoint, Outlook) ready for immediate productivity",
            "Dedicated media playback suite with universal codec support (VLC Media Player)",
            "High-performance compression and archiving utilities (7-Zip, WinRAR)",
            "Modern web browsers secured with verified ad-blocking and privacy extensions (Chrome, Brave, Firefox, Edge)",
            "Active antivirus protection, configured firewall, and lightweight PDF reader"
          ],
          "guarantee": "Strictly no bloatware, unwanted toolbars, or junk software. Clean, verified productivity setup."
        },
        {
          "id": "custom-software",
          "title": "Custom & Specialized Software Installations",
          "shortDescription": "Installation and environment configuration for academic tools, software engineering, graphic design, audio workstations, or 3D modeling.",
          "duration": "1 - 2 hours",
          "priceRange": "50 - 100 RON (based on application scope and complexity)",
          "features": [
            "Educational and academic tool suites (Teams, Zoom, scientific/statistical computing)",
            "Creative suites for design, photography, and high-bitrate video editing",
            "Software development kits and developer tools (IDEs, Git, Docker, Python/Java runtimes)",
            "Full runtime environment prerequisite resolution (DirectX, Visual C++ Redistributables, .NET)"
          ],
          "guarantee": "Launch verification and hardware capability check for every requested software package."
        },
        {
          "id": "diagnostic-virus-removal",
          "title": "Deep Diagnostics & Professional Malware Disinfection",
          "shortDescription": "Advanced system scanning to eradicate hidden crypto miners, trojans, adware hijackers, and repair damaged OS binaries.",
          "duration": "2 - 3 hours",
          "priceRange": "80 - 120 RON",
          "features": [
            "Deep multi-engine scanning across system files, running memory, and Windows registry",
            "Eradication of trojans, rootkits, persistent adware, and background crypto-mining malware",
            "Windows system file integrity restoration (SFC / DISM image repair)",
            "Registry repair and removal of malicious browser redirects and search hijacking extensions"
          ],
          "guarantee": "Full disinfection without compromising user documents, accompanied by tailored security guidance."
        },
        {
          "id": "backup-data-migration",
          "title": "Data Backup & Migration Services",
          "shortDescription": "Complete safe backup of critical documents, photos, browser bookmarks, and settings prior to any major intervention.",
          "duration": "1 - 3 hours (depends on storage volume)",
          "priceRange": "70 - 120 RON",
          "features": [
            "Complete selective backup: Desktop, Documents, Photos, Work Folders, and Browser Bookmarks",
            "Secure data migration from legacy HDDs/SSDs to external storage or a new high-speed drive",
            "Bit-for-bit checksum verification to guarantee against file corruption during transfer",
            "Clean, structured directory restoration onto the freshly installed operating system"
          ],
          "guarantee": "Strict 100% data confidentiality. Your private photos, projects, and documents are never inspected, copied, or shared."
        }
      ],
      "hardwareServices": [
        {
          "id": "dust-cleaning",
          "title": "Deep Dust Cleaning & Cooling Fan Servicing",
          "shortDescription": "Careful chassis teardown, clearing dense dust blankets from copper heatsinks, cooling fan impellers, and motherboard components.",
          "duration": "1 - 2 hours",
          "priceRange": "80 - 100 RON",
          "features": [
            "Meticulous chassis disassembly utilizing precision ESD-safe magnetic tools and grounding straps",
            "Thorough fan turbine blade cleaning and spindle lubrication when needed",
            "Clearing clogged exhaust fin channels in copper/aluminum radiators using controlled dry air bursts",
            "Chassis intake grill and magnetic dust filter deep cleaning"
          ],
          "guarantee": "Restoration of original airflow velocity and immediate reduction of fan acoustic whine."
        },
        {
          "id": "thermal-paste-replacement",
          "title": "High-Performance Thermal Compound Replacement",
          "shortDescription": "Chemical decontamination of dry OEM paste and precision application of top-tier thermal compounds (Arctic MX-4, Arctic MX-6, Noctua NT-H1).",
          "duration": "1 - 2 hours",
          "priceRange": "100 - 140 RON (Laptop) / 90 - 120 RON (Desktop PC)",
          "features": [
            "Complete removal of hardened thermal compound using 99.9% electronic-grade isopropyl alcohol",
            "Application of premium compounds: Arctic MX-4, Arctic MX-6, or Noctua NT-H1 with superior thermal conductivity",
            "Inspection and repositioning of thermal pads across VRMs and high-speed VRAM chips",
            "Torque-balanced cross-pattern screw fastening for optimal mounting pressure over the silicon dies"
          ],
          "guarantee": "Measurable thermal drop guarantee: 15°C to 30°C temperature reduction under load with zero thermal throttling."
        },
        {
          "id": "hardware-upgrades",
          "title": "Hardware Upgrades (Fast SSD & RAM Expansion)",
          "shortDescription": "Hardware compatibility consulting, component procurement guidance, and professional installation for exponential speed boosts.",
          "duration": "1 - 2 hours",
          "priceRange": "60 - 90 RON (Installation labor / disk cloning)",
          "features": [
            "Technical compatibility validation (NVMe M.2 PCIe 3.0/4.0, 2.5\" SATA III, DDR4, DDR5)",
            "Delicate component seating without straining motherboard connectors or retention clips",
            "Bit-perfect drive cloning from legacy storage to fast SSD, or fresh OS installation",
            "MemTest86 memory stability verification and sequential read/write throughput validation"
          ],
          "guarantee": "4x to 10x faster application launch times and instant multitasking responsiveness."
        },
        {
          "id": "thermal-bench-testing",
          "title": "On-the-Spot Thermal Benchmarking & Stress Testing",
          "shortDescription": "Synthetic stress run (Cinebench, FurMark, AIDA64) executed live during handover so you inspect empirical data before payment.",
          "duration": "20 - 30 minutes",
          "priceRange": "Free in all packages (40 RON standalone diagnostic)",
          "features": [
            "Real-time sensor telemetry monitoring (Core Temp, HWiNFO64)",
            "Simultaneous or sequential CPU and GPU full load generation",
            "Side-by-side empirical metrics: minimum, maximum, and average operating temperatures",
            "Sustained Turbo Boost frequency confirmation under heavy load"
          ],
          "guarantee": "100% transparency. You only pay once you witness undeniable thermal drop and system stability."
        }
      ],
      "packages": [
        {
          "id": "pkg-office-refresh",
          "name": "Office Refresh Bundle",
          "badge": "Recommended for Work & Academics",
          "idealFor": "Everyday work laptops, home office setups, web browsing, and student laptops that have begun lagging or heating up.",
          "price": "200 RON",
          "estimatedTime": "3 - 4 hours",
          "savings": "Save 50 RON compared to individual service rates",
          "includes": [
            "Full dust disassembly and cleaning of cooling fans and radiators",
            "Thermal paste repasting with Arctic MX-4 / MX-6",
            "Clean Windows 10 or 11 reinstallation with official drivers",
            "Full Microsoft Office deployment + essential daily utility pack",
            "Startup speed debloating and on-handover stability verification"
          ]
        },
        {
          "id": "pkg-thermal-pro-gamer",
          "name": "Thermal Pro Gamer Bundle",
          "badge": "Most Popular for Gamers & Creators",
          "idealFor": "Gaming rigs and performance laptops (Legion, ROG, Predator, TUF, Omen) that reach 90°C+ and throttle during intense gameplay.",
          "price": "190 RON",
          "estimatedTime": "2 - 3 hours",
          "savings": "Save 20 RON vs individual services + includes on-the-spot Cinebench & FurMark stress test",
          "includes": [
            "Dual/triple-fan heatsink deep cleaning and fin de-clogging",
            "Die decontamination with 99.9% isopropyl alcohol and repasting with Noctua NT-H1 or Arctic MX-6",
            "VRM and VRAM thermal pad contact inspection and refresh",
            "Live thermal stress test on handover (Cinebench + FurMark) verifying a 15°C - 30°C temperature drop",
            "Airflow optimization profile setup and cooling pad/undervolt advice"
          ]
        },
        {
          "id": "pkg-rebirth-total",
          "name": "Total Rebirth Overhaul",
          "badge": "Complete Device Transformation",
          "idealFor": "Laptops or desktop PCs 2-5 years old with sluggish mechanical HDDs or low RAM that overheat and freeze.",
          "price": "280 RON",
          "estimatedTime": "4 - 5 hours",
          "savings": "Save 80 RON + complete hardware and software labor included",
          "includes": [
            "Full thermal maintenance (meticulous dust clearing + premium thermal paste)",
            "High-speed SSD installation and/or RAM memory module expansion (hardware chosen by client)",
            "Zero-loss data backup and seamless personal file migration",
            "Clean Windows 11 installation deployed onto the new SSD with maximum performance tweaks",
            "Complete Office suite, essential utilities, and side-by-side performance benchmarks"
          ]
        }
      ],
      "guarantees": [
        {
          "id": "on-the-spot-testing",
          "title": "On-the-Spot Thermal Testing",
          "subtitle": "Inspect empirical metrics before paying",
          "description": "We don't rely on empty promises. During device handover, we run synthetic stress tests and compare temperatures before and after the intervention. You inspect the exact 15°C - 30°C temperature drop on screen in real time."
        },
        {
          "id": "free-followup-support",
          "title": "Free Follow-Up Technical Support",
          "subtitle": "Direct assistance following delivery",
          "description": "Every software and hardware intervention comes with complimentary follow-up support. If you ever need advice or adjustments down the line, I'm just a quick message away so you enjoy total peace of mind."
        },
        {
          "id": "premium-compounds",
          "title": "Premium Compounds & Professional Tools",
          "subtitle": "Arctic MX-4, Arctic MX-6 & Noctua NT-H1",
          "description": "We never compromise on materials. We exclusively use internationally acclaimed thermal compounds known for long-term endurance, 99.9% pure electronic isopropyl alcohol, and ESD-safe precision toolsets."
        },
        {
          "id": "data-privacy-respect",
          "title": "100% Data Privacy & Respect",
          "subtitle": "Guaranteed security for your files",
          "description": "Your files, personal photos, and sensitive documents are treated with utmost confidentiality. I work with orderly ethics and engineering rigor. Your private data is never viewed, copied, or disclosed."
        }
      ],
      "faq": [
        {
          "question": "How long does a standard cleaning and thermal paste replacement take?",
          "answer": "A standard hardware maintenance service (meticulous dust removal and premium thermal repasting) typically takes between 1 and 2 hours. If paired with a full OS clean reinstallation and data migration, turnaround is usually 3 to 4 hours. Equipment is almost always returned on the exact same day."
        },
        {
          "question": "What happens to my personal data? Should I back it up beforehand?",
          "answer": "Whenever possible, we recommend saving your vital documents and files to a USB drive or cloud storage before handing over your machine. However, if your system fails to boot or you prefer assistance, we provide dedicated backup and migration services guaranteeing 100% data confidentiality."
        },
        {
          "question": "How does the on-the-spot handover temperature test work?",
          "answer": "Upon device handover, we boot your machine and launch hardware telemetry software (HWiNFO64 / Core Temp) alongside synthetic benchmark tools (Cinebench for CPU, FurMark for GPU). We review real-time maximum temperatures compared against pre-service baselines, demonstrating a verified 15°C to 30°C drop before you make any payment."
        },
        {
          "question": "Where do we meet in Cluj-Napoca for pickup and handover?",
          "answer": "We offer flexible handover options across primary Cluj-Napoca neighborhoods including Mănăștur, Mărăști, Zorilor, Centru (City Center), and Gheorgheni. Specific doorstep pickup and drop-off can also be arranged upon request."
        },
        {
          "question": "Why should I replace thermal paste if my laptop is still running?",
          "answer": "Factory thermal paste naturally dries out and hardens after 12 to 24 months of regular heat cycles. As it dries, heat transfer between the silicon die and copper heatsink degrades rapidly, forcing the CPU/GPU into severe thermal throttling. Regular repasting prevents permanent motherboard damage and keeps your machine quiet, cool, and fast."
        }
      ],
      "galleryCategories": [
        "All",
        "Laptop Cleaning",
        "Thermal Paste",
        "Hardware Upgrades",
        "Windows Setup"
      ],
      "galleryItems": [
        {
          "id": "work-1",
          "deviceModel": "Lenovo Legion Y540-15IRH",
          "category": "Thermal Paste",
          "categorySlug": "thermal-paste",
          "image": "assets/images/gallery/work-1.jpg",
          "tempBefore": 95,
          "tempAfter": 69,
          "thermalDrop": 26,
          "compoundUsed": "Arctic MX-6",
          "title": "Gaming Laptop Thermal Overhaul - Lenovo Legion",
          "clientIssue": "Laptop was reaching 95°C during gaming sessions with fans screeching at full speed and severe frame rate drops (throttling).",
          "solution": "Deep dust extraction from dual cooling turbines and copper radiators. Chemical cleanup of dry factory paste using 99.9% isopropyl alcohol and precision application of Arctic MX-6.",
          "result": "26°C temperature reduction under sustained full load, significantly cooler keyboard deck, and zero frame drops in demanding gaming titles."
        },
        {
          "id": "work-2",
          "deviceModel": "Asus ROG Strix G15 G512",
          "category": "Laptop Cleaning",
          "categorySlug": "laptop-cleaning",
          "image": "assets/images/gallery/work-2.jpg",
          "tempBefore": 93,
          "tempAfter": 68,
          "thermalDrop": 25,
          "compoundUsed": "Noctua NT-H1",
          "title": "Asus ROG Strix Cooling System Restoration",
          "clientIssue": "Whining fan noise, clogged copper fin exhausts from dense lint, leading to thermal crashes in 3D rendering workloads.",
          "solution": "Full teardown of dual-fan vapor cooler, high-pressure dry air fin de-clogging, fan spindle service, and Noctua NT-H1 thermal compound application on CPU and discrete GPU.",
          "result": "25°C lower peak temperature, zero high-pitch whine, and rock-solid stability in Cinebench and FurMark stress loops."
        },
        {
          "id": "work-3",
          "deviceModel": "Dell Latitude 5420",
          "category": "Hardware Upgrades",
          "categorySlug": "hardware-upgrades",
          "image": "assets/images/gallery/work-3.jpg",
          "tempBefore": 89,
          "tempAfter": 62,
          "thermalDrop": 27,
          "compoundUsed": "Arctic MX-4",
          "title": "NVMe SSD Upgrade, 32GB RAM & Thermal Servicing - Dell Latitude",
          "clientIssue": "Sluggish business laptop taking over 90 seconds to cold boot, noisy fan spinning up in Zoom calls, and constant memory shortage with complex Excel models.",
          "solution": "Slim-chassis dust cleaning, Arctic MX-4 compound repasting, memory expansion from 8GB to 32GB DDR4 dual-channel, and seamless cloning to a 1TB high-speed Samsung NVMe SSD.",
          "result": "Boot time slashed to under 8 seconds, 27°C cooler operation in conference calls, and near-silent operation during heavy multitasking."
        },
        {
          "id": "work-4",
          "deviceModel": "HP Pavilion Gaming 15-dk",
          "category": "Laptop Cleaning",
          "categorySlug": "laptop-cleaning",
          "image": "assets/images/gallery/work-4.jpg",
          "tempBefore": 96,
          "tempAfter": 71,
          "thermalDrop": 25,
          "compoundUsed": "Arctic MX-6",
          "title": "Thermal Servicing & Software Cleanup - HP Pavilion Gaming",
          "clientIssue": "Laptop suffered unexpected emergency shutdowns due to extreme overheating (96°C), compounded by browser hijacker malware and intrusive adware pop-ups.",
          "solution": "Dual-fan radiator cleaning, Arctic MX-6 thermal repasting, secure document backup, clean Windows 11 deployment, and essential productivity suite installation.",
          "result": "Temperatures dropped by 25°C, emergency shutdowns completely eliminated, and a snappy, sanitized operating environment."
        },
        {
          "id": "work-5",
          "deviceModel": "Acer Swift 3 SF314",
          "category": "Windows Setup",
          "categorySlug": "windows-setup",
          "image": "assets/images/gallery/work-5.jpg",
          "tempBefore": 86,
          "tempAfter": 58,
          "thermalDrop": 28,
          "compoundUsed": "Noctua NT-H1",
          "title": "Clean Windows 11 Setup & Ultrabook Maintenance - Acer Swift 3",
          "clientIssue": "Ultra-thin laptop running hot on client's lap during simple web browsing, with rapid battery drain caused by runaway background tasks.",
          "solution": "Micro-fan cleaning, old paste replaced with Noctua NT-H1, clean Windows 11 installation stripped of bloatware, and balanced power curve calibration.",
          "result": "28°C lower temperature under load, comfortably cool chassis bottom on desk or lap, and over 2 additional hours of real-world battery life."
        },
        {
          "id": "work-6",
          "deviceModel": "Custom Gaming PC (Ryzen 5 5600X + RTX 3070)",
          "category": "Hardware Upgrades",
          "categorySlug": "hardware-upgrades",
          "image": "assets/images/gallery/work-6.jpg",
          "tempBefore": 84,
          "tempAfter": 59,
          "thermalDrop": 25,
          "compoundUsed": "Arctic MX-6",
          "title": "Full Desktop PC Overhaul, Re-Cable Management & Cooling",
          "clientIssue": "Tower gaming PC suffering from compromised airflow due to rat's-nest cabling, dusty mesh filters, and high CPU/GPU thermals during 4K video renders.",
          "solution": "Full internal air purge with high-pressure dry air, washable filter cleaning, comprehensive rear-tray cable routing, Arctic MX-6 application on CPU cooler and GPU, and silent PWM fan curves in BIOS.",
          "result": "25°C lower temps in sustained 4K DaVinci Resolve rendering, unobstructed positive-pressure airflow, and near-silent acoustic signature."
        }
      ]
    }
  };

  /* ============================================================================
     2. STATE & CONFIGURATION
     ============================================================================ */
  let appData = SERVICES_DATA_FALLBACK;
  let currentLang = 'ro';
  const LANG_STORAGE_KEY = 'preferredLang';
  const THEME_STORAGE_KEY = 'dt-portfolio-theme';
  const THEME_FALLBACK_KEY = 'theme';

  // Calculator price dictionary (standard estimated numbers)
  const CALC_SERVICE_PRICES = {
    'win-clean': 130,
    'office-pack': 60,
    'custom-apps': 70,
    'virus-removal': 90,
    'data-backup': 80,
    'dust-clean': 90,
    'thermal-paste': 120,
    'hw-upgrade': 75,
    'bench-test': 0
  };

  // SVG Icons for Gallery Placeholders
  const SVG_HARDWARE_ICONS = {
    'laptop-cleaning': `<svg class="placeholder-hardware-icon" viewBox="0 0 24 24"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55A1 1 0 0 1 20.38 20H3.62a1 1 0 0 1-.9-1.45L4 16"/><path d="M12 9v4m-2-2h4"/></svg>`,
    'thermal-paste': `<svg class="placeholder-hardware-icon" viewBox="0 0 24 24"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2m-6-2v2m6 16v2m-6-2v2M2 15h2m-2-6h2m16 6h2m-2-6h2"/></svg>`,
    'hardware-upgrades': `<svg class="placeholder-hardware-icon" viewBox="0 0 24 24"><rect width="18" height="12" x="3" y="6" rx="2"/><path d="M7 12h1m4 0h1m4 0h1M7 6v2m10-2v2M7 16v2m10-2v2"/></svg>`,
    'windows-setup': `<svg class="placeholder-hardware-icon" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/><circle cx="7" cy="7" r="1"/><circle cx="11" cy="7" r="1"/></svg>`
  };

  /* ============================================================================
     3. THEME ENGINE SYNCHRONIZATION
     ============================================================================ */
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) || localStorage.getItem(THEME_FALLBACK_KEY);
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
      const nextTheme = theme === 'dark' ? 'light' : 'dark';
      btn.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
      btn.setAttribute('title', `Switch to ${nextTheme} theme`);
    });
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    localStorage.setItem(THEME_FALLBACK_KEY, newTheme);
    applyTheme(newTheme);
  }

  function initTheme() {
    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    document.addEventListener('click', e => {
      const toggleBtn = e.target.closest('.theme-toggle-btn');
      if (toggleBtn) {
        e.preventDefault();
        toggleTheme();
      }
    });

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
        if (!localStorage.getItem(THEME_STORAGE_KEY) && !localStorage.getItem(THEME_FALLBACK_KEY)) {
          applyTheme(e.matches ? 'light' : 'dark');
        }
      });
    }
  }

  /* ============================================================================
     4. LIQUID GLASS NAVBAR & MOBILE DRAWER INTERACTIONS
     ============================================================================ */
  function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-toggle-btn');
    const drawer = document.querySelector('.mobile-drawer');

    if (toggleBtn && drawer) {
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

      drawer.addEventListener('click', e => {
        if (e.target.closest('.nav-link') || e.target.closest('a')) {
          closeDrawer();
        }
      });

      document.addEventListener('click', e => {
        const isOpen = drawer.classList.contains('open') || drawer.classList.contains('is-open');
        if (isOpen && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
          closeDrawer();
        }
      });

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          closeDrawer();
        }
      });
    }

    // Platform Dropdown Menu Handling (Desktop Liquid Glass Quick Menu)
    const platformDropdown = document.getElementById('platform-dropdown');
    const platformBtn = document.getElementById('platform-menu-btn');
    if (platformDropdown && platformBtn) {
      platformBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = platformDropdown.classList.toggle('is-open');
        platformBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      document.addEventListener('click', (e) => {
        if (!platformDropdown.contains(e.target)) {
          platformDropdown.classList.remove('is-open');
          platformBtn.setAttribute('aria-expanded', 'false');
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          platformDropdown.classList.remove('is-open');
          platformBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Dynamic Liquid Lens Specular Sheen Tracker on Navbar Island
    const island = document.querySelector('.navbar-island');
    if (island) {
      island.addEventListener('mousemove', (e) => {
        const rect = island.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        island.style.setProperty('--mouse-x', `${x}%`);
        island.style.setProperty('--mouse-y', `${y}%`);
      });
    }
  }

  /* ============================================================================
     4.1 INTERACTIVE CATEGORY TABS ENGINE
     Filters between:
     [ Toate / All ] | [ 💻 Servicii Software ] | [ 🔧 Mentenanță Hardware ] | [ ⚡ Pachete Promoționale ] | [ 🧮 Calculator Preț ]
     ============================================================================ */
  let activeCategoryTab = 'all';

  function initCategoryTabs() {
    document.addEventListener('click', e => {
      const tabBtn = e.target.closest('.service-tab-btn');
      if (tabBtn) {
        e.preventDefault();
        const tab = tabBtn.getAttribute('data-category-tab');
        if (tab) {
          activateCategoryTab(tab);
        }
      }
    });

    // Handle hash on page load
    handleInitialCategoryHash();

    // Listen to hashchange
    window.addEventListener('hashchange', () => {
      handleInitialCategoryHash();
    });
  }

  function activateCategoryTab(tab) {
    if (!tab) return;

    if (tab === 'calculator') {
      const cmdCenter = document.getElementById('command-center') || document.getElementById('calculator');
      if (cmdCenter) {
        cmdCenter.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    activeCategoryTab = tab;

    // Update tab button states
    const tabButtons = document.querySelectorAll('.service-tab-btn');
    tabButtons.forEach(btn => {
      const btnTab = btn.getAttribute('data-category-tab');
      const isActive = btnTab === tab;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Filter catalog panels
    const panels = document.querySelectorAll('.catalog-panel');
    panels.forEach(panel => {
      const panelType = panel.getAttribute('data-panel');
      if (tab === 'all') {
        panel.classList.remove('is-hidden');
      } else {
        if (panelType === tab) {
          panel.classList.remove('is-hidden');
        } else {
          panel.classList.add('is-hidden');
        }
      }
    });

    // Update URL hash smoothly without page jump
    if (history.replaceState) {
      history.replaceState(null, '', '#' + tab);
    }
  }

  window.activateCategoryTab = activateCategoryTab;

  function handleInitialCategoryHash() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'software' || hash === 'hardware' || hash === 'packages' || hash === 'all') {
      activateCategoryTab(hash);
    } else if (hash === 'calculator' || hash === 'thermals' || hash === 'command-center') {
      const target = document.getElementById('command-center') || document.getElementById('calculator');
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }

  /* ============================================================================
     5. BILINGUAL RENDERING ENGINE (RO | EN)
     ============================================================================ */
  function getPreferredLanguage() {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'ro' || saved === 'en') return saved;
    // Default to 'ro' for local Cluj platform
    return 'ro';
  }

  function setLanguage(lang) {
    if (lang !== 'ro' && lang !== 'en') return;
    currentLang = lang;
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    document.documentElement.lang = lang;

    // Update active state in segmented pills
    const toggleBtns = document.querySelectorAll('.lang-btn, .lang-toggle-btn');
    toggleBtns.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      const isActive = btnLang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    const langToggleContainer = document.querySelector('.lang-toggle');
    if (langToggleContainer) {
      langToggleContainer.setAttribute('data-active-lang', lang);
    }

    // Re-render UI components in the new language
    renderAllContent();
  }

  function initLanguageToggle() {
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
     6. CONTENT RENDERING DISPATCHER
     ============================================================================ */
  function renderAllContent() {
    const langData = appData[currentLang] || appData.ro;
    const provider = appData.provider;

    // Update document title and description
    document.title = langData.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', langData.meta.subtitle);

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = resolveI18nKey(langData, provider, key);
      if (translation !== undefined) {
        el.textContent = translation;
      }
    });

    // Render Hero Announcements
    renderAnnouncements(langData.originalAnnouncements);

    // Render Software Services Grid
    renderSoftwareServices(langData.softwareServices);

    // Render Hardware Maintenance Grid
    renderHardwareServices(langData.hardwareServices);

    // Render Popular Combo Packages
    renderComboPackages(langData.packages);

    // Render Thermal Performance Widget
    renderThermalWidget();

    // Render Work Gallery Categories and Items
    renderGallery(langData.galleryCategories, langData.galleryItems);

    // Render Guarantees
    renderGuarantees(langData.guarantees);

    // Render FAQ
    renderFAQ(langData.faq);

    // Refresh Calculator labels, custom tiles, and WhatsApp text in current language
    syncBundleCardsVisual();
    renderConfigCustomTiles();
    updateCalculatorTotal();
  }

  function resolveI18nKey(langData, provider, key) {
    const map = {
      'nav.catalog': currentLang === 'ro' ? 'Servicii & Tarife' : 'Services & Pricing',
      'nav.commandCenter': currentLang === 'ro' ? 'Centru Comandă' : 'Command Center',
      'nav.software': currentLang === 'ro' ? 'Servicii Software' : 'Software Services',
      'nav.hardware': currentLang === 'ro' ? 'Mentenanță Hardware' : 'Hardware Maintenance',
      'nav.packages': currentLang === 'ro' ? 'Pachete Complete' : 'Combo Packages',
      'nav.thermals': currentLang === 'ro' ? 'Temperaturi' : 'Thermals',
      'nav.gallery': currentLang === 'ro' ? 'Galerie Lucrări' : 'Work Gallery',
      'nav.guarantees': currentLang === 'ro' ? 'Garanții' : 'Guarantees',
      'nav.calculator': currentLang === 'ro' ? 'Calculator Preț' : 'Quote Estimator',
      'nav.faq': currentLang === 'ro' ? 'FAQ' : 'FAQ',
      'nav.portfolio': currentLang === 'ro' ? 'Portofoliu Software' : 'Software Portfolio',
      'nav.blog': currentLang === 'ro' ? 'Blog & Ghiduri' : 'Blog & Guides',
      'nav.evidence': currentLang === 'ro' ? 'Registru Lucrări 🔒' : 'Evidence Log 🔒',
      'nav.platform': currentLang === 'ro' ? 'Platformă' : 'Platform',

      'charter.badge': currentLang === 'ro' ? 'Carta Serviciilor Dragoș Tecuci • Angajament de Calitate' : 'Dragoș Tecuci Service Charter • Quality Commitment',

      'tabs.all': currentLang === 'ro' ? 'Toate Serviciile' : 'All Services',
      'tabs.software': currentLang === 'ro' ? 'Servicii Software' : 'Software Services',
      'tabs.hardware': currentLang === 'ro' ? 'Mentenanță Hardware' : 'Hardware Maintenance',
      'tabs.packages': currentLang === 'ro' ? 'Pachete Promoționale' : 'Promo Bundles',
      'tabs.calculator': currentLang === 'ro' ? 'Calculator Preț' : 'Price Estimator',

      'catalog.eyebrow': currentLang === 'ro' ? 'Catalog & Tarife' : 'Service Catalog & Pricing',
      'catalog.title': currentLang === 'ro' ? 'Servicii Tehnice & Pachete Complete' : 'Technical Services & Complete Bundles',
      'catalog.desc': currentLang === 'ro'
        ? 'Filtrează rapid după nevoile tale sau explorează toate opțiunile disponibile.'
        : 'Quickly filter by service type or explore all available options.',

      'command.eyebrow': currentLang === 'ro' ? 'Dovadă Măsurabilă & Estimare Instantă' : 'Measurable Telemetry & Instant Estimate',
      'command.title': currentLang === 'ro' ? 'Centru de Comandă Termică & Calculator Preț' : 'Thermal Command Center & Quote Estimator',
      'command.desc': currentLang === 'ro'
        ? 'Monitorizare termică live din teste de stres (FurMark + Cinebench) și configurator interactiv cu discount automat aplicat.'
        : 'Live thermal telemetry under synthetic stress (FurMark + Cinebench) and interactive configurator with automatic bundle discounts.',

      'hero.badge': langData.meta.badge,
      'hero.neighborhoods': provider.neighborhoods.join(' • '),
      'hero.liveStatus': currentLang === 'ro' ? 'Disponibil în Cluj-Napoca (Predare Rapidă)' : 'Available in Cluj-Napoca (Fast Turnaround)',
      'hero.headline': langData.hero.headline,
      'hero.subheadline': langData.hero.subheadline,
      'hero.ctaPrimary': langData.hero.ctaPrimary,
      'hero.ctaSecondary': langData.hero.ctaSecondary,
      'hero.ctaGallery': langData.hero.ctaGallery,
      'hero.whatsappCta': langData.hero.whatsappCta,
      'hero.phoneCta': langData.hero.phoneCta,

      'software.eyebrow': currentLang === 'ro' ? 'Software & Optimizare' : 'Software & Speed Optimization',
      'software.title': currentLang === 'ro' ? 'Servicii Software Rapide & Configurare' : 'Fast Software Services & Setup',
      'software.desc': currentLang === 'ro'
        ? 'Instalări curate de la zero, formatare corectă, pachete office complete și devirusare profesională fără pierderea documentelor.'
        : 'Clean OS deployments from scratch, proper disk formatting, productivity packs, and malware disinfection with total data integrity.',

      'hardware.eyebrow': currentLang === 'ro' ? 'Hardware & Termică' : 'Hardware & Thermal Maintenance',
      'hardware.title': currentLang === 'ro' ? 'Mentenanță Hardware & Curățare Termică' : 'Hardware Maintenance & Thermal Servicing',
      'hardware.desc': currentLang === 'ro'
        ? 'Materiale premium de vârf (Arctic MX-6, Noctua NT-H1), alcool izopropilic 99.9%, unelte ESD și test termic live la predare.'
        : 'Premium compounds (Arctic MX-6, Noctua NT-H1), 99.9% electronic isopropyl, ESD-safe tooling, and live on-the-spot handover benchmark tests.',

      'combos.eyebrow': currentLang === 'ro' ? 'Pachete Populare' : 'Popular Bundles',
      'combos.title': currentLang === 'ro' ? 'Pachete Combinate Hardware + Software' : 'Combined Hardware + Software Bundles',
      'combos.desc': currentLang === 'ro'
        ? 'Pachete complete cu economii considerabile, testare la fața locului și predare de regulă în aceeași zi.'
        : 'All-inclusive packages with significant savings, live stability verification, and same-day device return.',

      'thermals.eyebrow': currentLang === 'ro' ? 'Dovadă Măsurabilă' : 'Measurable Telemetry',
      'thermals.title': currentLang === 'ro' ? 'Comparație Temperatură: Înainte vs. După' : 'Thermal Benchmarks: Before vs. After',
      'thermals.desc': currentLang === 'ro'
        ? 'Date reale înregistrate în teste de stres sintetic (FurMark + Cinebench R23). Testăm live la predare ca să vezi diferența pe loc!'
        : 'Empirical telemetry under synthetic load (FurMark + Cinebench R23). We test live on handover so you inspect the drop before paying!',

      'gallery.eyebrow': currentLang === 'ro' ? 'Transparență Totală' : 'Verified Evidence',
      'gallery.title': currentLang === 'ro' ? 'Galerie Lucrări & Intervenții Reale' : 'Work Showcase & Handover Gallery',
      'gallery.desc': currentLang === 'ro'
        ? 'Fiecare laptop sau unitate PC este curățată și testată cu rigoare de inginer software. Fă click pe o lucrare pentru detalii.'
        : 'Every laptop and desktop rig is serviced and tested with engineering rigor. Click on any showcase card to inspect full details.',

      'calc.eyebrow': currentLang === 'ro' ? 'Estimare Instantă' : 'Instant Estimate',
      'calc.tag': currentLang === 'ro' ? 'Configurator Inteligent • Estimare Instantă' : 'Smart Configurator • Instant Estimate',
      'calc.title': currentLang === 'ro' ? 'Personalizează sau Alege Rapid' : 'Customize or Quick-Pick',
      'calc.desc': currentLang === 'ro'
        ? 'Selectează un pachet optimizat sau compune propria combinație cu discount calculat automat.'
        : 'Select an optimized bundle or craft your own custom combination with auto-calculated discounts.',
      'calc.mode_bundles': currentLang === 'ro' ? 'Pachete Recomandate' : 'Recommended Bundles',
      'calc.mode_bundles_sub': currentLang === 'ro' ? '1-Click • Discount Inclus' : '1-Click • Discount Included',
      'calc.mode_custom': currentLang === 'ro' ? 'Configurare la Bucată' : 'Custom Step-by-Step',
      'calc.mode_custom_sub': currentLang === 'ro' ? 'Alege servicii pas-cu-pas' : 'Pick services step-by-step',
      'calc.dock_title': currentLang === 'ro' ? 'Configurația Selectată:' : 'Selected Configuration:',
      'calc.total_label': currentLang === 'ro' ? 'Total Estimat:' : 'Estimated Total:',
      'calc.totalLabel': currentLang === 'ro' ? 'Total Estimat:' : 'Estimated Total:',
      'calc.step1': currentLang === 'ro' ? '1. Selectează Servicii Software' : '1. Select Software Services',
      'calc.step2': currentLang === 'ro' ? '2. Selectează Mentenanță Hardware' : '2. Select Hardware Maintenance',
      'calc.btnWhatsapp': currentLang === 'ro' ? 'Comandă pe WhatsApp' : 'Order via WhatsApp',

      'guarantees.eyebrow': currentLang === 'ro' ? 'Încredere & Rigoare' : 'Trust & Rigor',
      'guarantees.title': currentLang === 'ro' ? 'Cele 4 Garanții ale Fiecărei Intervenții' : 'The 4 Handover Guarantees',
      'guarantees.desc': currentLang === 'ro'
        ? 'Standard etic de inginer software: transparență absolută, confidențialitatea datelor și materiale fără compromis.'
        : 'Software engineer standards: total empirical transparency, strict data privacy, and zero compromise on compounds.',

      'faq.eyebrow': currentLang === 'ro' ? 'Claritate & Informații' : 'Clarity & Information',
      'faq.title': currentLang === 'ro' ? 'Întrebări Frecvente (FAQ)' : 'Frequently Asked Questions (FAQ)',
      'faq.desc': currentLang === 'ro'
        ? 'Tot ce trebuie să știi înainte de a programa o intervenție pentru PC-ul sau laptopul tău în Cluj-Napoca.'
        : 'Everything you need to know before booking a service intervention for your PC or laptop in Cluj-Napoca.',

      'floating.whatsapp': currentLang === 'ro' ? 'WhatsApp' : 'WhatsApp',
      'floating.call': currentLang === 'ro' ? 'Sună' : 'Call'
    };

    return map[key];
  }

  /* ============================================================================
     7. COMPONENT RENDERERS
     ============================================================================ */

  // 7.1 Hero Original Announcements (Carta Serviciilor / Service Charter)
  function renderAnnouncements(announcements) {
    const container = document.getElementById('announcements-container');
    if (!container || !announcements) return;

    const isRo = currentLang === 'ro';

    const softwareBadge = isRo ? 'Standard Software' : 'Software Standard';
    const softwareRole = isRo ? 'Dragoș Tecuci • Inginer Software Cluj' : 'Dragoș Tecuci • Software Engineer Cluj';
    const softwareTitle = isRo ? 'Carta Serviciilor Software & Optimizare' : 'Software Services & Optimization Charter';
    const softwareLead = isRo
      ? 'Servicii software rapide, realizate cu rigoare de inginer, ca tu să te poți baza pe dispozitivul tău la capacitate maximă.'
      : 'Fast software services delivered with engineering rigor, ensuring your machine performs reliably at full capacity.';
    const swCheck1 = isRo ? 'Instalare / Reinstalare Windows 10 & 11: formatare GPT/UEFI curată, toate driverele oficiale și optimizare viteză' : 'Clean Windows 10 & 11 Installation: GPT/UEFI partitioning, official driver packages, and speed debloating';
    const swCheck2 = isRo ? 'Pachet Programe de Bază: Microsoft Office complet, codecuri multimedia, browsere optimizate ad-block' : 'Essential Productivity Pack: Full Microsoft Office setup, media codecs, and ad-blocked secure browsers';
    const swCheck3 = isRo ? 'Instalări speciale & devirusare: unelte facultate/muncă, salvare completă date fără pierderi de fișiere' : 'Specialized setups & malware disinfection: university/work tools, guaranteed safe backup with zero data loss';
    const swSeal = isRo ? 'Garanție: Predare doar după testare completă + asistență tehnică gratuită post-instalare.' : 'Guarantee: Handover only after full stability testing + free post-setup technical support.';

    const hardwareBadge = isRo ? 'Standard Hardware' : 'Hardware Standard';
    const hardwareRole = isRo ? 'Mentenanță & Răcire • Cluj-Napoca' : 'Thermal Servicing & Overhauls • Cluj';
    const hardwareTitle = isRo ? 'Carta Mentenanței Hardware & Termice' : 'Hardware & Thermal Servicing Charter';
    const hardwareLead = isRo
      ? 'Mentenanță meticuloasă cu materiale de top pentru a elimina supraîncălzirea și a prelungi durata de viață a echipamentului.'
      : 'Meticulous hardware servicing with top-tier thermal compounds to eradicate overheating and extend device lifespan.';
    const hwCheck1 = isRo ? 'Curățare completă de praf: demontare atentă, desfundare radiatoare și degresare pale ventilatoare' : 'Deep dust removal: careful chassis disassembly, copper heatsink fin de-clogging, and fan impeller servicing';
    const hwCheck2 = isRo ? 'Înlocuire pastă termică de vârf: compuși de top Arctic MX-6 sau Noctua NT-H1 pe CPU și GPU' : 'Top-tier compound replacement: premium Arctic MX-6 or Noctua NT-H1 paste on CPU & GPU dies';
    const hwCheck3 = isRo ? 'Upgrade-uri hardware rapide: asistență selecție și montaj SSD NVMe de mare viteză sau memorie RAM' : 'Fast hardware upgrades: procurement advice and precision installation for NVMe SSDs and RAM expansion';
    const hwSeal = isRo ? 'Garanție: Unelte adecvate ESD + test de temperatură la fața locului la predare înainte de plată.' : 'Guarantee: Professional ESD tools + live on-the-spot thermal benchmark test before payment.';

    container.innerHTML = `
      <article class="charter-card software">
        <div class="charter-header">
          <div class="charter-header-left">
            <span class="charter-badge-tag">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              ${softwareBadge}
            </span>
            <span class="charter-role-stamp">${softwareRole}</span>
          </div>
        </div>
        <h3 class="charter-title">${softwareTitle}</h3>
        <p class="charter-lead">${softwareLead}</p>
        <ul class="charter-highlights-list">
          <li class="charter-highlight-item">
            <svg class="charter-check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${swCheck1}</span>
          </li>
          <li class="charter-highlight-item">
            <svg class="charter-check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${swCheck2}</span>
          </li>
          <li class="charter-highlight-item">
            <svg class="charter-check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${swCheck3}</span>
          </li>
        </ul>
        <div class="charter-guarantee-seal">
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span><strong>${isRo ? 'Angajament:' : 'Commitment:'}</strong> ${swSeal}</span>
        </div>
      </article>

      <article class="charter-card hardware">
        <div class="charter-header">
          <div class="charter-header-left">
            <span class="charter-badge-tag">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              ${hardwareBadge}
            </span>
            <span class="charter-role-stamp">${hardwareRole}</span>
          </div>
        </div>
        <h3 class="charter-title">${hardwareTitle}</h3>
        <p class="charter-lead">${hardwareLead}</p>
        <ul class="charter-highlights-list">
          <li class="charter-highlight-item">
            <svg class="charter-check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${hwCheck1}</span>
          </li>
          <li class="charter-highlight-item">
            <svg class="charter-check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${hwCheck2}</span>
          </li>
          <li class="charter-highlight-item">
            <svg class="charter-check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${hwCheck3}</span>
          </li>
        </ul>
        <div class="charter-guarantee-seal">
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span><strong>${isRo ? 'Angajament:' : 'Commitment:'}</strong> ${hwSeal}</span>
        </div>
      </article>
    `;
  }

  // Helper to format price cleanly into single-row amount and optional sub-tag
  function formatPriceDisplay(priceStr) {
    if (!priceStr) return '';
    const match = priceStr.match(/^([^(]+)(?:\((.*)\))?$/);
    if (match && match[2]) {
      const main = escapeHtml(match[1].trim());
      const sub = escapeHtml(match[2].trim());
      return `
        <div class="price-main-line">
          <span class="price-amount">${main}</span>
        </div>
        <span class="price-combo-subtag" title="${sub}">💡 ${sub}</span>
      `;
    }
    return `
      <div class="price-main-line">
        <span class="price-amount">${escapeHtml(priceStr)}</span>
      </div>
    `;
  }

  // 7.2 Software Services Grid
  function renderSoftwareServices(services) {
    const container = document.getElementById('software-services-grid');
    if (!container || !services) return;

    // Dynamically update catalog header count badge
    const countEl = document.getElementById('software-count');
    if (countEl) {
      countEl.textContent = currentLang === 'ro' ? `${services.length} servicii` : `${services.length} services`;
    }

    const guaranteeLabel = currentLang === 'ro' ? 'Garanție:' : 'Guarantee:';
    const tagLabel = currentLang === 'ro' ? 'Software' : 'Software';
    const durationTitle = currentLang === 'ro' ? 'Timp estimat de execuție' : 'Estimated turnaround';
    const featuresAria = currentLang === 'ro' ? 'Caracteristici serviciu' : 'Service features';

    container.innerHTML = services.map(srv => `
      <div class="service-card software-card" data-category="software" id="${srv.id}">
        <div class="service-card-header">
          <span class="service-tag">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            ${tagLabel}
          </span>
          <span class="turnaround-badge" title="${durationTitle}">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${escapeHtml(srv.duration)}
          </span>
        </div>

        <h3 class="service-title">${escapeHtml(srv.title)}</h3>
        <p class="service-desc">${escapeHtml(srv.shortDescription)}</p>

        <ul class="service-features" aria-label="${featuresAria}">
          ${srv.features.map(f => `
            <li class="service-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${escapeHtml(f)}</span>
            </li>
          `).join('')}
        </ul>

        <div class="service-guarantee-box">
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <div><strong>${guaranteeLabel}</strong> ${escapeHtml(srv.guarantee)}</div>
        </div>

        <div class="service-card-footer">
          <div class="service-price-callout">
            <span class="price-label">${currentLang === 'ro' ? 'Tarif estimat' : 'Price range'}</span>
            ${formatPriceDisplay(srv.priceRange)}
          </div>
          <a href="#calculator" class="btn btn-outline btn-sm" onclick="selectServiceInCalc('${srv.id}')">
            ${currentLang === 'ro' ? 'Calculează' : 'Select'}
          </a>
        </div>
      </div>
    `).join('');
  }

  // 7.3 Hardware Services Grid
  function renderHardwareServices(services) {
    const container = document.getElementById('hardware-services-grid');
    if (!container || !services) return;

    // Dynamically update catalog header count badge
    const countEl = document.getElementById('hardware-count');
    if (countEl) {
      countEl.textContent = currentLang === 'ro' ? `${services.length} servicii` : `${services.length} services`;
    }

    const guaranteeLabel = currentLang === 'ro' ? 'Garanție:' : 'Guarantee:';
    const tagLabel = currentLang === 'ro' ? 'Hardware' : 'Hardware';
    const durationTitle = currentLang === 'ro' ? 'Timp estimat de execuție' : 'Estimated turnaround';
    const featuresAria = currentLang === 'ro' ? 'Caracteristici mentenanță' : 'Maintenance features';

    container.innerHTML = services.map(srv => `
      <div class="service-card hardware-card" data-category="hardware" id="${srv.id}">
        <div class="service-card-header">
          <span class="service-tag">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            ${tagLabel}
          </span>
          <span class="turnaround-badge" title="${durationTitle}">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${escapeHtml(srv.duration)}
          </span>
        </div>

        <h3 class="service-title">${escapeHtml(srv.title)}</h3>
        <p class="service-desc">${escapeHtml(srv.shortDescription)}</p>

        <ul class="service-features" aria-label="${featuresAria}">
          ${srv.features.map(f => `
            <li class="service-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${escapeHtml(f)}</span>
            </li>
          `).join('')}
        </ul>

        <div class="service-guarantee-box">
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <div><strong>${guaranteeLabel}</strong> ${escapeHtml(srv.guarantee)}</div>
        </div>

        <div class="service-card-footer">
          <div class="service-price-callout">
            <span class="price-label">${currentLang === 'ro' ? 'Tarif estimat' : 'Price range'}</span>
            ${formatPriceDisplay(srv.priceRange)}
          </div>
          <a href="#calculator" class="btn btn-outline btn-sm" onclick="selectServiceInCalc('${srv.id}')">
            ${currentLang === 'ro' ? 'Calculează' : 'Select'}
          </a>
        </div>
      </div>
    `).join('');
  }

  // 7.4 Popular Combo Packages
  function renderComboPackages(packages) {
    const container = document.getElementById('combo-packages-grid');
    if (!container || !packages) return;

    // Dynamically update catalog header count badge
    const countEl = document.getElementById('packages-count');
    if (countEl) {
      countEl.textContent = currentLang === 'ro' ? `${packages.length} pachete` : `${packages.length} bundles`;
    }

    const idealLabel = currentLang === 'ro' ? 'Ideal pentru:' : 'Ideal for:';
    const bookLabel = currentLang === 'ro' ? 'Alege Pachetul' : 'Select Bundle';

    container.innerHTML = packages.map((pkg, idx) => {
      const isPopular = idx === 1; // Thermal Pro Gamer is popular
      const cardClass = isPopular ? 'combo-card is-popular is-recommended' : 'combo-card';
      const floatingBadge = isPopular
        ? `<div class="badge-recommended">★ ${escapeHtml(pkg.badge)} ★</div>`
        : `<div class="savings-badge">${escapeHtml(pkg.badge)}</div>`;

      return `
        <div class="${cardClass}" id="${pkg.id}">
          ${floatingBadge}

          <div style="margin-top: ${isPopular ? 'var(--space-2)' : '0'};">
            <h3 class="service-title" style="font-size: var(--font-size-xl); margin-bottom: var(--space-1);">${escapeHtml(pkg.name)}</h3>
            <div class="savings-badge" style="margin-bottom: var(--space-3);">${escapeHtml(pkg.savings)}</div>
          </div>

          <p class="service-desc" style="font-size: var(--font-size-xs); margin-bottom: var(--space-4);">
            <strong>${idealLabel}</strong> ${escapeHtml(pkg.idealFor)}
          </p>

          <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-4);">
            <span class="turnaround-badge">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              ${escapeHtml(pkg.estimatedTime)}
            </span>
          </div>

          <ul class="service-features" style="margin-bottom: var(--space-6);">
            ${pkg.includes.map(inc => `
              <li class="service-feature-item">
                <svg class="check-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>${escapeHtml(inc)}</span>
              </li>
            `).join('')}
          </ul>

          <div class="service-card-footer" style="padding-top: var(--space-5);">
            <div class="service-price-callout">
              <span class="price-label">${currentLang === 'ro' ? 'Preț pachet' : 'Bundle price'}</span>
              <span class="price-amount" style="color: var(--accent-primary); font-size: 2rem;">${escapeHtml(pkg.price)}</span>
            </div>
            <a href="#calculator" class="btn btn-primary" onclick="selectBundleInCalc('${pkg.id}')">
              <span>${bookLabel}</span>
              <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  // 7.5 Thermal Performance Gauge Comparison Widget
  function renderThermalWidget() {
    const container = document.getElementById('thermal-widget-mount');
    if (!container) return;

    const beforeLabel = currentLang === 'ro' ? 'ÎNAINTE DE INTERVENȚIE' : 'BEFORE SERVICING';
    const afterLabel = currentLang === 'ro' ? 'DUPĂ INTERVENȚIE' : 'AFTER SERVICING';
    const beforeStatus = currentLang === 'ro' ? 'Thermal Throttling Sever (-35% FPS)' : 'Severe Thermal Throttling (-35% FPS)';
    const afterStatus = currentLang === 'ro' ? 'Răcire Optimă & Boost Stabil 4.2GHz' : 'Optimal Cooling & Sustained 4.2GHz Boost';
    const deltaSub = currentLang === 'ro' ? 'SCĂDERE TEMPERATURĂ' : 'TEMPERATURE DROP';

    container.innerHTML = `
      <div class="thermal-widget">
        <div class="thermal-widget-content">
          <div class="thermal-widget-header">
            <span class="service-tag" style="background: var(--temp-cool-bg); color: var(--temp-cool); border-color: var(--temp-cool-border); margin-bottom: var(--space-2);">
              FurMark + Cinebench R23 Telemetry
            </span>
            <h3 class="thermal-widget-title">${currentLang === 'ro' ? 'Rezultate Măsurabile sub Sarcină Continuă' : 'Measurable Metrics Under Heavy Load'}</h3>
            <p class="thermal-widget-subtitle">${currentLang === 'ro' ? 'Test de stres 30 minute: Intel Core i7 / Ryzen 7 pe laptop de gaming' : '30-minute stress loop: Intel Core i7 / Ryzen 7 gaming laptop'}</p>
          </div>

          <div class="thermal-gauges-container">
            <!-- Before Gauge -->
            <div class="thermal-gauge is-before" aria-label="Temperatură înainte: 95 grade Celsius">
              <div class="gauge-top-row">
                <span class="gauge-pill">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  ${beforeLabel}
                </span>
                <span style="font-size: 0.7rem; color: var(--text-tertiary); font-family: var(--font-mono);">Fan: 5400 RPM</span>
              </div>

              <div class="gauge-temp-display">
                <span class="gauge-temp-val" id="temp-val-before">${thermalAnimatedOnce ? currentThermalBefore : 95}</span>
                <span class="gauge-temp-unit">°C</span>
              </div>

              <div class="gauge-meter" role="progressbar" aria-valuenow="${thermalAnimatedOnce ? currentThermalBefore : 95}" aria-valuemin="0" aria-valuemax="100">
                <div class="gauge-meter-fill" id="meter-fill-before" style="width: ${thermalAnimatedOnce ? currentThermalBefore : 95}%;"></div>
              </div>

              <div class="gauge-status-desc" style="color: var(--temp-hot);">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <span>${beforeStatus}</span>
              </div>
            </div>

            <!-- Delta Badge -->
            <div class="thermal-delta-badge-wrap">
              <div class="thermal-delta-badge" id="thermal-delta-badge" title="Diferență obținută">
                <svg class="delta-arrow-icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                <span class="delta-val" id="thermal-delta-val">${thermalAnimatedOnce ? `-${currentThermalBefore - currentThermalAfter}°C` : '-27°C'}</span>
                <span class="delta-label">${deltaSub}</span>
              </div>
            </div>

            <!-- After Gauge -->
            <div class="thermal-gauge is-after" aria-label="Temperatură după: 68 grade Celsius">
              <div class="gauge-top-row">
                <span class="gauge-pill">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  ${afterLabel}
                </span>
                <span style="font-size: 0.7rem; color: var(--text-tertiary); font-family: var(--font-mono);">Fan: 3100 RPM</span>
              </div>

              <div class="gauge-temp-display">
                <span class="gauge-temp-val" id="temp-val-after">${thermalAnimatedOnce ? currentThermalAfter : 68}</span>
                <span class="gauge-temp-unit">°C</span>
              </div>

              <div class="gauge-meter" role="progressbar" aria-valuenow="${thermalAnimatedOnce ? currentThermalAfter : 68}" aria-valuemin="0" aria-valuemax="100">
                <div class="gauge-meter-fill" id="meter-fill-after" style="width: ${thermalAnimatedOnce ? currentThermalAfter : 68}%;"></div>
              </div>

              <div class="gauge-status-desc" style="color: var(--temp-cool);">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span>${afterStatus}</span>
              </div>
            </div>
          </div>

          <!-- Telemetry Specs Row -->
          <div class="thermal-metrics-row">
            <div class="thermal-metric-item">
              <svg viewBox="0 0 24 24"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
              <div>
                <div class="thermal-metric-label">${currentLang === 'ro' ? 'Frecvență Procesor' : 'Sustained Clock'}</div>
                <div class="thermal-metric-value">4.2 GHz (Boost 100% Constant)</div>
              </div>
            </div>

            <div class="thermal-metric-item">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <div>
                <div class="thermal-metric-label">${currentLang === 'ro' ? 'Nivel Zgomot Ventilator' : 'Fan Acoustic Noise'}</div>
                <div class="thermal-metric-value">-14 dB (Mult mai silențios)</div>
              </div>
            </div>

            <div class="thermal-metric-item">
              <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              <div>
                <div class="thermal-metric-label">${currentLang === 'ro' ? 'Pastă Utilizată' : 'Compound Applied'}</div>
                <div class="thermal-metric-value">Arctic MX-6 / Noctua NT-H1</div>
              </div>
            </div>

            <div class="thermal-metric-item">
              <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <div>
                <div class="thermal-metric-label">${currentLang === 'ro' ? 'Testare la Predare' : 'Handover Test'}</div>
                <div class="thermal-metric-value">${currentLang === 'ro' ? 'Inclusă Gratuit pe Loc' : 'Live on-the-spot'}</div>
              </div>
            </div>
          </div>

          <!-- Interactive Quick-Preset Deck -->
          <div class="console-presets-deck">
            <div class="console-presets-title">
              <span>⚡</span>
              <span>${currentLang === 'ro' ? 'Pachete Rapide Recomandate:' : 'Quick Recommended Bundles:'}</span>
            </div>
            <div class="console-presets-grid">
              <div class="console-preset-card" onclick="selectBundleInCalc('pkg-office-refresh')">
                <div>
                  <div class="console-preset-name">Office Refresh</div>
                  <div class="console-preset-save">${currentLang === 'ro' ? 'Economisești 50 RON' : 'Save 50 RON'}</div>
                </div>
                <div class="console-preset-price">200 RON</div>
              </div>

              <div class="console-preset-card is-popular" onclick="selectBundleInCalc('pkg-thermal-pro-gamer')">
                <div>
                  <div class="console-preset-name">Thermal Gamer ★</div>
                  <div class="console-preset-save">${currentLang === 'ro' ? 'Economisești 20 RON' : 'Save 20 RON'}</div>
                </div>
                <div class="console-preset-price">190 RON</div>
              </div>

              <div class="console-preset-card" onclick="selectBundleInCalc('pkg-rebirth-total')">
                <div>
                  <div class="console-preset-name">Rebirth Total</div>
                  <div class="console-preset-save">${currentLang === 'ro' ? 'Economisești 80 RON' : 'Save 80 RON'}</div>
                </div>
                <div class="console-preset-price">280 RON</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Initialize IntersectionObserver for smooth telemetry gauge spring animation
    initThermalObserver();
  }

  // Kokonut UI / Anime.js Fluid Spring Eased Temperature Telemetry Animator
  let thermalAnimatedOnce = false;
  let currentThermalBefore = 95;
  let currentThermalAfter = 68;

  function animateThermalGauges(targetBefore = 95, targetAfter = 68, duration = 1200) {
    const valBeforeEl = document.getElementById('temp-val-before');
    const valAfterEl = document.getElementById('temp-val-after');
    const fillBeforeEl = document.getElementById('meter-fill-before');
    const fillAfterEl = document.getElementById('meter-fill-after');
    const deltaValEl = document.getElementById('thermal-delta-val');
    const deltaBadgeEl = document.getElementById('thermal-delta-badge');

    if (!valBeforeEl || !valAfterEl || !fillBeforeEl || !fillAfterEl) return;

    const startBefore = thermalAnimatedOnce ? currentThermalBefore : 35;
    const startAfter = thermalAnimatedOnce ? currentThermalAfter : 35;
    const targetDelta = -(targetBefore - targetAfter);
    const startDelta = -(startBefore - startAfter);
    const startTime = performance.now();

    // Trigger pop-spring pulse on delta badge
    if (deltaBadgeEl) {
      deltaBadgeEl.classList.remove('pulse-pop');
      void deltaBadgeEl.offsetWidth; // force browser layout recalculation
      deltaBadgeEl.classList.add('pulse-pop');
    }

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Fluid cubic-out spring easing curve
      const ease = 1 - Math.pow(1 - progress, 3);

      const curBefore = Math.round(startBefore + (targetBefore - startBefore) * ease);
      const curAfter = Math.round(startAfter + (targetAfter - startAfter) * ease);
      const curDelta = Math.round(startDelta + (targetDelta - startDelta) * ease);

      valBeforeEl.textContent = curBefore.toString();
      valAfterEl.textContent = curAfter.toString();
      if (deltaValEl) deltaValEl.textContent = `${curDelta}°C`;

      fillBeforeEl.style.width = `${curBefore}%`;
      fillAfterEl.style.width = `${curAfter}%`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        valBeforeEl.textContent = targetBefore.toString();
        valAfterEl.textContent = targetAfter.toString();
        fillBeforeEl.style.width = `${targetBefore}%`;
        fillAfterEl.style.width = `${targetAfter}%`;
        if (deltaValEl) deltaValEl.textContent = `${targetDelta}°C`;
        currentThermalBefore = targetBefore;
        currentThermalAfter = targetAfter;
      }
    }

    requestAnimationFrame(step);
  }

  function initThermalObserver() {
    const mountEl = document.getElementById('thermal-widget-mount') || document.getElementById('command-center');
    if (!mountEl) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !thermalAnimatedOnce) {
            thermalAnimatedOnce = true;
            animateThermalGauges(95, 68, 1200);
          }
        });
      }, { threshold: 0.25 });
      observer.observe(mountEl);
    } else {
      animateThermalGauges(95, 68, 1200);
    }
  }

  // 7.6 Work Showcase Gallery & Filtering
  let activeGalleryCategory = 'all';

  function renderGallery(categories, items) {
    const filtersContainer = document.getElementById('gallery-filters');
    const gridContainer = document.getElementById('gallery-grid');
    if (!filtersContainer || !gridContainer || !items) return;

    // Render filter buttons with dynamic item counts
    const filterSlugs = ['all', 'laptop-cleaning', 'thermal-paste', 'hardware-upgrades', 'windows-setup'];
    filtersContainer.innerHTML = categories.map((cat, idx) => {
      const slug = filterSlugs[idx] || 'all';
      const isActive = activeGalleryCategory === slug;
      const count = slug === 'all'
        ? items.length
        : items.filter(item => item.categorySlug === slug).length;

      return `
        <button type="button" class="filter-btn ${isActive ? 'active' : ''}" 
                data-filter="${slug}" 
                aria-pressed="${isActive ? 'true' : 'false'}">
          <span class="filter-label">${escapeHtml(cat)}</span>
          <span class="filter-count">${count}</span>
        </button>
      `;
    }).join('');

    // Filter items
    const filteredItems = activeGalleryCategory === 'all'
      ? items
      : items.filter(item => item.categorySlug === activeGalleryCategory);

    // Render grid
    gridContainer.innerHTML = filteredItems.map(item => {
      const iconSvg = SVG_HARDWARE_ICONS[item.categorySlug] || SVG_HARDWARE_ICONS['laptop-cleaning'];
      const clickDetailLabel = currentLang === 'ro' ? 'Apasă pentru fișa completă →' : 'Click for handover telemetry →';
      const beforeBadgeText = currentLang === 'ro' ? 'ÎNAINTE' : 'BEFORE';
      const afterBadgeText = currentLang === 'ro' ? 'DUPĂ' : 'AFTER';
      const pasteLabelText = currentLang === 'ro' ? 'Pastă:' : 'Compound:';
      const cardAriaLabel = currentLang === 'ro' ? `Vezi lucrarea ${escapeHtml(item.title)}` : `View project ${escapeHtml(item.title)}`;

      return `
        <article class="gallery-card" data-id="${item.id}" tabindex="0" role="button" aria-label="${cardAriaLabel}">
          <div class="gallery-image-wrap">
            <span class="badge-before-after badge-before">${beforeBadgeText} ${item.tempBefore}°C</span>
            <span class="badge-before-after badge-after">${afterBadgeText} ${item.tempAfter}°C</span>

            <!-- Image with graceful SVG fallback -->
            <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />

            <div class="gallery-placeholder" style="display: none;">
              ${iconSvg}
              <span class="placeholder-text">${escapeHtml(item.deviceModel)}</span>
              <span class="placeholder-subtext">${escapeHtml(item.compoundUsed)}</span>
            </div>

            <!-- Thermal Stat Overlay -->
            <div class="gallery-thermal-overlay">
              <span class="thermal-chip-before">${item.tempBefore}°C</span>
              <span class="thermal-chip-drop">-${item.thermalDrop}°C</span>
              <span class="thermal-chip-after">${item.tempAfter}°C</span>
            </div>
          </div>

          <div class="gallery-card-body">
            <span class="gallery-device-badge">${escapeHtml(item.deviceModel)}</span>
            <h4 class="gallery-card-title">${escapeHtml(item.title)}</h4>
            <p class="gallery-card-desc">${escapeHtml(item.clientIssue)}</p>

            <div class="gallery-card-meta">
              <span><strong>${pasteLabelText}</strong> ${escapeHtml(item.compoundUsed)}</span>
              <span style="color: var(--accent-primary);">${clickDetailLabel}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function initGalleryInteractions() {
    // Filter click handler
    document.addEventListener('click', e => {
      const filterBtn = e.target.closest('.filter-btn');
      if (filterBtn) {
        e.preventDefault();
        const slug = filterBtn.getAttribute('data-filter');
        if (slug) {
          activeGalleryCategory = slug;
          const langData = appData[currentLang] || appData.ro;
          renderGallery(langData.galleryCategories, langData.galleryItems);
        }
      }
    });

    // Gallery card click opens Lightbox Modal
    document.addEventListener('click', e => {
      const card = e.target.closest('.gallery-card');
      if (card) {
        e.preventDefault();
        const itemId = card.getAttribute('data-id');
        openGalleryLightbox(itemId);
      }
    });

    // Keyboard navigation (Enter or Space) on card
    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = document.activeElement?.closest('.gallery-card');
        if (card) {
          e.preventDefault();
          const itemId = card.getAttribute('data-id');
          openGalleryLightbox(itemId);
        }
      }
    });
  }

  // 7.7 Gallery Lightbox Modal
  function openGalleryLightbox(itemId) {
    const langData = appData[currentLang] || appData.ro;
    const item = langData.galleryItems.find(i => i.id === itemId);
    if (!item) return;

    let modal = document.getElementById('gallery-lightbox-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'gallery-lightbox-modal';
      modal.className = 'lightbox-modal';
      document.body.appendChild(modal);
    }

    const iconSvg = SVG_HARDWARE_ICONS[item.categorySlug] || SVG_HARDWARE_ICONS['laptop-cleaning'];
    const issueLabel = currentLang === 'ro' ? 'Problema Raportată:' : 'Client Issue:';
    const solutionLabel = currentLang === 'ro' ? 'Intervenția Realizată:' : 'Engineering Solution:';
    const resultLabel = currentLang === 'ro' ? 'Rezultat Măsurat:' : 'Verified Handover Result:';
    const bookThisLabel = currentLang === 'ro' ? 'Solicită o Intervenție Similară pe WhatsApp' : 'Book a Similar Overhaul via WhatsApp';

    const waMsg = currentLang === 'ro'
      ? `Bună Dragoș, am văzut lucrarea cu ${item.deviceModel} pe site și aș dori o intervenție similară de ${item.category} pentru PC-ul/laptopul meu.`
      : `Hello Dragoș, I saw your work on the ${item.deviceModel} on your portfolio and I would like a similar ${item.category} overhaul for my PC/laptop.`;

    const waUrl = `${appData.provider.whatsappUrl}?text=${encodeURIComponent(waMsg)}`;

    modal.innerHTML = `
      <div class="lightbox-overlay" data-close-lightbox="true"></div>
      <div class="lightbox-content" role="dialog" aria-modal="true" aria-labelledby="lightbox-item-title">
        <div class="lightbox-header">
          <div>
            <span class="service-tag" style="background: var(--bg-tertiary); color: var(--accent-primary); border-color: var(--border-accent); margin-bottom: 4px;">
              ${escapeHtml(item.category)} • ${escapeHtml(item.deviceModel)}
            </span>
            <h3 class="lightbox-title" id="lightbox-item-title">${escapeHtml(item.title)}</h3>
          </div>
          <button type="button" class="lightbox-close-btn" data-close-lightbox="true" aria-label="Închide fereastra">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div class="lightbox-media">
          <img src="${item.image}" alt="${escapeHtml(item.title)}" 
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="gallery-placeholder" style="display: none; padding: var(--space-8);">
            ${iconSvg}
            <span class="placeholder-text" style="font-size: var(--font-size-md);">${escapeHtml(item.deviceModel)}</span>
            <span class="placeholder-subtext">${escapeHtml(item.compoundUsed)} • -${item.thermalDrop}°C Drop</span>
          </div>
        </div>

        <div class="lightbox-footer">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3); margin-bottom: var(--space-4); padding-bottom: var(--space-3); border-bottom: 1px solid var(--border-subtle);">
            <div style="display: flex; align-items: center; gap: var(--space-3); font-family: var(--font-mono); font-size: var(--font-size-sm);">
              <span>${currentLang === 'ro' ? 'Înainte:' : 'Before:'} <strong style="color: var(--temp-hot);">${item.tempBefore}°C</strong></span>
              <span>→</span>
              <span>${currentLang === 'ro' ? 'După:' : 'After:'} <strong style="color: var(--temp-cool);">${item.tempAfter}°C</strong></span>
              <span class="thermal-chip-drop" style="font-size: 0.85rem;">-${item.thermalDrop}°C</span>
            </div>
            <div style="font-family: var(--font-mono); font-size: var(--font-size-xs); color: var(--text-secondary);">
              ${currentLang === 'ro' ? 'Pastă:' : 'Compound:'} <strong>${escapeHtml(item.compoundUsed)}</strong>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-5);">
            <div>
              <strong style="color: var(--text-primary); font-size: var(--font-size-xs); text-transform: uppercase; font-family: var(--font-mono);">${issueLabel}</strong>
              <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-top: 2px;">${escapeHtml(item.clientIssue)}</p>
            </div>
            <div>
              <strong style="color: var(--text-primary); font-size: var(--font-size-xs); text-transform: uppercase; font-family: var(--font-mono);">${solutionLabel}</strong>
              <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-top: 2px;">${escapeHtml(item.solution)}</p>
            </div>
            <div>
              <strong style="color: var(--accent-emerald); font-size: var(--font-size-xs); text-transform: uppercase; font-family: var(--font-mono);">${resultLabel}</strong>
              <p style="font-size: var(--font-size-sm); color: var(--text-primary); margin-top: 2px; font-weight: var(--font-medium);">${escapeHtml(item.result)}</p>
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: flex-end; gap: var(--space-3);">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp-quote">
              <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>${bookThisLabel}</span>
            </a>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeGalleryLightbox() {
    const modal = document.getElementById('gallery-lightbox-modal');
    if (modal) {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  function initLightboxListeners() {
    document.addEventListener('click', e => {
      if (e.target.closest('[data-close-lightbox="true"]')) {
        closeGalleryLightbox();
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeGalleryLightbox();
      }
    });
  }

  // 7.8 Guarantees Grid
  function renderGuarantees(guarantees) {
    const container = document.getElementById('guarantees-grid');
    if (!container || !guarantees) return;

    const icons = [
      `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
      `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
      `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
      `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`
    ];

    container.innerHTML = guarantees.map((g, idx) => `
      <div class="guarantee-card">
        <div class="guarantee-icon-wrap" aria-hidden="true">
          ${icons[idx] || icons[0]}
        </div>
        <div class="guarantee-content">
          <h4>${escapeHtml(g.title)}</h4>
          <p style="font-weight: 600; color: var(--accent-primary); margin-bottom: var(--space-1);">${escapeHtml(g.subtitle)}</p>
          <p>${escapeHtml(g.description)}</p>
        </div>
      </div>
    `).join('');
  }

  // 7.9 FAQ Accordion
  function renderFAQ(faqItems) {
    const container = document.getElementById('faq-container');
    if (!container || !faqItems) return;

    container.innerHTML = faqItems.map((item, idx) => `
      <details class="faq-card" ${idx === 0 ? 'open' : ''}>
        <summary class="faq-summary">
          <span>${escapeHtml(item.question)}</span>
          <svg class="faq-icon-arrow" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
        </summary>
        <div class="faq-answer">
          <p>${escapeHtml(item.answer)}</p>
        </div>
      </details>
    `).join('');
  }

  /* ============================================================================
     8. SMART CONFIGURATOR 2.0 & INTERACTIVE QUOTE ENGINE
     ============================================================================ */
  const CONFIGURATOR_SERVICES = [
    {
      id: 'win-clean',
      cat: 'software',
      icon: '🪟',
      title: { ro: 'Instalare & Configurare Windows', en: 'Windows Clean Install & Setup' },
      desc: { ro: 'Windows 10/11 optimizat, debloated, drivere oficiale la zi și activare.', en: 'Windows 10/11 optimized, debloated, official drivers and activation.' },
      price: 130,
      time: '1.5 - 2h',
      badge: { ro: 'Debloated & Rapid', en: 'Debloated & Fast' }
    },
    {
      id: 'office-pack',
      cat: 'software',
      icon: '📊',
      title: { ro: 'Suită Office & Utilitare Esențiale', en: 'Office Suite & Essential Utilities' },
      desc: { ro: 'Pachet birou/școală complet (Office, PDF, arhivator, browsere curate).', en: 'Complete office/school pack (Office, PDF, archiver, clean browsers).' },
      price: 60,
      time: '30 min',
      badge: { ro: 'Productivitate', en: 'Productivity' }
    },
    {
      id: 'custom-apps',
      cat: 'software',
      icon: '⚙️',
      title: { ro: 'Software Specializat & Setări Fine', en: 'Specialized Apps & Fine Tuning' },
      desc: { ro: 'Configurare IDE-uri, suite creative, optimizări gaming și profiluri sistem.', en: 'IDE setup, creative suites, gaming optimizations and system profiles.' },
      price: 70,
      time: '1h',
      badge: { ro: 'Personalizat', en: 'Customized' }
    },
    {
      id: 'virus-removal',
      cat: 'software',
      icon: '🛡️',
      title: { ro: 'Devirusare & Salubrizare Sistem', en: 'Virus Removal & Deep System Clean' },
      desc: { ro: 'Eliminare malware, adware, extensii nocive și curățare registri/fișiere temporare.', en: 'Malware, adware, harmful extensions removal, registry/cache scrub.' },
      price: 90,
      time: '1 - 2h',
      badge: { ro: 'Securitate', en: 'Security' }
    },
    {
      id: 'data-backup',
      cat: 'software',
      icon: '💾',
      title: { ro: 'Backup Securizat & Migrare Date', en: 'Secure Backup & Data Migration' },
      desc: { ro: 'Salvare documente, poze, date conturi și transfer pe noul SSD/dispozitiv.', en: 'Safe transfer of documents, photos, account data to new drive/machine.' },
      price: 80,
      time: '1 - 2h',
      badge: { ro: 'Date 100% Protejate', en: '100% Safe Data' }
    },
    {
      id: 'dust-clean',
      cat: 'hardware',
      icon: '💨',
      title: { ro: 'Curățare Detaliată Praf & Ventilatoare', en: 'Deep Dust & Fan Cleaning' },
      desc: { ro: 'Dezasamblare atentă, suflare presiune, degresare radiatoare și lubrifiere ventilatoare.', en: 'Careful disassembly, air blow, radiator degreasing, fan lubrication.' },
      price: 90,
      time: '1 - 1.5h',
      badge: { ro: 'Răcire Imediată', en: 'Instant Cooling' }
    },
    {
      id: 'thermal-paste',
      cat: 'hardware',
      icon: '🧪',
      title: { ro: 'Înlocuire Pastă Termică Arctic/Noctua', en: 'Thermal Paste Replacement (Arctic/Noctua)' },
      desc: { ro: 'Îndepărtare pastă uscată, aplicare Arctic MX-6 / Noctua NT-H2 și paduri VRM.', en: 'Old paste removal, uniform Arctic MX-6 / Noctua NT-H2 application, VRM pads.' },
      price: 120,
      time: '1 - 1.5h',
      badge: { ro: 'Delta -15°C..-25°C', en: 'Delta -15°C..-25°C' }
    },
    {
      id: 'hw-upgrade',
      cat: 'hardware',
      icon: '⚡',
      title: { ro: 'Montaj Componente & Upgrade Hardware', en: 'Hardware Component Assembly & Upgrade' },
      desc: { ro: 'Montaj profesional SSD NVMe/SATA, upgrade memorie RAM sau înlocuire placă Wi-Fi.', en: 'Professional NVMe/SATA SSD install, RAM upgrade or Wi-Fi card swap.' },
      price: 75,
      time: '45 min',
      badge: { ro: 'Viteză Sporită', en: 'High Speed' }
    },
    {
      id: 'bench-test',
      cat: 'hardware',
      icon: '📈',
      title: { ro: 'Testare Stabilitate & Cinebench Live', en: 'Stability Testing & Live Cinebench' },
      desc: { ro: 'Sesiune stres-test Cinebench & FurMark cu monitorizare senzori în timp real la predare.', en: 'Stress-test Cinebench & FurMark with real-time sensor logging at handover.' },
      price: 0,
      time: '30 min',
      badge: { ro: 'Gratuit / Bonus', en: 'Free / Bonus' }
    }
  ];

  const BUNDLE_DEFINITIONS = {
    office: {
      services: ['win-clean', 'office-pack', 'dust-clean', 'thermal-paste'],
      price: 200,
      save: 50,
      eta: '2 - 3 ore',
      guarantee: '30 - 60 zile',
      thermals: [88, 64, 900],
      name: { ro: 'Pachetul Office Refresh', en: 'Office Refresh Bundle' }
    },
    gamer: {
      services: ['dust-clean', 'thermal-paste', 'bench-test'],
      price: 190,
      save: 20,
      eta: '2 - 3 ore',
      guarantee: '60 - 90 zile',
      thermals: [95, 68, 900],
      name: { ro: 'Pachetul Thermal Pro Gamer', en: 'Thermal Pro Gamer Bundle' }
    },
    rebirth: {
      services: ['win-clean', 'office-pack', 'data-backup', 'dust-clean', 'thermal-paste', 'hw-upgrade', 'bench-test'],
      price: 280,
      save: 80,
      eta: '4 - 5 ore',
      guarantee: '90 zile',
      thermals: [98, 62, 1000],
      name: { ro: 'Pachetul Rebirth Total', en: 'Rebirth Total Bundle' }
    }
  };

  let activeConfigMode = 'bundles'; // 'bundles' | 'custom'
  let activeCustomCategory = 'all'; // 'all' | 'software' | 'hardware'
  let selectedBundleKey = 'gamer';  // 'office' | 'gamer' | 'rebirth' | null

  function initQuoteCalculator() {
    const form = document.getElementById('quote-calc-form');
    if (!form) return;

    // Mode Switcher buttons
    document.querySelectorAll('.config-mode-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const mode = btn.getAttribute('data-config-mode');
        switchConfigMode(mode);
      });
    });

    // Bundle cards selection
    document.querySelectorAll('.config-bundle-card').forEach(card => {
      const selectAction = () => {
        const key = card.getAttribute('data-bundle-key');
        selectConfigBundle(key);
      };
      card.addEventListener('click', selectAction);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectAction();
        }
      });
    });

    // Category pills filter in custom view
    document.querySelectorAll('.category-pill').forEach(pill => {
      pill.addEventListener('click', e => {
        e.preventDefault();
        const cat = pill.getAttribute('data-custom-cat') || 'all';
        activeCustomCategory = cat;

        document.querySelectorAll('.category-pill').forEach(p => {
          const isActive = p === pill;
          p.classList.toggle('active', isActive);
          p.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        renderConfigCustomTiles();
      });
    });

    // Clear / Reset selection button
    const clearBtn = document.getElementById('btn-clear-selection');
    if (clearBtn) {
      clearBtn.addEventListener('click', e => {
        e.preventDefault();
        clearCalculatorSelection();
      });
    }

    // Hidden form change listener
    form.addEventListener('change', () => {
      updateCalculatorTotal();
    });

    // Render initial custom tiles and setup initial state
    renderConfigCustomTiles();
    selectConfigBundle('gamer', false); // Initial default bundle
  }

  function switchConfigMode(mode) {
    if (mode !== 'bundles' && mode !== 'custom') return;
    activeConfigMode = mode;

    // Update switcher buttons
    const bundlesBtn = document.getElementById('mode-btn-bundles');
    const customBtn = document.getElementById('mode-btn-custom');
    if (bundlesBtn && customBtn) {
      bundlesBtn.classList.toggle('active', mode === 'bundles');
      bundlesBtn.setAttribute('aria-selected', mode === 'bundles' ? 'true' : 'false');
      customBtn.classList.toggle('active', mode === 'custom');
      customBtn.setAttribute('aria-selected', mode === 'custom' ? 'true' : 'false');
    }

    // Toggle views
    const bundlesView = document.getElementById('config-view-bundles');
    const customView = document.getElementById('config-view-custom');
    if (bundlesView && customView) {
      if (mode === 'bundles') {
        bundlesView.style.display = 'block';
        bundlesView.classList.add('active');
        customView.style.display = 'none';
        customView.classList.remove('active');
      } else {
        bundlesView.style.display = 'none';
        bundlesView.classList.remove('active');
        customView.style.display = 'block';
        customView.classList.add('active');
        renderConfigCustomTiles();
      }
    }
  }

  function selectConfigBundle(bundleKey, triggerThermals = true) {
    const bundle = BUNDLE_DEFINITIONS[bundleKey];
    if (!bundle) return;

    selectedBundleKey = bundleKey;

    // Reset all checkboxes and set bundle services
    const checkboxes = document.querySelectorAll('#quote-calc-form input[type="checkbox"]');
    checkboxes.forEach(cb => {
      cb.checked = bundle.services.includes(cb.value);
    });

    // Animate thermals if requested
    if (triggerThermals && bundle.thermals) {
      animateThermalGauges(bundle.thermals[0], bundle.thermals[1], bundle.thermals[2]);
    }

    // Sync bundle cards visual state
    syncBundleCardsVisual();

    // Re-render custom tiles and chips, calculate total
    renderConfigCustomTiles();
    updateCalculatorTotal();
  }

  function clearCalculatorSelection() {
    selectedBundleKey = null;
    const checkboxes = document.querySelectorAll('#quote-calc-form input[type="checkbox"]');
    checkboxes.forEach(cb => { cb.checked = false; });

    syncBundleCardsVisual();
    renderConfigCustomTiles();
    updateCalculatorTotal();
  }

  function syncBundleCardsVisual() {
    document.querySelectorAll('.config-bundle-card').forEach(card => {
      const key = card.getAttribute('data-bundle-key');
      const isSelected = key === selectedBundleKey;
      card.classList.toggle('is-selected', isSelected);
      card.setAttribute('aria-pressed', isSelected ? 'true' : 'false');

      const labelEl = card.querySelector('.select-label');
      if (labelEl) {
        labelEl.textContent = isSelected
          ? (currentLang === 'ro' ? 'Selectat' : 'Selected')
          : (currentLang === 'ro' ? 'Alege Pachet' : 'Choose Bundle');
      }
    });
  }

  function renderConfigCustomTiles() {
    const container = document.getElementById('config-custom-grid');
    if (!container) return;

    const filtered = CONFIGURATOR_SERVICES.filter(s => {
      if (activeCustomCategory === 'all') return true;
      return s.cat === activeCustomCategory;
    });

    container.innerHTML = filtered.map(s => {
      const isChecked = !!document.querySelector(`#quote-calc-form input[value="${s.id}"]:checked`);
      const title = s.title[currentLang] || s.title.ro;
      const desc = s.desc[currentLang] || s.desc.ro;
      const badge = s.badge[currentLang] || s.badge.ro;
      const priceText = s.price > 0 ? `${s.price} RON` : (currentLang === 'ro' ? 'GRATUIT' : 'FREE');

      return `
        <div class="custom-service-tile ${isChecked ? 'is-active' : ''}" data-service-id="${s.id}" role="checkbox" aria-checked="${isChecked}" tabindex="0">
          <div class="tile-checkbox" aria-hidden="true">
            <svg class="tile-check-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <div class="tile-icon-badge" aria-hidden="true">${s.icon}</div>
          <div class="tile-body">
            <div class="tile-title-row">
              <span class="tile-title">${escapeHtml(title)}</span>
              <span class="tile-price">${priceText}</span>
            </div>
            <p class="tile-desc">${escapeHtml(desc)}</p>
            <div class="tile-meta-row">
              <span class="tile-eta">⏱️ ${s.time}</span>
              <span class="bundle-tag">${escapeHtml(badge)}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click and keyboard handlers
    container.querySelectorAll('.custom-service-tile').forEach(tile => {
      const srvId = tile.getAttribute('data-service-id');
      const toggle = () => {
        const input = document.querySelector(`#quote-calc-form input[value="${srvId}"]`);
        if (input) {
          input.checked = !input.checked;
          tile.classList.toggle('is-active', input.checked);
          tile.setAttribute('aria-checked', input.checked ? 'true' : 'false');
          evaluateActiveBundleMatch();
          updateCalculatorTotal();
        }
      };

      tile.addEventListener('click', toggle);
      tile.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  function evaluateActiveBundleMatch() {
    const checkedIds = Array.from(document.querySelectorAll('#quote-calc-form input[type="checkbox"]:checked')).map(i => i.value);
    
    let matched = null;
    for (const [key, bDef] of Object.entries(BUNDLE_DEFINITIONS)) {
      if (bDef.services.length === checkedIds.length && bDef.services.every(s => checkedIds.includes(s))) {
        matched = key;
        break;
      }
    }

    selectedBundleKey = matched;
    syncBundleCardsVisual();
  }

  function renderSelectedChips(selectedItems) {
    const container = document.getElementById('config-chips-container');
    if (!container) return;

    if (selectedItems.length === 0) {
      container.innerHTML = `
        <span class="config-chips-empty">
          ${currentLang === 'ro' ? 'ℹ️ Niciun serviciu selectat. Alege un pachet mai sus sau adaugă servicii la bucată.' : 'ℹ️ No services selected. Choose a recommended bundle above or add custom services.'}
        </span>
      `;
      return;
    }

    container.innerHTML = selectedItems.map(item => `
      <span class="config-chip" data-chip-id="${item.id}">
        <span>${item.icon}</span>
        <span>${escapeHtml(item.name)}</span>
        <span class="chip-remove" data-service-id="${item.id}" role="button" aria-label="Elimină ${escapeHtml(item.name)}" tabindex="0" title="Elimină">&times;</span>
      </span>
    `).join('');

    // Attach click and keydown to remove buttons
    container.querySelectorAll('.chip-remove').forEach(rmBtn => {
      const srvId = rmBtn.getAttribute('data-service-id');
      const handleRemove = (e) => {
        e.stopPropagation();
        const input = document.querySelector(`#quote-calc-form input[value="${srvId}"]`);
        if (input) {
          input.checked = false;
          evaluateActiveBundleMatch();
          renderConfigCustomTiles();
          updateCalculatorTotal();
        }
      };

      rmBtn.addEventListener('click', handleRemove);
      rmBtn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleRemove(e);
        }
      });
    });
  }

  // Exposed helper to select service from cards
  window.selectServiceInCalc = function (serviceId) {
    const idMap = {
      'win-install': 'win-clean',
      'office-utility-pack': 'office-pack',
      'custom-software': 'custom-apps',
      'diagnostic-virus-removal': 'virus-removal',
      'backup-data-migration': 'data-backup',
      'dust-cleaning': 'dust-clean',
      'thermal-paste-replacement': 'thermal-paste',
      'hardware-upgrades': 'hw-upgrade',
      'thermal-bench-testing': 'bench-test'
    };

    const targetKey = idMap[serviceId] || serviceId;
    const input = document.querySelector(`#quote-calc-form input[value="${targetKey}"]`);
    if (input) {
      input.checked = true;
      switchConfigMode('custom');
      evaluateActiveBundleMatch();
      renderConfigCustomTiles();
      updateCalculatorTotal();

      const targetEl = document.getElementById('command-center') || document.getElementById('calculator');
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Exposed helper to select bundle from package cards
  window.selectBundleInCalc = function (bundleId) {
    let key = 'gamer';
    if (bundleId === 'pkg-office-refresh' || bundleId === 'office') key = 'office';
    else if (bundleId === 'pkg-thermal-pro-gamer' || bundleId === 'gamer') key = 'gamer';
    else if (bundleId === 'pkg-rebirth-total' || bundleId === 'rebirth') key = 'rebirth';

    switchConfigMode('bundles');
    selectConfigBundle(key, true);

    const targetEl = document.getElementById('command-center') || document.getElementById('calculator');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Kokonut UI / Anime.js / Motion Dev Spring-Eased Numeric Counter
  let currentAnimatedTotal = 0;
  function animateTotalCounter(targetValue) {
    const totalEl = document.getElementById('calc-total-amount');
    if (!totalEl) return;
    const startValue = currentAnimatedTotal;
    if (startValue === targetValue) {
      totalEl.textContent = targetValue.toString();
      return;
    }
    const duration = 340; // ms
    const startTime = performance.now();

    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Fluid spring cubic ease-out curve
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(startValue + (targetValue - startValue) * ease);
      totalEl.textContent = value.toString();
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        totalEl.textContent = targetValue.toString();
        currentAnimatedTotal = targetValue;
      }
    }
    requestAnimationFrame(frame);
  }

  function updateCalculatorTotal() {
    const checkedInputs = Array.from(document.querySelectorAll('#quote-calc-form input[type="checkbox"]:checked'));
    let totalRon = 0;
    const selectedItems = [];

    checkedInputs.forEach(input => {
      const key = input.value;
      const srvDef = CONFIGURATOR_SERVICES.find(s => s.id === key);
      const price = srvDef ? srvDef.price : (CALC_SERVICE_PRICES[key] || 0);
      totalRon += price;

      const name = srvDef ? (srvDef.title[currentLang] || srvDef.title.ro) : key;
      const icon = srvDef ? srvDef.icon : '🔧';
      selectedItems.push({ id: key, name, price, icon });
    });

    // Render interactive chips in the summary dock
    renderSelectedChips(selectedItems);

    let finalSum = totalRon;
    let discountRon = 0;
    let savingsMessage = '';
    let bundleName = '';
    let timeEstimate = '1 - 2 ore';
    let guaranteeEstimate = '30 zile';

    const count = checkedInputs.length;
    const has = (key) => checkedInputs.some(i => i.value === key);

    // If explicit bundle selected or matches bundle structure
    if (selectedBundleKey && BUNDLE_DEFINITIONS[selectedBundleKey]) {
      const bDef = BUNDLE_DEFINITIONS[selectedBundleKey];
      finalSum = bDef.price;
      discountRon = Math.max(0, totalRon - finalSum);
      bundleName = bDef.name[currentLang] || bDef.name.ro;
      savingsMessage = currentLang === 'ro'
        ? `★ ${bundleName}: ${finalSum} RON (Economisești ${bDef.save} RON față de tarifele separate)!`
        : `★ ${bundleName}: ${finalSum} RON (You save ${bDef.save} RON compared to standalone rates)!`;
      timeEstimate = bDef.eta;
      guaranteeEstimate = bDef.guarantee;
    } else {
      // Dynamic rules for custom combinations
      const isRebirth = count >= 6 && has('win-clean') && has('dust-clean') && has('thermal-paste') && has('hw-upgrade');
      const isOffice = !isRebirth && has('win-clean') && has('office-pack') && has('dust-clean') && has('thermal-paste') && count <= 5;
      const isGamer = !isRebirth && !isOffice && has('dust-clean') && has('thermal-paste') && (has('bench-test') || count <= 4);

      if (isRebirth) {
        finalSum = Math.min(totalRon, 280);
        discountRon = Math.max(0, totalRon - finalSum);
        bundleName = currentLang === 'ro' ? 'Pachetul Rebirth Total' : 'Rebirth Total Bundle';
        savingsMessage = currentLang === 'ro'
          ? `★ ${bundleName}: ${finalSum} RON (Economisești ${discountRon > 0 ? discountRon : 80} RON)!`
          : `★ ${bundleName}: ${finalSum} RON (You save ${discountRon > 0 ? discountRon : 80} RON)!`;
        timeEstimate = '4 - 5 ore';
        guaranteeEstimate = '90 zile';
      } else if (isOffice) {
        finalSum = Math.min(totalRon, 200);
        discountRon = Math.max(0, totalRon - finalSum);
        bundleName = currentLang === 'ro' ? 'Pachetul Office Refresh' : 'Office Refresh Bundle';
        savingsMessage = currentLang === 'ro'
          ? `★ ${bundleName}: ${finalSum} RON (Economisești ${discountRon > 0 ? discountRon : 50} RON)!`
          : `★ ${bundleName}: ${finalSum} RON (You save ${discountRon > 0 ? discountRon : 50} RON)!`;
        timeEstimate = '2 - 3 ore';
        guaranteeEstimate = '30 - 60 zile';
      } else if (isGamer) {
        discountRon = 20;
        finalSum = Math.max(0, totalRon - discountRon);
        bundleName = currentLang === 'ro' ? 'Pachetul Thermal Pro Gamer' : 'Thermal Pro Gamer Bundle';
        savingsMessage = currentLang === 'ro'
          ? `★ ${bundleName}: ${finalSum} RON (Economisești ${discountRon} RON + test Cinebench live inclus)!`
          : `★ ${bundleName}: ${finalSum} RON (You save ${discountRon} RON + live Cinebench test included)!`;
        timeEstimate = '2 - 3 ore';
        guaranteeEstimate = '60 - 90 zile';
      } else if (totalRon >= 350) {
        discountRon = 70;
        finalSum = Math.max(0, totalRon - discountRon);
        bundleName = currentLang === 'ro' ? 'Reducere Pachet Complet' : 'Full Overhaul Bundle Discount';
        savingsMessage = currentLang === 'ro'
          ? '★ Economisești 70 RON (Reducere Pachet Complet aplicată automat)!'
          : '★ You save 70 RON (Full Overhaul Bundle Discount applied automatically)!';
        timeEstimate = '4 - 5 ore';
        guaranteeEstimate = '90 zile';
      } else if (totalRon >= 250) {
        discountRon = 50;
        finalSum = Math.max(0, totalRon - discountRon);
        bundleName = currentLang === 'ro' ? 'Reducere Pachet Combinat' : 'Combo Package Discount';
        savingsMessage = currentLang === 'ro'
          ? '★ Economisești 50 RON (Reducere Pachet Combinat aplicată automat)!'
          : '★ You save 50 RON (Combo Package Discount applied automatically)!';
        timeEstimate = '3 - 4 ore';
        guaranteeEstimate = '60 zile';
      } else if (count >= 3) {
        discountRon = 30;
        finalSum = Math.max(0, totalRon - discountRon);
        bundleName = currentLang === 'ro' ? 'Bonus Servicii Multiple' : 'Multi-Service Bonus';
        savingsMessage = currentLang === 'ro'
          ? '★ Economisești 30 RON (Bonus pentru 3+ servicii selectate)!'
          : '★ You save 30 RON (Bonus for 3+ selected services)!';
        timeEstimate = '2 - 3 ore';
        guaranteeEstimate = '30 - 60 zile';
      } else {
        finalSum = totalRon;
        discountRon = 0;
        if (count === 0) {
          timeEstimate = currentLang === 'ro' ? 'Selectează servicii' : 'Select services';
          guaranteeEstimate = '—';
        } else if (count === 1) {
          timeEstimate = '1 - 1.5 ore';
          guaranteeEstimate = has('thermal-paste') ? '60 zile' : '30 zile';
        } else {
          timeEstimate = '1.5 - 2 ore';
          guaranteeEstimate = has('thermal-paste') ? '60 zile' : '30 zile';
        }
      }
    }

    // Update time and guarantee metadata displays
    const timeEl = document.getElementById('calc-time-estimate');
    if (timeEl) timeEl.textContent = timeEstimate;

    const guarEl = document.getElementById('calc-guarantee-estimate');
    if (guarEl) guarEl.textContent = guaranteeEstimate;

    // Update animated total amount
    animateTotalCounter(finalSum);

    // Update savings pill
    const savingsEl = document.getElementById('calc-savings-alert');
    if (savingsEl) {
      if (savingsMessage && discountRon > 0) {
        savingsEl.textContent = savingsMessage;
        savingsEl.style.display = 'inline-flex';
      } else {
        savingsEl.textContent = '';
        savingsEl.style.display = 'none';
      }
    }

    // Build prefilled WhatsApp message
    buildWhatsAppQuoteUrl(selectedItems, totalRon, discountRon, finalSum, bundleName, timeEstimate, guaranteeEstimate);
  }

  function buildWhatsAppQuoteUrl(selectedItems, rawSum, discount, finalSum, bundleName, eta, guarantee) {
    const waBtn = document.getElementById('calc-whatsapp-btn');
    if (!waBtn) return;

    let text = '';
    if (currentLang === 'ro') {
      text = `Bună Dragoș,\n\nAș dori o programare în Cluj-Napoca pentru echipamentul meu. Am configurat următoarele pe site:\n\n`;
      if (selectedItems.length > 0) {
        selectedItems.forEach(item => {
          text += `• ${item.icon} ${item.name} (${item.price > 0 ? item.price + ' RON' : 'Gratuit'})\n`;
        });
        if (discount > 0 || bundleName) {
          text += `\nReducere aplicată: ${bundleName ? bundleName + ' ' : ''}(-${discount > 0 ? discount : 0} RON)\n`;
        }
        text += `\nTotal estimat: ${finalSum} RON`;
        if (eta && eta !== '—') text += `\n⏱️ Timp estimat intervenție: ${eta}`;
        if (guarantee && guarantee !== '—') text += `\n🛡️ Garanție oferită: ${guarantee}\n`;
      } else {
        text += `Aș dori o evaluare / diagnosticare pentru laptopul / PC-ul meu.\n`;
      }
      text += `\nCând am putea stabili o întâlnire de predare în Cluj-Napoca? Mulțumesc!`;
    } else {
      text = `Hello Dragoș,\n\nI would like to book a service appointment in Cluj-Napoca for my machine. I configured the following options:\n\n`;
      if (selectedItems.length > 0) {
        selectedItems.forEach(item => {
          text += `• ${item.icon} ${item.name} (${item.price > 0 ? item.price + ' RON' : 'Free'})\n`;
        });
        if (discount > 0 || bundleName) {
          text += `\nDiscount applied: ${bundleName ? bundleName + ' ' : ''}(-${discount > 0 ? discount : 0} RON)\n`;
        }
        text += `\nEstimated total: ${finalSum} RON`;
        if (eta && eta !== '—') text += `\n⏱️ Estimated turnaround: ${eta}`;
        if (guarantee && guarantee !== '—') text += `\n🛡️ Guarantee included: ${guarantee}\n`;
      } else {
        text += `I would like a diagnostic assessment for my laptop / PC.\n`;
      }
      text += `\nWhen could we schedule a handover in Cluj-Napoca? Thank you!`;
    }

    const waUrl = `${appData.provider.whatsappUrl}?text=${encodeURIComponent(text)}`;
    waBtn.setAttribute('href', waUrl);
  }

  /* ============================================================================
     9. DATA INITIALIZATION & OPTIONAL FETCH
     ============================================================================ */
  async function loadData() {
    // Attempt fetch from data/services.json (useful if served via HTTP server)
    try {
      const response = await fetch('data/services.json');
      if (response.ok) {
        const json = await response.json();
        if (json && json.ro && json.en) {
          appData = json;
        }
      }
    } catch (e) {
      // Fallback is already loaded synchronously, guaranteed zero failure on file:///
      // Silently proceed with SERVICES_DATA_FALLBACK
    }
  }

  /* ============================================================================
     10. ESCAPE HTML HELPER
     ============================================================================ */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ============================================================================
     11. ENTRYPOINT / DOM READY
     ============================================================================ */
  document.addEventListener('DOMContentLoaded', async () => {
    // 1. Synchronize Dark/Light Theme
    initTheme();

    // 2. Initialize Mobile Drawer Navigation
    initMobileNav();

    // 3. Initialize Interactive Category Tabs
    initCategoryTabs();

    // 4. Determine Language Preference
    currentLang = getPreferredLanguage();

    // 5. Load External Data if available, or proceed immediately with in-memory fallback
    await loadData();

    // 6. Setup Language Toggle Buttons
    initLanguageToggle();

    // 7. Setup Gallery Interactions and Lightbox
    initGalleryInteractions();
    initLightboxListeners();

    // 8. Setup Quote Calculator
    initQuoteCalculator();

    // 9. Render All Content in selected language
    setLanguage(currentLang);
  });

})();
