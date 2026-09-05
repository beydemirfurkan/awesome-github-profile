# Vinyl Sleeve

<!-- BEGIN:preview -->
![Vinyl Sleeve](../../../assets/print-analog/vinyl-sleeve.svg)
<!-- END:preview -->

> A twelve-inch sleeve with the record drawn behind it, so the disc reads as half pulled out. Your projects are the tracklist, with run times.

<!-- BEGIN:meta -->
**Kind:** `svg` — ships a self-hosted SVG you download and commit  
**Difficulty:** Intermediate  
**External services:** none  
**Tags:** `print` `vinyl` `record` `tracklist` `self-hosted`
<!-- END:meta -->

## Preview

A cream sleeve on the left carrying a two-colour cover — an orange disc, concentric outlines and a navy band — with your name set heavy beneath it. Behind and to the right, a black record turns slowly on its spindle, grooves catching a diagonal sheen, an orange label at the centre. The tracklist runs down the right: side, title, run time.

## Why this design

The sleeve has to be in front of the record. That single ordering is what makes the disc look pulled out rather than parked next to a square — draw the record first, then print the sleeve over it, and the overlap does all the work.

Grooves are concentric circles with slightly uneven spacing and every seventh ring brighter. Perfectly even rings read as a dartboard; the irregularity is what makes it read as a pressing.

Run times are the detail people notice. A project with a length feels like something that took time, which is more honest than a star count.

## Live showcase

![showcase](../../../assets/print-analog/vinyl-sleeve.svg)

## Setup

1. Download [`vinyl-sleeve.svg`](../../../assets/print-analog/vinyl-sleeve.svg) into `./assets/vinyl-sleeve.svg` of your profile repo.
2. Edit the sleeve: name, the `SELECTED WORKS` line, and the foot line.
3. Edit the five tracklist rows — side marker, title, run time. Give each project a plausible length.
4. Edit the label: monogram and the `33⅓ RPM` line.
5. Optional: change the rotation `dur` on the record group. Twenty-four seconds is slow enough to notice without being distracting.
6. Commit. Done.

## Copy & Customize

```markdown
<p align="center">
  <img src="./assets/vinyl-sleeve.svg" alt="{{name}} — selected works" width="100%" />
</p>

### liner notes

{{liner_notes}}

### side a

- **{{track_one_name}}** — {{track_one_desc}}
- **{{track_two_name}}** — {{track_two_desc}}
- **{{track_three_name}}** — {{track_three_desc}}

— [{{website}}]({{website_url}}) · [@{{twitter}}](https://twitter.com/{{twitter}})
```

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{name}}` | in the block below | Display name — also set on the sleeve | `Jane Doe` |
| `{{monogram}}` | inside the SVG | Two letters on the record label | `JD` |
| `{{tracklist_*}}` | inside the SVG | The five tracklist rows | `A1 · acme design system · 4:12` |
| `{{liner_notes}}` | in the block below | A paragraph about the record, so to speak | `Five years of interface work, in order.` |
| `{{track_*_name}}` | in the block below | Project name, one per bullet | `acme design system` |
| `{{track_*_desc}}` | in the block below | One line on what it is | `tokens shipped to 14 teams` |
| `{{website}}` | in the block below | Domain shown to the reader | `jane.dev` |
| `{{website_url}}` | in the block below | Site URL with protocol | `https://jane.dev` |
| `{{twitter}}` | in the block below | Twitter/X handle, no @ | `janedoe` |
<!-- END:placeholders -->

## Customization Tips

- **Give every track a run time.** It is the detail that sells the conceit, and it costs you nothing to decide that a two-year project ran 4:12.
- **Keep the cover to two colours.** Sleeve art is cheap to print and expensive to design; two flat inks and one shape is the genre.
- **Do not speed the rotation up.** A record turns at 33⅓ rpm — under two seconds a revolution. At that speed in a README it is a distraction, so this runs at 24s and reads as motion rather than as a spinner.
- **Five tracks, maximum seven.** A tracklist that needs scrolling is a discography.
- **Palette:** stock `#efe4d4` · label orange `#c8552e` · sleeve navy `#1c2a4a` · ground `#151110`.

## Technical notes

The grooves are generated rather than drawn:

```js
for (let r = 66, i = 0; r < 170; r += 3.1 + (i % 4 === 0 ? 1.4 : 0), i++) {
  const bright = i % 7 === 3
  // <circle r={r} stroke={bright ? '#3a302a' : '#241d19'} .../>
}
```

Two irregularities, both deliberate: every fourth ring gets extra spacing, and every seventh is lighter and thicker. Either one alone still reads as a target; together they read as a record.

The sheen is a single `<linearGradient>` with four stops — two transparent, two barely white — painted over the disc *outside* the rotating group. Rotating the highlight with the record would look like a spinning mirror; keeping it fixed makes the record turn underneath a static light source, which is how light actually works.

The spindle hole is a small circle in the page colour, not black. On a dark ground the difference is invisible until you change the background, at which point a black hole stops being a hole.

## Credits

- Self-hosted SVG. No third-party services.
- CC0 — copy, modify, ship.
