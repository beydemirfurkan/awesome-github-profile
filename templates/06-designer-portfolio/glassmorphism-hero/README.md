# Glassmorphism Hero (Liquid Glass)

![preview](../../../assets/previews/glassmorphism-hero.svg)

> What happens when you take "glassmorphism" past 2024 dribbble cliché. Four blurred color orbs animating behind a frosted glass card with iridescent border, crystalline edge highlights, specular dot, and surface grain. Apple Vision Pro DNA.

**Difficulty:** Advanced
**External services:** none — fully self-contained SVG
**Tags:** `designer-portfolio` `liquid-glass` `feGaussianBlur` `iridescent-edge` `self-hosted`

## Why this got upgraded

The first version's `glassmorphism-hero.svg` was a referenced asset *that didn't actually exist*. Visitors hitting "copy" got a 404. The new asset exists and is a serious composition:

- **Four animated radial orbs** (pink, cyan, gold, violet) drifting on different durations
- **Heavy `feGaussianBlur` (stdDeviation 36)** turns them into atmospheric color washes
- **Glass card** with subtle `<linearGradient>` surface (`white` at low alpha, varying)
- **Iridescent animated border** — multi-stop gradient with `x1`/`x2` sweeping over 14s
- **Crystalline edge highlights** — short white strokes on two opposing corners (top-left and bottom-right) suggest light refracting along beveled glass edges
- **Specular dot + glow ring** — single highlight point that says "this surface catches light"
- **Surface grain** — `feTurbulence` filtered overlay at 5% alpha, what makes it feel like real glass not vector flat

This is glassmorphism *rendered with intention* — not a `backdrop-filter: blur(20px)` shortcut.

## Live showcase

![showcase](../../../assets/designer-portfolio/glassmorphism-hero.svg)

## Setup

1. Download [`glassmorphism-hero.svg`](../../../assets/designer-portfolio/glassmorphism-hero.svg) into `./assets/glassmorphism-hero.svg` of your profile repo.
2. Edit:
   - **Left column** — `Jane Doe`, role line, the three "Currently / Writing / Open to" lines.
   - **Right sub-panel** — three selected works, `jane.dev`, `@janedoe · in/janedoe`.
   - **Top label** (`— STUDIO. PORTRAIT.`) and bottom register (`STUDIO PORTRAIT · 2026 · ISSUE 03`).
3. Optional: shift the four orb colors (`#ff7eb3` pink, `#7df9ff` cyan, `#fcd34d` gold, `#a78bfa` violet). Keep all four — *removing one* unbalances the atmosphere.
4. Commit. Done.

## Copy & Customize (paste into README.md)

```markdown
<p align="center">
  <img src="./assets/glassmorphism-hero.svg" alt="{{name}} — studio portrait" width="100%" />
</p>

### approach

{{approach_paragraph}}

### selected case studies

- [{{case_one_name}}]({{case_one_url}}) — {{case_one_outcome}}
- [{{case_two_name}}]({{case_two_url}}) — {{case_two_outcome}}
- [{{case_three_name}}]({{case_three_url}}) — {{case_three_outcome}}

### writing & talks

[`{{essay_one}}`]({{essay_one_url}}) · [`{{talk_one}}`]({{talk_one_url}})

— for project enquiries: [{{email}}](mailto:{{email}})
```

## Placeholders

| Token                    | Description                                | Example                                |
|--------------------------|--------------------------------------------|----------------------------------------|
| `{{name}}`               | Display name (edited inside SVG)           | `Jane Doe`                             |
| `{{tagline}}`            | Italic role line (edited inside SVG)       | `Designer-engineer · interface, motion, type` |
| `{{availability}}`       | Optional availability slot (edit in SVG)   | `2 slots / Q3`                         |
| `{{approach_paragraph}}` | 2–3 sentences positioning                  | `An independent practice...`           |
| `{{case_one_*}}`         | First case study name/URL/outcome          | `acme-ds / .../acme-ds / shipped to 14 teams` |
| (etc. for two, three)    |                                            |                                        |
| `{{essay_one}}`          | Recent essay title                         | `On the slowness of good interfaces`   |
| `{{essay_one_url}}`      | URL                                        | `https://jane.dev/log/slow`            |
| `{{talk_one}}`           | Recent talk title                          | `Motion as Editorial Tool`             |
| `{{talk_one_url}}`       | URL                                        | `https://...`                          |
| `{{email}}`              | Email                                      | `hello@jane.dev`                       |

## Customization Tips

- **Four orbs, not three.** Three orbs feel like the trinity of a Bootstrap landing page; four creates an atmospheric diffusion that reads as *deliberate*. Don't subtract.
- **Stagger orb durations: 18s, 20s, 12s, 22s.** No two orbs share a `dur` — that's what makes their interplay non-repeating. If two orbs sync, the eye picks up the loop.
- **The iridescent border is one element, not four corners.** A single `<rect stroke="url(#lg-edge)">` with the gradient's `x1`/`x2` animating across 14s. Don't try to "color the corners" individually — it'll look painted, not refracted.
- **Crystalline highlights are tiny.** Two short white strokes plus two corner curves, no more. Real glass catches light at a few precise spots, not all over.
- **The surface grain is at 5% alpha.** Just enough to break the perfect vector flatness. Visible at >50% zoom; subliminal at default. Remove it and the glass looks plastic.
- **Don't put a stats card next to this template.** It's a *studio portrait* — formal, restrained, atmospheric. Pairing with metrics breaks the room's energy.
- **The `availability slot` line is the closer.** "Open to select projects · 2 slots / Q3" reads as honest scarcity. Without it, the page is decorative; with it, the page does work.

## Technical notes

The iridescent edge that animates:

```svg
<linearGradient id="lg-edge" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0"   stop-color="#ff7eb3"/>
  <stop offset="0.33" stop-color="#7df9ff"/>
  <stop offset="0.66" stop-color="#fcd34d"/>
  <stop offset="1"   stop-color="#a78bfa"/>
  <animate attributeName="x1" values="0;-1;0" dur="14s" repeatCount="indefinite"/>
  <animate attributeName="x2" values="1;2;1" dur="14s" repeatCount="indefinite"/>
</linearGradient>
```

Animating `x1`/`x2` past `[0,1]` slides the gradient stops physically across and beyond the canvas. The four-stop palette cycles smoothly because the colors are perceptually adjacent on the iridescent spectrum.

The glass card uses `<linearGradient id="lg-glasstop">` with three white stops at very low alphas (0.18 / 0.06 / 0.10). The non-uniform alphas mimic how real glass reflects more light at the top and bottom edges than the middle — that's what gives the surface its *bevel*.

The surface grain is the unsung hero:

```svg
<filter id="lg-grain">
  <feTurbulence baseFrequency="1.4" numOctaves="2" stitchTiles="stitch"/>
  <feColorMatrix values="..." />
</filter>
```

`baseFrequency="1.4"` produces tight, fine noise (vs. cloudy `0.05` aurora-style). `feColorMatrix` desaturates and reduces alpha. The result is invisible at first glance and essential at second.

## Credits

- Self-hosted SVG. SMIL animation + filter primitives (W3C SVG 1.1).
- Liquid glass language adapted from Apple Vision Pro UI conventions.
- CC0 — copy, modify, ship.
