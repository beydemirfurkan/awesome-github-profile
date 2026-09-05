# Risograph Poster

<!-- BEGIN:preview -->
![Risograph Poster](../../../assets/print-analog/risograph-poster.svg)
<!-- END:preview -->

> Two spot inks, screened sixty degrees apart and deliberately out of register — a poster that looks like it came off a drum duplicator, built entirely from `<pattern>` and `feTurbulence`.

<!-- BEGIN:meta -->
**Kind:** `svg` — ships a self-hosted SVG you download and commit  
**Difficulty:** Advanced  
**External services:** none  
**Tags:** `print` `risograph` `halftone` `misregistration` `self-hosted`
<!-- END:meta -->

## Preview

A warm uncoated field with your name set very large in fluoro pink, a federal-blue copy of the same word four pixels off behind it, and a halftoned blue disc on the right. Body copy sits on a light pink tint; registration marks sit in all four corners and a colour bar runs along the foot.

## Why this design

A risograph is not a filter — it is a stencil duplicator that prints one ink per pass, so the second pass never lands exactly on the first. Everything here follows from that.

The two inks are halftone `<pattern>` fills rotated to 15° and 75°. Sixty degrees apart is the classic separation angle, and it matters for a practical reason: at different angles the dots sit *between* each other instead of on top, so ordinary alpha compositing produces a believable two-ink overlap. No `mix-blend-mode`, no filter chain, nothing that can fail to be supported.

The headline is printed twice — blue first, four pixels off, then pink over it. That is the whole misregistration effect, and it is the detail that makes people look twice.

## Live showcase

![showcase](../../../assets/print-analog/risograph-poster.svg)

## Setup

1. Download [`risograph-poster.svg`](../../../assets/print-analog/risograph-poster.svg) into `./assets/risograph-poster.svg` of your profile repo.
2. Edit the two `JANE DOE` `<text>` elements — **both**, or the misregistration breaks. Keep them four pixels apart.
3. Edit the mono role line, the two body lines, and the footer edition note.
4. Optional: swap the two ink colours. Change them in the four `<pattern>` definitions *and* in the two headline `<text>` elements — the inks appear in both places.
5. Commit. Done.

## Copy & Customize

```markdown
<p align="center">
  <img src="./assets/risograph-poster.svg" alt="{{name}} — {{tagline}}" width="100%" />
</p>

### now

{{currently_paragraph}}

### selected work

- **{{project_one_name}}** — {{project_one_desc}}
- **{{project_two_name}}** — {{project_two_desc}}
- **{{project_three_name}}** — {{project_three_desc}}

— [{{website}}]({{website_url}}) · [@{{twitter}}](https://twitter.com/{{twitter}})
```

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{name}}` | in the block below | Display name — also set in both headline layers | `Jane Doe` |
| `{{tagline}}` | in the block below | Role line — also set in the SVG | `Frontend engineer` |
| `{{body_line_*}}` | inside the SVG | Two lines of poster body copy | `Building the parts nobody notices.` |
| `{{edition_note}}` | inside the SVG | The footer edition line | `EDITION OF 100` |
| `{{currently_paragraph}}` | in the block below | One or two sentences on what you are doing now | `Shaping the design system at Acme.` |
| `{{project_*_name}}` | in the block below | Project name, one per bullet | `acme design system` |
| `{{project_*_desc}}` | in the block below | One line on what it is | `tokens shipped to 14 teams` |
| `{{website}}` | in the block below | Domain shown to the reader | `jane.dev` |
| `{{website_url}}` | in the block below | Site URL with protocol | `https://jane.dev` |
| `{{twitter}}` | in the block below | Twitter/X handle, no @ | `janedoe` |
<!-- END:placeholders -->

## Customization Tips

- **Keep the offset at four pixels.** Two reads as a rendering bug; eight reads as a mistake. Four reads as ink.
- **Do not use more than two inks.** A riso with three spot colours stops looking like a riso and starts looking like a gradient. The constraint is the aesthetic.
- **Fluoro pink is the signature.** If you swap it, swap it for another fluoro — a muted pink kills the whole reference.
- **Tint under body copy, never a solid.** The `rp-pink-20` screen is about twenty per cent coverage; anything denser and the text stops being readable.
- **Palette:** fluoro pink `#f0338c` · federal blue `#1257a8` · stock `#f4efe3` · ink `#101a2c`.

## Technical notes

The halftone is one pattern per ink per density:

```svg
<pattern id="rp-pink-90" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
  <circle cx="3.5" cy="3.5" r="3.1" fill="#f0338c"/>
</pattern>
```

`patternUnits="userSpaceOnUse"` is required. With the default `objectBoundingBox`, the dot size would scale with whatever shape you fill, so a small shape would get tiny dots and a large one coarse dots — the screen has to be a property of the press, not of the artwork.

Density is just the dot radius against the seven-unit tile: `r="3.1"` is roughly ninety per cent coverage, `r="1.35"` about twenty. Rotating the tile rather than the artwork keeps every element on the same screen.

The stock is one `feTurbulence` flattened through a `feColorMatrix` into a warm grey alpha wash, painted over everything last at 60% — grain sits on top of ink in the real thing too.

## Credits

- Self-hosted SVG. No third-party services.
- CC0 — copy, modify, ship.
