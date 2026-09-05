# Neon Pulse Banner

<!-- BEGIN:preview -->
![Neon Pulse Banner](../../../assets/animated/neon-pulse-banner.svg)
<!-- END:preview -->

> Three nested wave paths morphing in parallel against an animated spectrum gradient. Self-hosted SVG — no third-party banner services, no shields, no shimmer-from-someone-else's-Vercel.

<!-- BEGIN:meta -->
**Kind:** `svg` — ships a self-hosted SVG you download and commit  
**Difficulty:** Intermediate  
**External services:** none  
**Tags:** `animated` `gradient-flow` `wave-morph` `glow-filter` `self-hosted`
<!-- END:meta -->

## Preview

A wide dark-violet field with three wave paths crossing it at different speeds and opacities, a spectrum that *travels* through them rather than shifting hue, and your name in heavy sans with a blurred spectrum copy glowing underneath. Four tag chips sit below the role line; a status line and a corner mark close the frame.

## Why this design

Three external services would ship this faster — a hero generator, a typing SVG, a badge row — but each one is a runtime dependency that can rate-limit, change its API, or simply be down when someone opens your profile. This is one self-hosted file instead: three independently animated wave paths, two linear gradients sweeping in opposite directions, a glow filter on the front wave, and a chromatic-overlay headline. Same visual energy, nothing that can go down.

## Live showcase

![showcase](../../../assets/animated/neon-pulse-banner.svg)

## Setup

1. Download [`neon-pulse-banner.svg`](../../../assets/animated/neon-pulse-banner.svg) into `./assets/neon-pulse-banner.svg` of your profile repo.
2. Edit the `<text>` elements: name (`JANE DOE`), role line (`FRONTEND · MOTION · WEBGL`), tag chips (`react`, `typescript`, `webgl`, `motion`), status line, and the corner mark.
3. Optional: shift the spectrum by editing the three `stop-color` values in `np-spectrum` and `np-spectrum2`. Stay within saturated neons — pastels kill the energy.
4. Commit. Done.

## Copy & Customize (paste into README.md)

```markdown
<p align="center">
  <img src="./assets/neon-pulse-banner.svg" alt="{{name}} — {{tagline}}" width="100%" />
</p>

### whoami

{{bio_paragraph}}

### currently

- {{currently_one}}
- {{currently_two}}
- {{currently_three}}

— [{{website}}]({{website_url}}) · [@{{twitter}}](https://twitter.com/{{twitter}})
```

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{name}}` | in the block below | Display name | `JANE DOE` |
| `{{tagline}}` | in the block below | Role line | `FRONTEND · MOTION · WEBGL` |
| `{{tags_*}}` | inside the SVG | Four chip labels | `react, typescript, webgl, motion` |
| `{{bio_paragraph}}` | in the block below | 1–2 sentences in markdown | `I build interfaces that move...` |
| `{{currently_*}}` | in the block below | Bullet | `shipping the design system at acme` |
| `{{website}}` | in the block below | Domain | `jane.dev` |
| `{{website_url}}` | in the block below | URL | `https://jane.dev` |
| `{{twitter}}` | in the block below | Twitter handle without @ | `janedoe` |
<!-- END:placeholders -->

## Customization Tips

- **The dual-gradient sweep is the soul.** Two `<linearGradient>` elements animate `x1`/`x2` in *opposite directions* (9s vs 11s). Their phase difference is what makes the spectrum feel alive instead of mechanical. Don't sync them.
- **Three wave paths at three speeds (14s/9s/6s).** The far wave is dim and slow; the front wave is glowing and fast. This is parallax — flattening their speeds destroys the depth.
- **The headline ghost layer.** The white text + the spectrum-filled glow-blurred copy underneath = a cheap-but-perfect chromatic glow. Both `<text>` elements need identical `font-size` and `letter-spacing`, or alignment breaks.
- **Don't add shields/badges.** This is a self-contained composition; pasting `![badge](shields.io/...)` next to it will look like a flyer with sponsor logos.
- **Cost.** Eight `<animate>` elements and two blur filters. The gradients and path morphs are cheap; the glow on the front wave is the only part that costs anything, so if you need this lighter, drop the filter and keep the motion.
- **Pair with prose, not stats.** This banner does the heavy visual lifting — let the markdown below it be quiet sentences, not another stats wall.

## Technical notes

The animated linear gradient that drives the spectrum:

```svg
<linearGradient id="np-spectrum" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0"   stop-color="#ff00d9"/>
  <stop offset="0.5" stop-color="#7c5cff"/>
  <stop offset="1"   stop-color="#00d9ff"/>
  <animate attributeName="x1" values="0;-1;0" dur="9s" repeatCount="indefinite"/>
  <animate attributeName="x2" values="1;2;1" dur="9s" repeatCount="indefinite"/>
</linearGradient>
```

Animating `x1`/`x2` past their normal `[0,1]` range slides the gradient *off-canvas and back*. That's the trick: the colors don't shift hue, they *travel*. The browser interpolates the gradient stops at any moment based on where x1/x2 currently are.

Wave morphing uses standard `<animate attributeName="d">` with three states sharing the same cubic-bezier command structure (`M ... C ... C ...`). For path morphing rules, see the [Liquid Morph Wordmark](../../09-avant-garde/liquid-morph-wordmark/) tech notes.

## Credits

- Self-hosted SVG. SMIL animation primitives (W3C SVG 1.1).
- CC0 — copy, modify, ship.
