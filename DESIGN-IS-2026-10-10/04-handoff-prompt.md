# 04: Handoff prompt

Copy-paste the block below into a session opened in `~/Desktop/Portfolio`.

````
/make-plan Redesign the presentation layer of jaimejralonso.dev (source: ~/Desktop/Portfolio, React 19 + Vite + Tailwind 4 + framer-motion). Current design failed a Dieter Rams audit at 15/30 with critical gaps in principles #4 (understandable), #5 (unobtrusive), #7 (long-lasting), #8 (thorough), #10 (as little design as possible).

Verdict paragraph (quoted from the audit):
> REDESIGN (presentation layer only). Total 15/30 falls below the 20-point refine threshold, and the failures are systemic rather than one ugly screen: the terminal chrome is duplicated across every section, the labels speak command jargon to a primary audience of recruiters, and interaction states, contrast, and motion gating are missing sitewide. The content, copy honesty, and color/type system are strong and must be preserved.

Why redesign and not refine: the failures live in the presentation pattern itself (10 terminal-window chromes and command-syntax labels as the primary interface), so restyling inside the current structure cannot fix #4/#5/#10.

Preserve from current design:
- The 12-token GitHub-Dark palette and JetBrains Mono (src/index.css:3-17, index.html:18)
- The hero interactive terminal: working commands, typed intro with sessionStorage skip, rotating proof ticker (src/sections/Hero.jsx:9-38, 50-55, 74-88)
- All content and data verbatim: quantified claims and verified links in src/data/projects.js, src/data/resume.js, src/data/socialLinks.js, About bio
- Keyboard shortcuts feature (src/components/layout/KeyboardShortcuts.jsx)

Discard:
- Per-section TerminalWindow wrapping: 10 instances, 30 decorative traffic-light buttons. Evidence: src/components/ui/TerminalWindow.jsx:29-46 used across App.jsx:16-30. Caused failure on #10 and #5.
- Command syntax as primary labels ("$ open projects/", "$ cat resume.txt", "$ open --github", "^C", "$ menu"). Evidence: Hero.jsx:313,319; Projects.jsx:131; ScrollToTop.jsx:24; Navbar.jsx:106. Caused failure on #4.
- CRT scanline overlay, 60fps rAF marquee effect, stacked idle animations (6 perpetual in hero viewport). Evidence: index.css:98-113; ExperienceBar.jsx:18-41; Hero.jsx:104,251,278,327; Navbar.jsx:44,83. Caused failure on #5 and #7.
- Dead code shipping in the tree: unrendered Stats.jsx / Achievements.jsx / CollegeHighlights.jsx (Stats claims internships:3, contradicting the rendered resume's 1), dead `color` field on all 6 projects, unused SITE.email. Evidence: App.jsx:12-33 vs src/sections/; projects.js:18,47,76,99,130,148. Caused failure on #8.

Top 5 moves from the audit (verbatim):
1. #10 as little design as possible: one terminal, not ten. Keep the hero's interactive terminal as the centerpiece; render About/Projects/Resume/Contact as calm flat panels on the same palette. Evidence: 30 of 71 interactive elements are traffic-light chrome (TerminalWindow.jsx:29-46, App.jsx:16-30).
2. #2/#6 proof: add code, writeup, or demo links to the 3 flagship projects (Whisper engine, Pipelined CPU, RatonPerez). They carry the biggest claims (88%, 4.5-4.8x, top 20) and have github:null, live:null (projects.js:7-8, 37-38, 66-67). Per-project case-study pages (problem, constraint, approach, before/after numbers, demo video) are acceptable where code cannot be public.
3. #4 understandable: plain language as the interface, terminal syntax as garnish. "View projects" not "$ open projects/" (Hero.jsx:313); "Download resume (PDF)" not "$ cat resume.txt" which scrolls and downloads nothing (Hero.jsx:319); make "$ open live-demo.mp4" a real link or stop styling it as one (Projects.jsx:145-149).
4. #8 thorough: states-and-details pass. Focus-visible styles sitewide (zero exist today); fix 3 contrast failures (text-muted on titlebar 4.08:1 at TerminalWindow.jsx:48; footer text-muted/60 2.59:1 and /40 1.79:1 at Contact.jsx:112-115); MotionConfig reducedMotion="user" at the app root; loading="lazy" on the 360KB headshot (About.jsx:85-90).
5. #5/#7 calm the idle screen: at most one perpetual animation in view; drop the scanline overlay (index.css:98-113); replace the rAF chip effect (ExperienceBar.jsx:18-41) with CSS.

Redesign principles in priority order:
1. #10 as little design as possible: every element earns its place; the one terminal is the signature, everything else recedes.
2. #4 understandable: a non-technical recruiter names every control correctly on first visit.
3. #8 thorough: focus, contrast, reduced-motion, lazy-loading all pass; no dead code ships.

Deliverables for the plan:
- New information architecture (section map; decide fate of Stats/Achievements/CollegeHighlights: ship or delete)
- New primary flow (low-fi, labeled, side-by-side with current)
- States checklist (empty, loading, error, success, focus, disabled)
- Migration path (incremental per-section, behind nothing; this is a static personal site)
- Cutover criteria (old chrome fully removed, Lighthouse a11y pass, contrast table all >= 4.5:1)

Anti-patterns to guard against:
- Porting old structure under new styling (keeping 10 window chromes but hiding the buttons)
- Keeping both designs behind a flag indefinitely
- Redesigning to follow a trend rather than the principles above
- Touching the copy/data content, which scored well and must survive verbatim
````
