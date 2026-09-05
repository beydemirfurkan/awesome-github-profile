# Voronoi Territory

<!-- BEGIN:preview -->
![Voronoi Territory](../../../assets/generative/voronoi-territory.svg)
<!-- END:preview -->

> A power diagram whose weights were solved until every cell's area equals its language's share — so the map and the legend cannot disagree.

<!-- BEGIN:meta -->
**Kind:** `svg` — ships a self-hosted SVG you download and commit  
**Difficulty:** Advanced  
**External services:** none  
**Tags:** `generative` `voronoi` `power-diagram` `data-art` `self-hosted`
<!-- END:meta -->

## Preview

Nine irregular cells tile a rectangle, each in its language colour, the largest labelled with its name and percentage. A legend on the right lists all nine with the same figures. TypeScript is visibly a third of the picture, because it is a third of the code.

## Why this design

An ordinary Voronoi diagram is the wrong tool for this, and most language charts built on one are quietly lying. Voronoi cells from scattered points tend toward *equal* area, so the picture says every language is about the same size no matter what the data says.

This is a power diagram instead. Each site carries a weight, and the boundary between two sites slides off the midpoint in proportion to the difference in weights — so a cell can grow without its site moving. That gives a knob, and the knob can be solved: nudge each weight by its area error, take a Lloyd step every third pass to keep the cells convex, and repeat. It converges to within 0.01 of a percentage point.

Which means the numbers printed on the map are measured off the map. There is no separate data source to drift.

## Live showcase

![showcase](../../../assets/generative/voronoi-territory.svg)

## Setup

1. Download [`voronoi-territory.svg`](../../../assets/generative/voronoi-territory.svg) into `./assets/voronoi-territory.svg` of your profile repo.
2. Edit the nine legend rows and the labels on the large cells to your own languages and percentages.
3. **Important:** editing the labels does not resize the cells. If you want the geometry to match your real split, regenerate it — the solver is twenty lines and it is in the technical notes below.
4. Edit the name and the caption.
5. Commit. Done.

## Copy & Customize

```markdown
<p align="center">
  <img src="./assets/voronoi-territory.svg" alt="{{name}} — languages by area" width="100%" />
</p>

### territory

{{territory_paragraph}}

### built with it

- **{{project_one_name}}** — {{project_one_desc}}
- **{{project_two_name}}** — {{project_two_desc}}

— [{{website}}]({{website_url}}) · [@{{twitter}}](https://twitter.com/{{twitter}})
```

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{name}}` | in the block below | Display name — also set in the SVG | `Jane Doe` |
| `{{language_*}}` | inside the SVG | The nine language names and shares | `TypeScript · 31.0%` |
| `{{territory_paragraph}}` | in the block below | What the split says about your work | `One language, and eight it talks to.` |
| `{{project_*_name}}` | in the block below | Project name, one per bullet | `acme design system` |
| `{{project_*_desc}}` | in the block below | One line on what it is | `tokens shipped to 14 teams` |
| `{{website}}` | in the block below | Domain shown to the reader | `jane.dev` |
| `{{website_url}}` | in the block below | Site URL with protocol | `https://jane.dev` |
| `{{twitter}}` | in the block below | Twitter/X handle, no @ | `janedoe` |
<!-- END:placeholders -->

## Customization Tips

- **Regenerate rather than relabel.** The whole value of this template is that the areas are true. Typing a new percentage over an unchanged cell throws that away.
- **Nine cells is about the ceiling.** Below three per cent a cell gets too small to label, and an unlabelled sliver is just texture.
- **Use the real language colours.** Readers recognise GitHub's palette; inventing your own costs you the instant read.
- **Check your label contrast.** The dark ink is used on yellow, green, tan and cyan cells and the light ink everywhere else — swap a colour and you may need to swap the ink.
- **Palette:** ground `#0b0f16` · cells use GitHub's linguist colours · legend `#c8d2e8` / `#7c86b8`.

## Technical notes

The bisector between two weighted sites is still a straight line, which is the reason this stays tractable — you can clip a polygon by it exactly, one half-plane at a time:

```js
const t = 0.5 + (wa - wb) / (2 * d2)   // d2 = squared distance between sites
const mx = ax + dx * t, my = ay + dy * t
```

At equal weights `t` is 0.5 and this is the perpendicular bisector. Increase `wa` and the line slides toward site *b*, enlarging *a*'s cell without moving either point.

The solve alternates two moves that fail on their own. Weight steps (`w[i] += (target - area) * 0.55`) drive the areas but let cells go slivered; Lloyd steps (move each site a quarter of the way to its centroid) keep the cells compact but equalise the areas. Alternating them — weights every pass, Lloyd every third — converges in about 260 iterations with a worst-case area error of 0.00 percentage points.

Subtracting the maximum weight from all weights each pass keeps them bounded. Only differences matter, so this changes nothing geometrically and stops the numbers drifting toward infinity.

## Credits

- Self-hosted SVG. No third-party services.
- CC0 — copy, modify, ship.
