# Tech Sphere

<!-- BEGIN:preview -->
![Tech Sphere](../../../assets/3d-immersive/tech-sphere.svg)
<!-- END:preview -->

> An actual rotating 3D-look sphere built from intersecting ellipses, with eight tech tokens that orbit on a counter-rotating layer to stay readable. Self-hosted SVG.

<!-- BEGIN:meta -->
**Kind:** `svg` — ships a self-hosted SVG you download and commit  
**Difficulty:** Advanced  
**External services:** none  
**Tags:** `3d` `orbit` `stack` `self-hosted`
<!-- END:meta -->

## Preview

A shaded sphere on a near-black field, wrapped in ellipse latitudes that rotate one way while your stack labels orbit the other way at the same rate — so the sphere turns and the type stays upright. A pulsing node marks the centre; a short tier list sits to the left.

## Why this design

A stack list is easy. A stack list that reads as an object in space is not. The sphere is a `<radialGradient>` with a specular highlight and a rim light, wrapped in **two counter-rotating groups**: ellipse latitudes spinning one way, tech tokens spinning the other way at the same rate.

The counter-rotation is the whole trick. Rotating both keeps the sensation of a turning sphere while the labels never go upside down — which is why both `dur` values have to match exactly.

## Live showcase

![showcase](../../../assets/3d-immersive/tech-sphere.svg)

## Setup

1. Download [`tech-sphere.svg`](../../../assets/3d-immersive/tech-sphere.svg) into `./assets/tech-sphere.svg` of your profile repo.
2. Open in any text editor.
3. Edit:
   - **Side panel** — name (`Jane Doe`), role line, the four-line bio, and the three tier rows (`STABLE / TRUSTED / EXPLORING`).
   - **Tech tokens** — find the eight `<text>` elements inside the counter-rotating group; replace `react`, `ts`, `webgl`, `node`, `rust`, `go`, `css`, and the italic `// learning` placeholder.
4. Optional: change the `dur="22s"` rotation speed. Slower (32s) = stately. Faster (16s) = hyperactive.
5. Commit. Done.

## Copy & Customize (paste into README.md)

```markdown
<p align="center">
  <img src="./assets/tech-sphere.svg" alt="{{name}} — orbital toolbelt" width="100%" />
</p>

### why this orbit

{{orbit_explanation_paragraph}}

### what's at the center this week

> {{learning_focus}}

— [{{website}}]({{website_url}}) · [@{{twitter}}](https://twitter.com/{{twitter}})
```

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{name}}` | in the block below | Display name | `Jane Doe` |
| `{{role}}` | inside the SVG | Role caps line | `FRONTEND ENGINEER · MOTION · 3D` |
| `{{stack_tokens_*}}` | inside the SVG | Eight tech labels | `react / ts / webgl / node / rust / go` |
| `{{tier_rows}}` | inside the SVG | Three stack tiers | `STABLE / TRUSTED / EXPLORING` |
| `{{orbit_explanation_paragraph}}` | in the block below | 1–2 sentences explaining your stack philosophy | `Eight tools, one orbit...` |
| `{{learning_focus}}` | in the block below | One sentence — what you're learning now | `rust shaders for the type observatory` |
| `{{website}}` | in the block below | Domain | `jane.dev` |
| `{{website_url}}` | in the block below | URL | `https://jane.dev` |
| `{{twitter}}` | in the block below | Twitter handle without @ | `janedoe` |
<!-- END:placeholders -->

## Customization Tips

- **Eight tokens, max ten.** Below six the orbit looks empty; above ten it becomes a word cloud. Eight is the rhythm.
- **Counter-rotation is the soul.** The latitudes rotate `0 → 360` over 22s; the tokens rotate `0 → -360` over 22s. Same speed, opposite direction = labels stay upright. **Both `dur` values must match exactly** — even 22.1 vs 22.0 will cause the labels to slowly drift over minutes.
- **Tier the tokens by color.** Cyan (`#5cffd9`) for stable/trusted, violet (`#a78bfa`) for exploring/new. Mixing colors arbitrarily kills the meaning.
- **The center pulse is the focal anchor.** A single warm-cream dot pulsing on the same beat as the halo creates a visual heartbeat at the center of the sphere. Removing it makes the sphere feel hollow.
- **Don't fill the sphere with a solid color.** The radial gradient (`#1a2a52 → #0a0f24 → #040614`) is what gives it 3D shading. Flat fills look like a CD label.
- **Pair with a single sentence** explaining what's at the center this week. The orbit metaphor only lands if you say what you're orbiting *toward*.
- **Cost.** Two `animateTransform` rotations, three `<animate>` elements and a single blur. Transforms are the cheapest thing SVG animates, which is why this one stays light despite looking like the most expensive template here.

## Technical notes

The counter-rotation pair:

```svg
<!-- Latitudes rotating clockwise -->
<g>
  <animateTransform attributeName="transform" type="rotate"
                    from="0" to="360" dur="22s" repeatCount="indefinite"/>
  <ellipse rx="160" ry="60" .../>
  <ellipse rx="160" ry="60" transform="rotate(60)" .../>
  ...
</g>

<!-- Tokens rotating counter-clockwise at the same rate -->
<g>
  <animateTransform attributeName="transform" type="rotate"
                    from="0" to="-360" dur="22s" repeatCount="indefinite"/>
  <g transform="translate(-130,-30)"><text>react</text></g>
  ...
</g>
```

Both groups rotate around the SVG origin at `(0,0)` of the inner coordinate system, which we placed at the sphere's center via `transform="translate(840,210)"` on the outer wrapper. This is the only way to get true rotation-around-center without complex `transform-origin` workarounds.

The sphere shading uses three radial gradients stacked: `ts-sphere` (base shading), `ts-shine` (specular highlight off-center top-left), `ts-rim` as a stroke (rim light). Together they read as one lit object.

## Credits

- Self-hosted SVG. SMIL `<animateTransform>` (W3C SVG 1.1).
- Sphere shading conventions adapted from technical illustration practice.
- CC0 — copy, modify, ship.
