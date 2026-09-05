# Flow Field

<!-- BEGIN:preview -->
![Flow Field](../../../assets/generative/flow-field.svg)
<!-- END:preview -->

> Five hundred streamlines tracing one continuous vector field. Neighbours stay parallel because they follow the same field; only the density changes, and it changes with how much you committed.

<!-- BEGIN:meta -->
**Kind:** `svg` — ships a self-hosted SVG you download and commit  
**Difficulty:** Advanced  
**External services:** none  
**Tags:** `generative` `flow-field` `streamlines` `data-art` `self-hosted`
<!-- END:meta -->

## Preview

A near-black field crossed by hundreds of fine strokes that curve together in long combed sweeps, violet where the year was busy and cyan where it was quiet. A vignette pulls the edges down; your name and a short caption sit clear of the field at the top.

## Why this design

A flow field is the cheapest way to make an image that looks computed rather than drawn, and it only works if every stroke obeys the same rule. Each streamline starts at a random point and steps forward seven units at a time, taking its direction from a function of position. Because two nearby strokes read almost the same field value, they run parallel — that combing is the entire effect, and it is what separates this from scattered noise.

The field is a sum of three sines rather than real noise. It is smooth, seedless, and short enough to read in one line, and at this scale nobody can tell the difference.

The data goes into the *density*, not the direction. Weeks with more commits seed more streamlines and brighter ones, so the picture is a year at a glance without a single axis.

## Live showcase

![showcase](../../../assets/generative/flow-field.svg)

## Setup

1. Download [`flow-field.svg`](../../../assets/generative/flow-field.svg) into `./assets/flow-field.svg` of your profile repo.
2. Edit the four text elements — name, caption, and the two right-hand labels.
3. Optional: to regenerate the field with a different shape, change the three divisors in the angle function. Bigger divisors mean longer, lazier curves.
4. Optional: swap the five-colour ramp. Keep it to five; the ramp is indexed by density and more steps just muddies it.
5. Commit. Done.

## Copy & Customize

```markdown
<p align="center">
  <img src="./assets/flow-field.svg" alt="{{name}} — a year as a vector field" width="100%" />
</p>

### the year

{{year_paragraph}}

### what came out of it

- **{{project_one_name}}** — {{project_one_desc}}
- **{{project_two_name}}** — {{project_two_desc}}
- **{{project_three_name}}** — {{project_three_desc}}

— [{{website}}]({{website_url}}) · [@{{twitter}}](https://twitter.com/{{twitter}})
```

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{name}}` | in the block below | Display name — also set in the SVG | `Jane Doe` |
| `{{caption}}` | inside the SVG | The mono caption under your name | `A YEAR, AS A VECTOR FIELD` |
| `{{year_paragraph}}` | in the block below | What the year actually involved | `Mostly one design system, and a lot of typography.` |
| `{{project_*_name}}` | in the block below | Project name, one per bullet | `acme design system` |
| `{{project_*_desc}}` | in the block below | One line on what it is | `tokens shipped to 14 teams` |
| `{{website}}` | in the block below | Domain shown to the reader | `jane.dev` |
| `{{website_url}}` | in the block below | Site URL with protocol | `https://jane.dev` |
| `{{twitter}}` | in the block below | Twitter/X handle, no @ | `janedoe` |
<!-- END:placeholders -->

## Customization Tips

- **Do not raise the step size.** Seven units per step is what keeps the curves smooth; at fifteen the streamlines start to look like polylines, because they are.
- **Keep the strokes thin and many.** Five hundred hairlines read as a field; fifty thick ones read as spaghetti.
- **The vignette is doing more than you think.** Without it the strokes run into the artboard edge and the composition loses its centre.
- **This is the largest asset here at ~80 KB.** Well inside the 300 KB bar, but if you fork it and double the streamline count, check both the size and the group count.
- **Palette:** ground `#05060c` · ramp `#1e3a8a → #3b82f6 → #22d3ee → #a78bfa → #e879f9`.

## Technical notes

The field, in full:

```js
const angle = (x, y) =>
  1.9 * Math.sin(x / 190 + y / 260) +
  1.3 * Math.sin(x / 90 - y / 130 + 1.7) +
  0.8 * Math.sin(y / 60 + 2.9)
```

Three sines at different frequencies and phases. The first sets the large sweep, the second breaks its symmetry, the third adds a fine horizontal ripple. Real Perlin noise would be smoother still, but it needs a permutation table and a gradient lookup; this needs one line and produces a field with no visible seams.

Tracing is a plain Euler step — `x += cos(a) * 7` — which drifts slightly against the true streamline. At seven units over a dozen steps the error never becomes visible, and a Runge–Kutta integrator would quadruple the work for a picture nobody would tell apart.

Every stroke is a separate `<path>` with its own opacity, which is what makes the density read. Grouping them under one opacity would flatten exactly the information the image is carrying.

## Credits

- Self-hosted SVG. No third-party services.
- CC0 — copy, modify, ship.
