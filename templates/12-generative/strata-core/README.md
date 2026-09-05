# Strata Core

<!-- BEGIN:preview -->
![Strata Core](../../../assets/generative/strata-core.svg)
<!-- END:preview -->

> Each year is a bed whose thickness is its share of all your commits, with wavy contacts between them and a depth scale down the side. A timeline that reads as rock.

<!-- BEGIN:meta -->
**Kind:** `svg` — ships a self-hosted SVG you download and commit  
**Difficulty:** Intermediate  
**External services:** none  
**Tags:** `generative` `geology` `timeline` `data-art` `self-hosted`
<!-- END:meta -->

## Preview

A dark ground with six horizontal beds stacked from this year at the top to your oldest at the bottom, each in its own earth tone and grained with turbulence. The contacts between beds wander rather than ruling straight. A depth scale runs down the left; year labels lead out to the right, stacking clear of each other where the beds get thin.

## Why this design

A stacked bar chart of commits per year is accurate and forgettable. The same data as a core sample is the same accuracy with a reason to look — and the metaphor holds up, because a thick bed really does mean a lot happened.

Straight contacts would kill it. Real beds meet along surfaces that wander, so each boundary here is a quadratic path with a few units of jitter per control point. That single decision is the difference between rock and a bar chart.

Each bed gets its own `feTurbulence` at a different base frequency, so the grain coarsens as you go down. It reads as different material rather than the same fill at different opacities.

## Live showcase

![showcase](../../../assets/generative/strata-core.svg)

## Setup

1. Download [`strata-core.svg`](../../../assets/generative/strata-core.svg) into `./assets/strata-core.svg` of your profile repo.
2. Edit the six year labels and commit counts on the right.
3. **Note:** bed thickness is proportional to commit count, so editing a number does not resize its bed. Regenerate if you want them to match — the loop is in the technical notes.
4. Edit the name, the caption and the total.
5. Commit. Done.

## Copy & Customize

```markdown
<p align="center">
  <img src="./assets/strata-core.svg" alt="{{name}} — six years, by thickness" width="100%" />
</p>

### the log

{{log_paragraph}}

### deepest layers

- **{{project_one_name}}** — {{project_one_desc}}
- **{{project_two_name}}** — {{project_two_desc}}

— [{{website}}]({{website_url}}) · [@{{twitter}}](https://twitter.com/{{twitter}})
```

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{name}}` | in the block below | Display name — also set in the SVG | `Jane Doe` |
| `{{year_*}}` | inside the SVG | The six year labels and their commit counts | `2026 · 1,842 commits` |
| `{{log_paragraph}}` | in the block below | What the years actually contained | `Two quiet years, then a design system.` |
| `{{project_*_name}}` | in the block below | Project name, one per bullet | `acme design system` |
| `{{project_*_desc}}` | in the block below | One line on what it is | `tokens shipped to 14 teams` |
| `{{website}}` | in the block below | Domain shown to the reader | `jane.dev` |
| `{{website_url}}` | in the block below | Site URL with protocol | `https://jane.dev` |
| `{{twitter}}` | in the block below | Twitter/X handle, no @ | `janedoe` |
<!-- END:placeholders -->

## Customization Tips

- **Keep the contacts wavy.** Straight boundaries turn this straight back into a bar chart, which is the one thing it is trying not to be.
- **Six beds, maybe eight.** Below about twenty units a bed cannot hold its own grain and reads as a line.
- **Thin beds get leadered labels, not smaller type.** Shrinking the label to fit is how charts become unreadable.
- **Earth tones only.** The palette runs warm at the top and cool at the bottom, which is both how sediment ages and how a reader expects depth to feel.
- **Palette:** ground `#14100c` · beds `#e07a3f → #3a3448` · ink `#f0e6da` · muted `#a08f7e`.

## Technical notes

Thickness is a straight proportion, which is what makes the picture honest:

```js
const h = ((BOT - TOP) * commits) / totalCommits
```

The contact between two beds is a chain of quadratic segments with a few units of random offset on every control point and endpoint:

```js
for (let x = X0 + 60; x <= X1; x += 60) {
  const ctrlY = yy + (rand() - 0.5) * 11   // control point wanders more
  const endY  = yy + (rand() - 0.5) * 7    // endpoint wanders less
  d += ' Q' + (x - 30) + ' ' + ctrlY + ' ' + x + ' ' + endY
}
```

The control point wanders more than the endpoint (11 units against 7). That asymmetry is what makes the curve look deposited rather than wobbled — the line bulges between fixed points instead of zig-zagging through them.

Each bed is painted twice: once in its colour, once in black through its own turbulence filter at 55% opacity. Filtering the coloured fill directly would wash the hue out; laying grain over it as a separate pass keeps the colour and adds the texture.

The label cursor is the small piece of layout logic worth keeping. It tracks the lowest label placed so far, and any bed whose middle falls above that gets pushed down to the next free slot with a leader line drawn back to it — so thin beds stay labelled without their labels colliding.

## Credits

- Self-hosted SVG. No third-party services.
- CC0 — copy, modify, ship.
