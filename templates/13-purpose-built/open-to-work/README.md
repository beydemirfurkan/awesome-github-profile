# Open to Work

<!-- BEGIN:preview -->
![Open to Work](../../../assets/purpose-built/open-to-work.svg)
<!-- END:preview -->

> Everything a hiring manager checks in the first ten seconds, in the order they check it — including the column almost nobody writes down: what you are *not* looking for.

<!-- BEGIN:meta -->
**Kind:** `svg` — ships a self-hosted SVG you download and commit  
**Difficulty:** Basic  
**External services:** none  
**Tags:** `hiring` `availability` `open-to-work` `utility` `self-hosted`
<!-- END:meta -->

## Preview

A light card under a green rule. A pulsing status pill reads OPEN TO WORK, with the date it was last updated opposite. Your name and role sit above two columns — what you want, ticked in green; what you do not, crossed in amber. A facts strip along the foot carries availability, timezone, contract type and notice period, next to a black contact button.

## Why this design

Most "open to work" banners say only that you are open to work, which is the least useful sentence in the transaction. The reader already assumed it. What they actually need is four facts and a filter.

The four facts are the strip along the bottom: when you are free, what timezone you overlap, what shape of contract, and how long your notice is. Those decide whether the conversation is worth starting, and they are the ones people email to ask.

The filter is the second column. Writing down what you do not want feels rude and is the single most useful thing on the card: it saves the reader a message and it saves you three. It is also the part that makes the rest credible — a card that only says yes reads as a wish, not as a position.

The status pill pulses. It is the one animated element, because it is the one piece of information with a shelf life.

## Live showcase

![showcase](../../../assets/purpose-built/open-to-work.svg)

## Setup

1. Download [`open-to-work.svg`](../../../assets/purpose-built/open-to-work.svg) into `./assets/open-to-work.svg` of your profile repo.
2. Edit the status pill, and the `UPDATED` date beside it. **Update that date whenever you touch the card** — a stale one is worse than none.
3. Edit your name, role, and the three entries in each column.
4. Edit the four facts and the contact button.
5. When you are no longer looking, delete the file rather than editing the pill to say something else.

## Copy & Customize

```markdown
<p align="center">
  <img src="./assets/open-to-work.svg" alt="{{name}} — open to work" width="100%" />
</p>

### what I've been doing

{{recent_paragraph}}

### where you can see it

- **{{project_one_name}}** — {{project_one_desc}}
- **{{project_two_name}}** — {{project_two_desc}}
- **{{project_three_name}}** — {{project_three_desc}}

**Reach me:** [{{email}}](mailto:{{email}}) · [{{website}}]({{website_url}}) · [@{{twitter}}](https://twitter.com/{{twitter}})
```

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{name}}` | in the block below | Display name — also set on the card | `Jane Doe` |
| `{{role_line}}` | inside the SVG | Role and specialisms under your name | `Senior frontend engineer` |
| `{{looking_for_*}}` | inside the SVG | The three things you want | `Product teams that own a surface` |
| `{{not_looking_for_*}}` | inside the SVG | The three things you do not | `Relocation, or on-site five days` |
| `{{fact_*}}` | inside the SVG | Availability, timezone, type, notice | `UTC+3` |
| `{{recent_paragraph}}` | in the block below | What you have been working on | `Two years on one design system.` |
| `{{email}}` | in the block below | Contact address | `hello@jane.dev` |
| `{{project_*_name}}` | in the block below | Project name, one per bullet | `acme design system` |
| `{{project_*_desc}}` | in the block below | One line on what it is | `tokens shipped to 14 teams` |
| `{{website}}` | in the block below | Domain shown to the reader | `jane.dev` |
| `{{website_url}}` | in the block below | Site URL with protocol | `https://jane.dev` |
| `{{twitter}}` | in the block below | Twitter/X handle, no @ | `janedoe` |
<!-- END:placeholders -->

## Customization Tips

- **Update the date every time.** An `UPDATED` stamp from eight months ago tells the reader the answer is probably no.
- **Fill the second column honestly.** Vague negatives ("bad culture") are worthless; specific ones ("take-home over 4h") do real filtering.
- **Put a number on the notice period.** "Flexible" reads as "I have not thought about it".
- **Delete the file when you stop looking.** Editing the pill to say `NOT LOOKING` leaves a hiring card on your profile, which is not what you want it to be doing.
- **Palette:** card `#f7f7f5` · ink `#131316` · yes `#16a34a` · no `#a16207`.

## Technical notes

The only animated element is the dot in the status pill, and that is deliberate. Motion is an attention claim, and on this card exactly one thing has earned it — the piece of information that expires.

```svg
<circle cx="94" cy="63" r="5" fill="#16a34a">
  <animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite"/>
</circle>
```

It fades to 0.3 rather than to 0. A dot that disappears entirely reads as a rendering glitch on the frame where it is gone; one that dims reads as a pulse.

The ticks and crosses are stroked paths rather than glyphs, for the same reason the rest of this repository avoids emoji: a check mark from a system font arrives in whatever colour and weight the platform decides, and this card has exactly two semantic colours to protect.

The contact button is a filled rect with centred text, not a link — SVG served through GitHub's image proxy cannot carry a working `<a>`. Repeat the address in the markdown underneath, which the Copy block does.

## Credits

- Self-hosted SVG. No third-party services.
- CC0 — copy, modify, ship.
