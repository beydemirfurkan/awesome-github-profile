# Cyberpunk Neon

<!-- BEGIN:preview -->
![Cyberpunk Neon](../../../assets/themed/cyberpunk-neon.svg)
<!-- END:preview -->

> Vaporwave perspective grid receding to a synthwave sun, chromatic-aberration title, animated scan line, and an honest-to-god jacked-in status pill. Self-hosted SVG, capsule-render-free.

<!-- BEGIN:meta -->
**Kind:** `svg` — ships a self-hosted SVG you download and commit  
**Difficulty:** Advanced  
**External services:** none  
**Tags:** `themed` `cyberpunk` `vaporwave` `self-hosted`
<!-- END:meta -->

## Preview

Every synthwave cliché, done properly: a sun on the horizon cut by horizontal scanlines, a perspective grid floor running to a vanishing point, a mountain silhouette between them, a scanline scrolling down the field, and your name in layered offset copies so the title reads as chromatic aberration.

## Why this design

Assembled from a hero generator, a typing service and a stats card, this look is possible — and it breaks the first time a hex-encoded URL parameter meets a theme tweak. Self-hosted, every part can be built properly instead: a vaporwave sun cut by horizontal scanlines, a perspective grid floor with real vanishing-point lines, a distant mountain silhouette, a vertically scrolling scanline, and a chromatic-aberration title made of layered `<text>` elements with offset jitter.

The aberration is four layers, not three: cyan and magenta offsets, a magenta glow, and the white face on top.

## Live showcase

![showcase](../../../assets/themed/cyberpunk-neon.svg)

## Setup

1. Download [`cyberpunk-neon.svg`](../../../assets/themed/cyberpunk-neon.svg) into `./assets/cyberpunk-neon.svg` of your profile repo.
2. Edit the `<text>` elements:
   - Title (`JANE_DOE`) — appears in **four** layered `<text>` elements (magenta-glow, magenta, cyan, white). Replace all four with the same text.
   - Subtitle (`// FRONTEND.ENGINEER.exe`) — keep the `// ... .exe` framing.
   - Top corner stamps (`TOKYO.SECTOR_07 · 22:14`, `SIGNAL.STRENGTH 98%`).
   - Status pill (`JACKED IN · NEURAL UPLINK STABLE · UPTIME 2,184d`).
   - Tag list (`[ react ] [ webgl ] [ rust ] [ shaders ]`).
3. Optional: shift hue by editing `#ff00d9` (magenta) and `#00ffe7` (cyan) globally. **Stay loud.** Pastel cyberpunk doesn't exist.
4. Commit. Done.

## Copy & Customize (paste into README.md)

```markdown
<p align="center">
  <img src="./assets/cyberpunk-neon.svg" alt="{{name}} — cyberpunk profile" width="100%" />
</p>

### // whoami

{{bio_lowercase}}

### // currently

- {{currently_one}}
- {{currently_two}}
- {{currently_three}}

### // contact

`{{website}}` · `@{{twitter}}` · `{{email}}`
```

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{name}}` | in the block below | Title text, ALL_CAPS_WITH_UNDERSCORES | `JANE_DOE` |
| `{{role}}` | inside the SVG | Subtitle | `FRONTEND.ENGINEER` |
| `{{location_stamp}}` | inside the SVG | Top-left corner | `TOKYO.SECTOR_07 · 22:14` |
| `{{status_pill}}` | inside the SVG | Bottom-left phrase | `JACKED IN · NEURAL UPLINK STABLE` |
| `{{tags_list}}` | inside the SVG | Four uppercase chip labels | `[ react ] [ webgl ] [ rust ] [ shaders ]` |
| `{{bio_lowercase}}` | in the block below | 1–2 sentences in *lowercase only* | `i build interfaces that...` |
| `{{currently_*}}` | in the block below | lowercase bullets | `shipping the design system...` |
| `{{website}}` | in the block below | Domain | `jane.dev` |
| `{{twitter}}` | in the block below | Handle without @ | `janedoe` |
| `{{email}}` | in the block below | Email | `hello@jane.dev` |
<!-- END:placeholders -->

## Customization Tips

- **Lowercase everything in prose. Uppercase everything in chrome.** The contrast is the language. Mixing breaks the visual grammar.
- **The chromatic aberration uses three layered titles.** Magenta offset `(-3,1)`, cyan offset `(3,-1)`, white centered. The two color layers each have a separate `animateTransform translate` cycling through subtle jitter values — this is the *living* split that makes it feel like a CRT glitch, not a static drop shadow.
- **Don't slow the chromatic jitter.** `dur="0.18s"` is fast enough that the eye reads it as *vibration*, not *bouncing*. Anything slower than 0.3s reads as broken.
- **The vaporwave sun is the anchor.** Five horizontal black bars carved out of the sun (gradient yellow→magenta→purple) are the synthwave shorthand. Don't replace with a plain circle.
- **Mountain silhouette ties grid to sky.** The dark `<path>` between horizon and grid is what stops the composition from feeling like two unrelated halves. Don't remove it.
- **Status pill must be technical-sounding gibberish.** "JACKED IN", "NEURAL UPLINK", "SIGNAL.STRENGTH" — these are the genre's mandatory vocabulary. Don't write "ONLINE" or "AVAILABLE" — too tame.
- **No badges, no shield emojis, no friendly emoji.** This template is loud — every other element should be quiet text.

## Technical notes

The chromatic aberration trick:

```svg
<text x="600" y="158" fill="#ff00d9" opacity="0.85">
  <animateTransform attributeName="transform" type="translate"
                    values="-3 1;-2 -1;-3 1" dur="0.18s" repeatCount="indefinite"/>
  JANE_DOE
</text>
<text x="600" y="158" fill="#00ffe7" opacity="0.85">
  <animateTransform attributeName="transform" type="translate"
                    values="3 -1;2 1;3 -1" dur="0.18s" repeatCount="indefinite"/>
  JANE_DOE
</text>
<text x="600" y="158" fill="#fff8e7">JANE_DOE</text>
```

Three identical text elements, three different fills, two with subtle translation animations *in opposing directions*. The white center stays still; the magenta drifts left, the cyan drifts right, on the same 0.18s clock — out of phase. That's the chroma split.

The scrolling scanline is a single `<line>` with `y1`/`y2` animating from above-canvas to below-canvas over 3 seconds. Keep `stroke-width="1"` — anything thicker reads as a render glitch.

## Credits

- Self-hosted SVG. SMIL animation primitives (W3C SVG 1.1).
- Synthwave palette conventions referenced from late-80s VHS aesthetics.
- CC0 — copy, modify, ship.
