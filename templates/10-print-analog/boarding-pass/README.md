# Boarding Pass

<!-- BEGIN:preview -->
![Boarding Pass](../../../assets/print-analog/boarding-pass.svg)
<!-- END:preview -->

> Your profile as an airline boarding pass — origin, destination, gate, seat, and a torn-off stub with a barcode. A status field that says `OPEN TO WORK` without a banner.

<!-- BEGIN:meta -->
**Kind:** `svg` — ships a self-hosted SVG you download and commit  
**Difficulty:** Intermediate  
**External services:** none  
**Tags:** `print` `ticket` `boarding-pass` `open-to-work` `self-hosted`
<!-- END:meta -->

## Preview

A cream thermal-stock ticket on a dark desk, with a navy header band. Your name is the passenger; a dashed route runs from a three-letter origin to a three-letter destination. A field strip along the foot carries flight, gate, seat, boarding time and status. On the right, past a real perforation with punched notches, the stub repeats the essentials over a drawn barcode.

## Why this design

A boarding pass is a form that everybody can already read, which is the point: nobody needs a legend to know that the big three-letter words are a journey and the small fields are details. That frees the template to say something with the fields instead of explaining them.

`IST → PRD` is the joke that makes it work — a route from where you are to production. The status field is the useful part: `OPEN TO WORK` reads as data on a ticket rather than as a plea.

The perforation is drawn as a real one: a dashed line with a punched notch at each edge, filled in the page colour so it cuts into the card rather than sitting on it. The barcode is drawn from a fixed bit pattern — it is a graphic, and it does not pretend to encode anything.

## Live showcase

![showcase](../../../assets/print-analog/boarding-pass.svg)

## Setup

1. Download [`boarding-pass.svg`](../../../assets/print-analog/boarding-pass.svg) into `./assets/boarding-pass.svg` of your profile repo.
2. Edit `DOE / JANE`, the two three-letter codes and their captions, and the five fields in the strip along the foot.
3. Edit the stub: passenger line, route line, and the sequence number.
4. Optional: change `STATUS`. It is the one field that does real work — `OPEN TO WORK`, `HEADS DOWN`, `ON SABBATICAL`.
5. Commit. Done.

## Copy & Customize

```markdown
<p align="center">
  <img src="./assets/boarding-pass.svg" alt="{{name}} — boarding pass" width="100%" />
</p>

### itinerary

{{itinerary_paragraph}}

### carry-on

- **{{project_one_name}}** — {{project_one_desc}}
- **{{project_two_name}}** — {{project_two_desc}}
- **{{project_three_name}}** — {{project_three_desc}}

— [{{website}}]({{website_url}}) · [@{{twitter}}](https://twitter.com/{{twitter}})
```

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{name}}` | in the block below | Display name — also set as the passenger | `Jane Doe` |
| `{{origin_code}}` | inside the SVG | Three-letter origin | `IST` |
| `{{destination_code}}` | inside the SVG | Three-letter destination | `PRD` |
| `{{field_*}}` | inside the SVG | The five foot fields: flight, gate, seat, boards, status | `GATE 47` |
| `{{itinerary_paragraph}}` | in the block below | Where you are headed, in a sentence or two | `Design systems, then motion.` |
| `{{project_*_name}}` | in the block below | Project name, one per bullet | `acme design system` |
| `{{project_*_desc}}` | in the block below | One line on what it is | `tokens shipped to 14 teams` |
| `{{website}}` | in the block below | Domain shown to the reader | `jane.dev` |
| `{{website_url}}` | in the block below | Site URL with protocol | `https://jane.dev` |
| `{{twitter}}` | in the block below | Twitter/X handle, no @ | `janedoe` |
<!-- END:placeholders -->

## Customization Tips

- **Three letters, always.** `IST → PRD` works because both codes are the same length. A four-letter destination breaks the symmetry that makes it read as a route.
- **The status field is the whole template.** If you are not saying something with it, use a different template.
- **Keep the notches filled in your page colour**, not white — they are holes, and a hole shows what is behind it.
- **The barcode is decoration.** Do not label it as a scannable code; it encodes nothing and claiming otherwise is the kind of small lie that costs trust.
- **Palette:** stock `#f7f3e9` · header `#12233d` · ink `#141821` · accent `#c8402a` · status green `#1a7f4b`.

## Technical notes

The perforation is three elements:

```svg
<line x1="856" y1="60" x2="856" y2="360" stroke="#c9c2b0" stroke-width="2"
      stroke-dasharray="2 7" stroke-linecap="round"/>
<circle cx="856" cy="44" r="11" fill="#191d24"/>
<circle cx="856" cy="376" r="11" fill="#191d24"/>
```

The dash pattern is deliberately lopsided — `2 7` gives short marks with long gaps, which is what a perf line looks like; an even `4 4` reads as a dashed border. `stroke-linecap="round"` turns each short mark into a dot.

The notches are circles centred exactly on the card edge and filled with the *page* colour, so half of each one punches into the card and the other half falls outside it. Centre them one pixel inside and you get a bite mark instead of a notch.

The grain is applied to a rect that repeats the card's geometry, including its `rx`, so the texture stops at the rounded corner rather than at a square edge.

## Credits

- Self-hosted SVG. No third-party services.
- CC0 — copy, modify, ship.
