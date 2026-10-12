# 03: Verdict

**REDESIGN** (presentation layer only). Total 15/30 falls below the 20-point refine threshold, and the failures are systemic rather than one ugly screen: the terminal chrome is duplicated across every section (#10: 1/3, #5: 1/3), the labels speak command jargon to a primary audience of recruiters (#4: 1/3), and interaction states, contrast, and motion gating are missing sitewide (#8: 1/3). The content, copy honesty, and color/type system are strong and must be preserved.

Not sunk-cost REFINE: the issues live in the presentation pattern itself (10 window chromes, command-syntax interface), so restyling inside the current structure cannot fix #4/#5/#10.

## Highest-leverage moves

1. **#10 as little design as possible: one terminal, not ten.** Keep the hero's interactive terminal as the centerpiece; render About/Projects/Resume/Contact as calm flat panels on the same palette. Evidence: 30 of 71 interactive elements are traffic-light chrome (TerminalWindow.jsx:29-46, instances across App.jsx:16-30).
2. **#2/#6 proof: add code, writeup, or demo links to the 3 flagship projects.** Whisper engine, Pipelined CPU, and RatonPerez carry the biggest claims (88%, 4.5-4.8x, top 20) and are the only projects with github:null, live:null (projects.js:7-8, 37-38, 66-67).
3. **#4 understandable: plain language as the interface, terminal syntax as garnish.** "View projects" not "$ open projects/" (Hero.jsx:313); "Download resume (PDF)" not "$ cat resume.txt", which scrolls and downloads nothing (Hero.jsx:319); real link or no link-styling for "$ open live-demo.mp4" (Projects.jsx:145-149).
4. **#8 thorough: a states-and-details pass.** Add focus-visible styles sitewide (zero exist), fix 3 contrast failures (titlebar muted 4.08:1 TerminalWindow.jsx:48; footer /60 2.59:1 and /40 1.79:1 Contact.jsx:112-115), wrap the app in MotionConfig reducedMotion="user", lazy-load the 360KB headshot (About.jsx:85-90).
5. **#5/#7 calm the idle screen.** At most one perpetual animation in view (currently 6 in the hero: Hero.jsx:104,251,278,327 + Navbar.jsx:44,83); drop the CRT scanline overlay (index.css:98-113); replace the 60fps rAF chip effect (ExperienceBar.jsx:18-41) with CSS.
