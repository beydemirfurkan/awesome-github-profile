# Blueprint Schematic

<!-- BEGIN:preview -->
![Blueprint Schematic](../../../assets/print-analog/blueprint-schematic.svg)
<!-- END:preview -->

> Your profile drawn as an exploded technical elevation on cyanotype stock — leadered, numbered, dimensioned, with a title block. The linework wobbles very slightly, because a drafting hand does.

<!-- BEGIN:meta -->
**Kind:** `svg` — ships a self-hosted SVG you download and commit  
**Difficulty:** Advanced  
**External services:** none  
**Tags:** `print` `blueprint` `technical-drawing` `displacement` `self-hosted`
<!-- END:meta -->

## Preview

A cyan grid on deep blue, framed. Four plates float in axonometric, pulled apart along a dashed assembly axis, each leadered out to a numbered callout naming the section of your README it stands for. A dimension line runs beneath them, and a title block sits bottom-right with your name, scale, sheet and revision.

## Why this design

A blueprint is a genre with rules, and the rules are what make it read: an assembly axis, leader lines that break at right angles, part numbers in circles, a dimension line with arrows on both ends, and a title block in the bottom-right corner. Get those and the drawing is convincing before anyone reads a word of it.

The one thing separating "drafted" from "plotted" is that a human line is never perfectly straight. A `feTurbulence` at very low frequency driving a `feDisplacementMap` at `scale="2.4"` bends every path by a couple of pixels over its length. Below two it is invisible; above four it reads as damage rather than as a hand.

The filter is on the linework group only. Displacing text turns it to mush.

## Live showcase

![showcase](../../../assets/print-analog/blueprint-schematic.svg)

## Setup

1. Download [`blueprint-schematic.svg`](../../../assets/print-analog/blueprint-schematic.svg) into `./assets/blueprint-schematic.svg` of your profile repo.
2. Edit the four callouts (`01`–`04`) to name your own README sections.
3. Edit the title block: name, drawn-by, sheet, revision, date, site.
4. Optional: change `scale` on `#bs-hand` to dial the hand-drawn wobble — 0 for a plotter, 2.4 as shipped, 4 for a bad day.
5. Commit. Done.

## Copy & Customize

```markdown
<p align="center">
  <img src="./assets/blueprint-schematic.svg" alt="{{name}} — profile assembly" width="100%" />
</p>

### 01 — hero

{{section_one_note}}

### 02 — currently

{{section_two_note}}

### 03 — work

- **{{project_one_name}}** — {{project_one_desc}}
- **{{project_two_name}}** — {{project_two_desc}}

### 04 — contact

[{{website}}]({{website_url}}) · [@{{twitter}}](https://twitter.com/{{twitter}})
```

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{name}}` | in the block below | Display name — also set in the title block | `Jane Doe` |
| `{{callout_*}}` | inside the SVG | The four numbered callout labels | `HERO — self-hosted SVG` |
| `{{drawn_by}}` | inside the SVG | Title-block author field | `janedoe` |
| `{{revision}}` | inside the SVG | Title-block revision letter | `C` |
| `{{section_one_note}}` | in the block below | A line about your hero section | `One self-hosted SVG, no services.` |
| `{{section_two_note}}` | in the block below | A line about what you are doing now | `Shaping the design system at Acme.` |
| `{{project_*_name}}` | in the block below | Project name, one per bullet | `acme design system` |
| `{{project_*_desc}}` | in the block below | One line on what it is | `tokens shipped to 14 teams` |
| `{{website}}` | in the block below | Domain shown to the reader | `jane.dev` |
| `{{website_url}}` | in the block below | Site URL with protocol | `https://jane.dev` |
| `{{twitter}}` | in the block below | Twitter/X handle, no @ | `janedoe` |
<!-- END:placeholders -->

## Customization Tips

- **Keep the callout numbers sequential and the leaders horizontal.** Diagonal leaders look like a diagram; horizontal ones look like a drawing.
- **The title block is not decoration.** Fill every field. An empty `REV` is the tell that this is a picture of a blueprint rather than one.
- **Do not add colour.** Cyanotype is one ink on one ground. A second hue turns it into an infographic.
- **The grid is two patterns, not one** — a 20-unit minor and a 100-unit major. Delete the major and the drawing loses its scale.
- **Palette:** ground `#07314e` · line `#dff1fb` · secondary `#7fc4e6` · grid `#2f7fae`.

## Technical notes

The hand:

```svg
<filter id="bs-hand" x="-3%" y="-3%" width="106%" height="106%">
  <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="8" result="t"/>
  <feDisplacementMap in="SourceGraphic" in2="t" scale="2.4" xChannelSelector="R" yChannelSelector="G"/>
</filter>
```

The low `baseFrequency` is what makes it read as a hand rather than as noise: at 0.022 the turbulence field varies over roughly forty-five units, so a line bends *once* across its length instead of vibrating. Raise it to 0.2 and the same filter produces a torn edge.

The filter region has to be grown past the element (`x="-3%" width="106%"`) or displacement clips at the bounding box and every line gets a flat end.

Arrowheads are a `<marker>` with `orient="auto-start-reverse"`, which lets one marker definition serve both ends of the dimension line — the start copy flips itself.

## Credits

- Self-hosted SVG. No third-party services.
- CC0 — copy, modify, ship.
