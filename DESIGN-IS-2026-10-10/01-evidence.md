# 01: Evidence (consolidated from 4 subagent sweeps)

## Structural

- Render order (App.jsx:14-31): Navbar, Hero, ExperienceBar marquee, About, Projects, Resume, Contact(+footer), ScrollToTop, KeyboardShortcuts, scanline overlay div.
- **71 interactive elements** at steady state; **30 are traffic-light buttons** on 10 TerminalWindow instances (TerminalWindow.jsx:29-46; Hero 1, About 1, Projects 6, Resume 1, Contact 1).
- Max component nesting: 5 (App → Projects → ProjectCard → TerminalWindow → Highlight).
- **9 repeated-pattern affordances**: resume download ×3 (+1 scroll CTA), socials ×3 rows, view-source ×2, scroll-to-top ×3 mechanisms, section nav ×6 mechanisms, availability pill ×2, skills list ×3 renders, headline stats in 4 places, double click-handler per project card.
- ESLint clean (0/0), but cross-file dead code: **3 unrendered sections** (Stats.jsx, Achievements.jsx, CollegeHighlights.jsx), 2 orphan data files, dead `color` field on all 6 projects, unused SITE.email.
- Data: 6 projects (3 featured, 3 with GitHub links, **0 live links**), 4 experience entries, 31 skill badges, 3 socials.

## Visual (all INFERRED from source; no dev server run)

- Single font: JetBrains Mono 400/500/600/700 via Google Fonts (index.html:18). Type scale [12,14,16,18,20,24,30]px, text-xs/sm dominate (72 of 79 uses).
- Spacing scale coherent, py-20 section rhythm; 2 negative margins; a handful of arbitrary values.
- **12 color tokens**, GitHub-Dark palette (index.css:3-17). Green #3fb950 dominant (64 uses), cyan secondary. Orphans: token-derived rgba glows ×7, one cyan text-shadow, tooltip 10px font.
- Contrast: body text excellent (16.0:1 / 14.6:1). **FAILS**: text-muted on titlebar 4.08:1 (every window title, TerminalWindow.jsx:48, lightbox header Projects.jsx:207, tooltips); footer text-muted/60 = 2.59:1, /40 = 1.79:1, accent-yellow/60 = 3.40:1 (Contact.jsx:112-115).
- States: loading MISSING, error PARTIAL (headshot fallback only; CopyButton has no clipboard try/catch), success 1 (copied!), **focus MISSING sitewide** (zero focus:/focus-visible: classes; hero input uses caret-transparent + outline-none, Hero.jsx:241), disabled N/A-but-absent. Hover styles extensive, keyboard equivalents absent.
- Theme: **dark only, hardcoded**; no prefers-color-scheme, no toggle, no meta color-scheme.
- Motion: ~18 distinct animations. Reduced-motion respected in only 4 places (marquee CSS index.css:182, proof ticker Hero.jsx:103, ExperienceBar.jsx:19, SectionHeader.jsx:4-6). No useReducedMotion/MotionConfig anywhere; cursor-blink, pulse dots, chevron bounce, count-ups, smooth-scroll ungated.

## Copy & honesty

- Hero: "Building intelligent systems — from edge devices to the cloud." + "Open to Summer 2027 internships" pill + rotating proof ticker ($500K/yr, 2,500+ devices, 88% latency, Nova 111).
- Claims are quantified and consistent; **no dark patterns; zero broken links** (all GitHub/LinkedIn URLs HTTP 200, resume.pdf exists 93KB, all 13 images/videos on disk).
- Minor honesty dings: "$ cat resume.txt" scrolls to a section and downloads nothing (Hero.jsx:319); "$ open live-demo.mp4" styled like the real links but is a non-link span (Projects.jsx:145-149); "beyond the course baseline" and "team software lead" unbacked (projects.js:35,117); unrendered Stats.jsx claims internships:3 vs 1 rendered; unrendered achievements.js strengthens "32% projected" to "32% risk".
- Jargon risk for non-technical recruiters: `$ open --github`, `$ cat resume.txt`, `^C` scroll-to-top, `$ menu`, "Info Internetworks".
- **Proof gap: the 3 flagship projects (Whisper engine, Pipelined CPU, RatonPerez) have github:null, live:null** (projects.js:7-8,37-38,66-67); strongest claims, least verifiable.

## Weight & friction

- Single JS bundle: 372KB raw / **116KB gzip transferred** (no code splitting). CSS 7KB gzip. Fonts ~125KB (4 woff2 est.). **headshot.png 360KB loads eagerly, no loading="lazy"** (About.jsx:85-90), below the fold. First load ≈ 9 requests / ~625KB.
- Zero runtime fetches, zero analytics, zero unprompted modals.
- TTI estimate: ~1.8-2.5s mid-tier mobile, ~0.4-0.7s desktop (byte math, not traced).
- **Idle animations: 6 perpetual in hero viewport** (chevron bounce, pulse dot, 3s ticker, 3 cursor-blinks) + marquee + a perpetual 60fps rAF loop doing getBoundingClientRect per chip (ExperienceBar.jsx:37-39).
- Hosting: GitHub Pages + Fastly, gzip only (no brotli), cache-control max-age=600 even on hashed assets, no security headers.

## Evidence conflicts

- ExperienceBar rAF loop: visual sweep says reduced-motion-guarded at ExperienceBar.jsx:19; weight sweep says unguarded at :37-39. Verify live; treated as guarded for scoring (specific guard citation wins).
