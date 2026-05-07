# Tech Sphere

![preview](../../../assets/previews/tech-sphere.svg)

> An actual rotating 3D-look sphere built from intersecting ellipses, with eight tech tokens that orbit on a counter-rotating layer to stay readable. Self-hosted SVG.

**Difficulty:** Advanced
**External services:** none — fully self-contained SVG
**Tags:** `3d` `rotating-sphere` `orbital` `counter-rotation` `self-hosted`

## Why this got upgraded

The original template only described the technique without shipping the asset — visitors had to "build their own SVG or fall back to skill-icons." Now the asset exists. It's a real composition: a `<radialGradient>`-shaded sphere with specular shine and rim light, **two counter-rotating groups** (ellipse latitudes spinning one way, tech tokens spinning the opposite way at the same rate so labels stay upright), and a pulsing center node.

The counter-rotation is the magic: rotating both groups visually maintains the *sphere* sensation while keeping the labels readable.

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

| Token                            | Description                                | Example                                  |
|----------------------------------|--------------------------------------------|------------------------------------------|
| `{{name}}`                       | Display name (edited inside SVG)           | `Jane Doe`                               |
| `{{role}}`                       | Role caps line (edited inside SVG)         | `FRONTEND ENGINEER · MOTION · 3D`        |
| `{{stack_tokens_*}}`             | Eight tech labels (edited inside SVG)      | `react / ts / webgl / node / rust / go`  |
| `{{tier_rows}}`                  | Three stack tiers (edited inside SVG)      | `STABLE / TRUSTED / EXPLORING`           |
| `{{orbit_explanation_paragraph}}`| 1–2 sentences explaining your stack philosophy | `Eight tools, one orbit...`         |
| `{{learning_focus}}`             | One sentence — what you're learning now    | `rust shaders for the type observatory`  |
| `{{website}}`                    | Domain                                     | `jane.dev`                               |
| `{{website_url}}`                | URL                                        | `https://jane.dev`                       |
| `{{twitter}}`                    | Twitter handle without `@`                 | `janedoe`                                |

## Customization Tips

- **Eight tokens, max ten.** Below six the orbit looks empty; above ten it becomes a word cloud. Eight is the rhythm.
- **Counter-rotation is the soul.** The latitudes rotate `0 → 360` over 22s; the tokens rotate `0 → -360` over 22s. Same speed, opposite direction = labels stay upright. **Both `dur` values must match exactly** — even 22.1 vs 22.0 will cause the labels to slowly drift over minutes.
- **Tier the tokens by color.** Cyan (`#5cffd9`) for stable/trusted, violet (`#a78bfa`) for exploring/new. Mixing colors arbitrarily kills the meaning.
- **The center pulse is the focal anchor.** A single warm-cream dot pulsing on the same beat as the halo creates a visual heartbeat at the center of the sphere. Removing it makes the sphere feel hollow.
- **Don't fill the sphere with a solid color.** The radial gradient (`#1a2a52 → #0a0f24 → #040614`) is what gives it 3D shading. Flat fills look like a CD label.
- **Pair with a single sentence** explaining what's at the center this week. The orbit metaphor only lands if you say what you're orbiting *toward*.
- **Mobile.** Two `animateTransform` rotations + one breathing circle = ~9ms paint per frame. Smooth on iPhone X and up.

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
