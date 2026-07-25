# Rohit Sharma — Portfolio

Single-page portfolio for **Rohit Sharma**, Generative AI Developer.
Next.js (App Router) + TypeScript, with a motion system built on GSAP,
ScrollTrigger and Lenis.

Motion is not a layer on top of this site — every section defines its own
initial state, entrance, scroll behaviour, hover/mouse interaction and mobile
fallback. The timing and easing vocabulary was derived by inspecting the
reference portfolio's shipped CSS/JS; see **[MOTION-INVENTORY.md](./MOTION-INVENTORY.md)**
for the documented parameters and where each value came from.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router), static export |
| Language | TypeScript (strict) |
| Animation | GSAP + ScrollTrigger |
| Smooth scroll | Lenis, driven off GSAP's ticker |
| Text splitting | Hand-rolled (`SplitText`) — no SplitType dependency |
| Styles | SCSS modules + CSS custom properties |

## Structure

```
app/                     layout (fonts, metadata, providers) + page
components/
  layout/                Nav, SectionHead, Footer
  sections/              Hero, WhatIDo, SelectedWorks, Skills,
                         MarqueeBand, About, Experience, Contact
  projects/ProjectCard   editorial case-study card
  motion/                reusable motion primitives
hooks/                   useGsap, useLenis, useMousePosition,
                         useMotionPreference
data/content.ts          all copy in one place
lib/asset.ts             basePath-aware asset URLs
styles/                  tokens (vars + mixins) and globals
```

Animations live in the primitives and in each section's own `useGsapContext`
call — never in `page.tsx`. Every context is scoped with `gsap.context()` so
tweens and ScrollTriggers revert on unmount.

## Motion primitives

- `SmoothScroll` — Lenis + ScrollTrigger, one shared RAF loop
- `CustomCursor` — lerped follower with `default / link / button / project / image` states
- `MagneticButton` — cursor-attracted buttons via `quickTo`
- `SplitText` / `TextReveal` — masked line, word and character reveals
- `ImageReveal` — `clip-path` wipe + de-scale, plus scrubbed parallax
- `ParallaxLayer`, `Reveal`, `SectionTransition`, `Marquee`

## Accessibility & responsiveness

- `prefers-reduced-motion: reduce` disables Lenis, the custom cursor and all
  transforms; content renders in its final state.
- Pre-animation hidden states are gated behind `html.motion`, added before
  first paint — so no-JS and reduced-motion visitors never get hidden content.
- Mouse-dependent effects are gated on `(hover: hover) and (pointer: fine)`.
- Split text carries an `aria-label`; decorative duplicates are `aria-hidden`.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build      # static export to ./out
```

## Deployment

Pushes to `main` build and publish to GitHub Pages via
`.github/workflows/deploy-pages.yml`. Enable it once under
**Settings → Pages → Source: GitHub Actions**.

The workflow passes `BASE_PATH` so the export works from the project sub-path.
Note that `images.unoptimized` means asset URLs are emitted verbatim, so public
assets go through `lib/asset.ts` to pick up that prefix.

## Content accuracy

Project details were taken from the actual sources rather than written from
memory: the Yummi repository (README, `package.json`, routes, bundled assets)
and Deblo's public landing page plus its `package.json`. Yummi ships no
screenshots, so its card shows the project's own in-app illustration and says
so. Deblo's card uses a real capture of its landing page and keeps its own
"not for real medical use" disclaimer. No metrics are claimed anywhere.
