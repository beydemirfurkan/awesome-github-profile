# Brutalist Slab

<!-- BEGIN:preview -->
![Brutalist Slab](../../../assets/swiss-brutalist/brutalist-slab.svg)
<!-- END:preview -->

> Every element is a box with a six-pixel border. Boxes overlap instead of aligning, nothing is rounded, and the structure is the only decoration.

<!-- BEGIN:meta -->
**Kind:** `svg` — ships a self-hosted SVG you download and commit  
**Difficulty:** Basic  
**External services:** none  
**Tags:** `brutalist` `slab` `high-contrast` `no-radius` `self-hosted`
<!-- END:meta -->

## Preview

A black slab carrying your name in heavy sans, with a yellow slab bordered in black lying across its corner. Beneath them, four hard-bordered cells butt straight up against each other with no gaps. Registration ticks along the top edge are the only ornament, and they are a measurement.

## Why this design

Brutalism in interfaces usually means "I removed the border-radius". The actual move is structural: let the construction show, and let elements collide instead of politely aligning.

The yellow slab overlaps the black one. That overlap is the layout — it is what stops this reading as three stacked boxes. But it stops short of the index row, because overlapping *text* is not a style, it is a bug.

Six pixels of border, no radius, no shadow. At that weight the border becomes a shape in its own right and the cells read as objects rather than as containers.

## Live showcase

![showcase](../../../assets/swiss-brutalist/brutalist-slab.svg)

## Setup

1. Download [`brutalist-slab.svg`](../../../assets/swiss-brutalist/brutalist-slab.svg) into `./assets/brutalist-slab.svg` of your profile repo.
2. Edit the name, the role line and the location stamp on the black slab.
3. Edit the three-line statement on the yellow slab. Keep it to three lines — the slab is sized for exactly that.
4. Edit the four index cells: label, big value, small note.
5. Commit. Done.

## Copy & Customize

```markdown
<p align="center">
  <img src="./assets/brutalist-slab.svg" alt="{{name}} — {{tagline}}" width="100%" />
</p>

## {{statement_heading}}

{{statement_paragraph}}

## WORK

- **{{project_one_name}}** — {{project_one_desc}}
- **{{project_two_name}}** — {{project_two_desc}}
- **{{project_three_name}}** — {{project_three_desc}}

**{{website}}** · [@{{twitter}}](https://twitter.com/{{twitter}}) · [{{website_url}}]({{website_url}})
```

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{name}}` | in the block below | Display name, set on the black slab | `Jane Doe` |
| `{{tagline}}` | in the block below | Role line under the name | `Frontend engineer` |
| `{{slab_line_*}}` | inside the SVG | The three lines on the yellow slab | `NO FRAMEWORKS WERE` |
| `{{cell_*}}` | inside the SVG | The four index cells: label, value, note | `STREAK · 47 DAYS` |
| `{{statement_heading}}` | in the block below | Heading for your statement | `WHAT I DO` |
| `{{statement_paragraph}}` | in the block below | A paragraph, ideally blunt | `I make interfaces that do not need a tour.` |
| `{{project_*_name}}` | in the block below | Project name, one per bullet | `acme design system` |
| `{{project_*_desc}}` | in the block below | One line on what it is | `tokens shipped to 14 teams` |
| `{{website}}` | in the block below | Domain shown to the reader | `jane.dev` |
| `{{website_url}}` | in the block below | Site URL with protocol | `https://jane.dev` |
| `{{twitter}}` | in the block below | Twitter/X handle, no @ | `janedoe` |
<!-- END:placeholders -->

## Customization Tips

- **Say something on the yellow slab.** It is the loudest element on the page; wasting it on "welcome to my profile" is the one way to make this template bad.
- **Keep the overlap on the black slab only.** Overlapping the index row clips text, and clipped text reads as broken rather than as brutalist.
- **No radius anywhere.** One rounded corner and the whole argument collapses.
- **Yellow is a warning colour, so use it like one** — once, on the thing you most want read.
- **Palette:** bone `#e9e6df` · ink `#0a0a0a` · warning `#ffd400` · muted `#5c5851`.

## Technical notes

Nothing here needs a filter, a gradient or an animation. The entire file is rectangles and text, and it is the smallest asset in the repository.

The one subtlety is draw order. The black slab is drawn first and is never given a border; the yellow slab is drawn second *with* a six-pixel border, so its border reads as a cut through the black. Reverse the order and the effect inverts — the black would sit on top and the yellow would look like a background.

Border weight is the only variable worth playing with. Six is heavy enough to become a shape; at three it reads as a hairline box, and at ten the cells start losing their interiors.

## Credits

- Self-hosted SVG. No third-party services.
- CC0 — copy, modify, ship.
