# Swiss Grid

<!-- BEGIN:preview -->
![Swiss Grid](../../../assets/swiss-brutalist/swiss-grid.svg)
<!-- END:preview -->

> A twelve-column grid that is drawn rather than hidden. Everything sits on a column edge or a baseline, and the single red is the only thing allowed to break the black.

<!-- BEGIN:meta -->
**Kind:** `svg` — ships a self-hosted SVG you download and commit  
**Difficulty:** Intermediate  
**External services:** none  
**Tags:** `swiss` `grid` `typography` `editorial` `self-hosted`
<!-- END:meta -->

## Preview

A bone-white field with twelve faint columns and four baselines showing through. Your name runs across seven of them at 140px — the surname in red — with a three-line statement set ragged-right in the last four columns. A four-part index sits on the bottom baseline between two rules.

## Why this design

Swiss layout is not a look, it is a constraint: pick a measure, divide it, and refuse to place anything off the divisions. Once you accept that, most design decisions stop being decisions.

The grid is left visible at about six per cent — enough that a reader can see the structure the type is obeying, which is the whole argument. Hide it and this becomes an ordinary left-aligned header.

One accent, used twice: the surname and a four-pixel rule under the statement. A third use would start to look like a colour scheme.

## Live showcase

![showcase](../../../assets/swiss-brutalist/swiss-grid.svg)

## Setup

1. Download [`swiss-grid.svg`](../../../assets/swiss-brutalist/swiss-grid.svg) into `./assets/swiss-grid.svg` of your profile repo.
2. Edit the two halves of the name. They are separate `<text>` elements so the second can take the accent — keep the second one on a column edge (`x="470"`).
3. Edit the three statement lines and the four index entries.
4. Optional: change the grid opacity on `#sg-col`. Above 0.1 the columns start competing with the type; below 0.03 they may as well not be there.
5. Commit. Done.

## Copy & Customize

```markdown
<p align="center">
  <img src="./assets/swiss-grid.svg" alt="{{name}} — {{tagline}}" width="100%" />
</p>

### {{statement_heading}}

{{statement_paragraph}}

### index

- **{{project_one_name}}** — {{project_one_desc}}
- **{{project_two_name}}** — {{project_two_desc}}
- **{{project_three_name}}** — {{project_three_desc}}

— [{{website}}]({{website_url}}) · [@{{twitter}}](https://twitter.com/{{twitter}})
```

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{name}}` | in the block below | Display name — split across two elements in the SVG | `Jane Doe` |
| `{{tagline}}` | in the block below | Role line in the running head | `Frontend engineer` |
| `{{statement_*}}` | inside the SVG | The three ragged-right statement lines | `Interfaces that hold up` |
| `{{index_*}}` | inside the SVG | The four numbered index entries | `Design systems` |
| `{{statement_heading}}` | in the block below | Heading above your statement paragraph | `what I do` |
| `{{statement_paragraph}}` | in the block below | A paragraph in your own words | `I build design systems that survive adoption.` |
| `{{project_*_name}}` | in the block below | Project name, one per bullet | `acme design system` |
| `{{project_*_desc}}` | in the block below | One line on what it is | `tokens shipped to 14 teams` |
| `{{website}}` | in the block below | Domain shown to the reader | `jane.dev` |
| `{{website_url}}` | in the block below | Site URL with protocol | `https://jane.dev` |
| `{{twitter}}` | in the block below | Twitter/X handle, no @ | `janedoe` |
<!-- END:placeholders -->

## Customization Tips

- **Everything lands on a column.** The `x` values in this file are all multiples of the 88-unit column. If you add an element, snap it to one.
- **Two type styles, and that is the budget.** A grotesque for content, a monospace for labels. A third face turns Swiss into a moodboard.
- **Do not centre anything.** Swiss layouts are asymmetric on purpose; the tension between a wide column and a narrow one is what makes them feel designed.
- **One accent, twice.** Red on the surname and the statement rule. If you want a third red thing, take one of the first two away.
- **Palette:** stock `#f2f0eb` · ink `#0f0f0f` · muted `#6d6a63` · accent `#d0021b`.

## Technical notes

The columns are a single `<pattern>` rather than twelve rectangles:

```svg
<pattern id="sg-col" x="72" y="0" width="88" height="420" patternUnits="userSpaceOnUse">
  <rect x="0" y="0" width="76" height="420" fill="#0f0f0f" opacity="0.055"/>
</pattern>
```

The tile is 88 wide with a 76-wide bar in it, so the 12-unit remainder *is* the gutter — the gap is defined by what the pattern does not paint. Offsetting the pattern by `x="72"` starts the grid at the margin instead of at the artboard edge, which is why the first column lines up with the head rule.

The horizontal baselines are drawn separately, at 84-unit intervals. A Swiss grid is two-dimensional; only ruling the columns gives you a striped background rather than a grid.

## Credits

- Self-hosted SVG. No third-party services.
- CC0 — copy, modify, ship.
