# 02: Scorecard (0-3 per principle, total /30)

1. Good design is innovative: Score 2/3
   Evidence: Interactive hero terminal with working commands + session-skip (Hero.jsx:9-38,74-88); terminal portfolios are an established genre.
   Justification: A clear refresh of an existing pattern (working input, proof ticker, keyboard nav), but the genre exists in well over 5 peer products, so not a 3.

2. Good design is useful: Score 2/3
   Evidence: Resume reachable in 1 click ×3 placements, all links verified 200; but 30 decorative traffic-light buttons and a fake link span (Projects.jsx:145-149).
   Justification: The primary task completes fast, but decoy interactive chrome keeps it from "no decoy actions".

3. Good design is aesthetic: Score 2/3
   Evidence: One font, 12 tokens, py-20 rhythm (01-evidence Visual); orphans limited to token-derived rgba glows and a 10px tooltip font.
   Justification: A single visible system with roughly two real inconsistencies, short of "no orphan styles".

4. Good design is understandable: Score 1/3
   Evidence: `$ cat resume.txt` scrolls instead of downloading (Hero.jsx:319), `$ open --github` (Projects.jsx:131), `^C` for scroll-to-top (ScrollToTop.jsx:24), `$ menu` (Navbar.jsx:106).
   Justification: Three or more controls are unclear to the primary non-technical recruiter audience, matching the anchor for 1.

5. Good design is unobtrusive: Score 1/3
   Evidence: 6 perpetual animations in the hero viewport, full-page scanline overlay (index.css:98-113), 10 window chromes, marquee.
   Justification: The chrome is the identity and actively competes with content for attention; not "visible but quiet".

6. Good design is honest: Score 2/3
   Evidence: Quantified claims, zero broken links, no dark patterns; roughly one real unbacked claim ("beyond the course baseline", projects.js:35).
   Justification: At most one minor inflation on the rendered surface; label-form mismatches are understandability issues, not deception.

7. Good design is long-lasting: Score 1/3
   Evidence: CRT scanline overlay (index.css:98-113), marquee ticker (index.css:163-180), full macOS-window skeuomorph ×10.
   Justification: Two to three dated trend markers (retro-CRT, marquee, skeuomorph residue) per the anchor for 1.

8. Good design is thorough down to the last detail: Score 1/3
   Evidence: Zero focus-visible styles sitewide, loading states absent, 3 contrast failures (titlebar 4.08:1, footer 2.59/1.79:1), reduced-motion on 4 of ~18 animations, eager 360KB headshot.
   Justification: Two to three states missing plus measurable detail failures; saved from 0 because error/success states partially exist and empty/disabled are not applicable.

9. Good design is environmentally friendly: Score 2/3
   Evidence: 116KB gzip JS, no runtime fetches, no analytics; but 6+ idle animations with partial gating and a 60fps rAF loop.
   Justification: Well under 500KB with motion partially gated; idle animation load and eager image keep it from 3.

10. Good design is as little design as possible: Score 1/3
    Evidence: 30 of 71 interactive elements are decorative chrome; 9 duplicated affordances (nav ×6 mechanisms, skills ×3, stats ×4 placements); 3 dead sections in tree.
    Justification: Well over 5 removable elements, matching the anchor for 1; content substance keeps it off 0.

**TOTAL: 15/30**
