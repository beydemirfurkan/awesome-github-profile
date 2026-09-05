# Type Specimen

<!-- BEGIN:preview -->
![Type Specimen](../../../assets/swiss-brutalist/type-specimen.svg)
<!-- END:preview -->

> Your name set the way a type foundry sets a specimen sheet: one word at five sizes, with cap-height, x-height and baseline ruled and labelled, and a glyph row underneath.

<!-- BEGIN:meta -->
**Kind:** `svg` — ships a self-hosted SVG you download and commit  
**Difficulty:** Basic  
**External services:** none  
**Tags:** `typography` `specimen` `serif` `editorial` `self-hosted`
<!-- END:meta -->

## Preview

A near-white sheet with your name at 108px in a serif, crossed by three thin red rules marking cap-height, x-height and the baseline. Below it the same name descends through four smaller settings, each with its size and leading noted in the margin. A glyph row and a colophon close the sheet.

## Why this design

A specimen sheet is a document that exists to show a typeface doing its job at several sizes. Borrowing that frame does something useful for a profile: it puts your name at a size nobody can ignore, and then justifies the size by turning the page into a demonstration.

The metric rules are the detail that makes it convincing. They are drawn where cap-height and x-height actually fall for the 108px setting, so they line up with the letterforms rather than floating near them.

The size ladder carries real information too — each step drops the setting and adds words, so the reader gets your name, then your role, then your location, then your whole practice, at exactly the sizes those things deserve.

## Live showcase

![showcase](../../../assets/swiss-brutalist/type-specimen.svg)

## Setup

1. Download [`type-specimen.svg`](../../../assets/swiss-brutalist/type-specimen.svg) into `./assets/type-specimen.svg` of your profile repo.
2. Edit the 108px specimen line, then the four ladder lines below it.
3. Check the three red rules still land on your letterforms. If you change the size, move them: cap-height is roughly 0.70 of the size above the baseline, x-height roughly 0.45.
4. Edit the colophon and the glyph row.
5. Commit. Done.

## Copy & Customize

```markdown
<p align="center">
  <img src="./assets/type-specimen.svg" alt="{{name}} — specimen" width="100%" />
</p>

### {{colophon_heading}}

{{colophon_paragraph}}

### set in

- **{{project_one_name}}** — {{project_one_desc}}
- **{{project_two_name}}** — {{project_two_desc}}

— [{{website}}]({{website_url}}) · [@{{twitter}}](https://twitter.com/{{twitter}})
```

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{name}}` | in the block below | Display name — appears at all five settings in the SVG | `Jane Doe` |
| `{{ladder_*}}` | inside the SVG | The four smaller settings, each adding detail | `Jane Doe — frontend engineer` |
| `{{glyph_row}}` | inside the SVG | The alphabet and figures row | `ABCDEFGHIJKLM… 0123456789` |
| `{{colophon_heading}}` | in the block below | Heading for your note | `colophon` |
| `{{colophon_paragraph}}` | in the block below | A paragraph about how you work | `Set in whatever the reader has installed.` |
| `{{project_*_name}}` | in the block below | Project name, one per bullet | `acme design system` |
| `{{project_*_desc}}` | in the block below | One line on what it is | `tokens shipped to 14 teams` |
| `{{website}}` | in the block below | Domain shown to the reader | `jane.dev` |
| `{{website_url}}` | in the block below | Site URL with protocol | `https://jane.dev` |
| `{{twitter}}` | in the block below | Twitter/X handle, no @ | `janedoe` |
<!-- END:placeholders -->

## Customization Tips

- **Move the rules if you change the size.** Three red lines that miss the letterforms are worse than no rules at all — they announce that the measurement is decorative.
- **Each ladder step should add words, not repeat them.** The point of a size ladder is that small type can carry more.
- **Serif or grotesque, but commit.** This works with either; it does not work with both.
- **Only system fonts render here.** GitHub serves SVG through an image proxy, so a webfont will not load — Georgia and the ui-monospace stack are what you actually get.
- **Palette:** sheet `#fbf9f4` · ink `#14110d` · muted `#8a8478` · rules `#c9402c`.

## Technical notes

There is no clever technique in this file, which is the point — it is one `<text>` element per line and three `<line>` elements, and it holds its own against templates twenty times its size.

The one thing worth knowing is that GitHub renders README images through a proxy, so `@font-face` never loads and `font-family` falls back to whatever the reader's machine has. Every size here is set in a stack that resolves on every platform: `Georgia, 'Times New Roman', serif`. A specimen sheet that renders in a substitute face on half of its readers is a specimen of nothing.

The metric positions are literal. For the 108px line the baseline sits at `y="178"`, x-height at 140 and cap-height at 102 — that is 38 units and 76 units above the baseline, or 0.35 and 0.70 of the size, which is close enough to Georgia's real metrics to line up.

## Credits

- Self-hosted SVG. No third-party services.
- CC0 — copy, modify, ship.
