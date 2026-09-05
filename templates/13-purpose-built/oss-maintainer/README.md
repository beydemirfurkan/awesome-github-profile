# OSS Maintainer

<!-- BEGIN:preview -->
![OSS Maintainer](../../../assets/purpose-built/oss-maintainer.svg)
<!-- END:preview -->

> A maintainer card that sets expectations before anyone opens an issue: response times, triage day, security policy, and a count of good first issues.

<!-- BEGIN:meta -->
**Kind:** `svg` — ships a self-hosted SVG you download and commit  
**Difficulty:** Basic  
**External services:** none  
**Tags:** `open-source` `maintainer` `expectations` `utility` `self-hosted`
<!-- END:meta -->

## Preview

A dark table of the projects you maintain — name, one-line description, stars, open issues, a green pill counting good first issues, and the last release with its age. Along the foot, four commitments: first response, triage day, review turnaround and where the security policy lives. A sponsor button sits top right.

## Why this design

The hardest part of maintaining something is not the code, it is the expectation gap. Somebody opens an issue on a Saturday and hears nothing for a week; both sides end up annoyed at a problem that a single sentence would have prevented.

So the foot of this card is a set of promises, and they are the reason it exists: first response within 72 hours, triage on Thursdays, review in one to two weeks. Publishing those converts silence from a slight into a schedule.

The columns are ordered by what a contributor actually needs. Stars are the smallest number on the card and sit in the middle; the last release and its *age* sit at the end, because "4mo ago" answers the real question, which is whether the project is alive. The good-first-issue count is the one thing given colour, because it is the only column that is an invitation.

## Live showcase

![showcase](../../../assets/purpose-built/oss-maintainer.svg)

## Setup

1. Download [`oss-maintainer.svg`](../../../assets/purpose-built/oss-maintainer.svg) into `./assets/oss-maintainer.svg` of your profile repo.
2. Edit the three project rows: name, description, stars, open issues, good-first count, last release and its age.
3. Edit the four commitments along the foot. **Only promise what you will actually do** — a published response time you miss is worse than none.
4. Point the sponsor pill at your own funding page, or delete that group.
5. Commit. Done.

## Copy & Customize

```markdown
<p align="center">
  <img src="./assets/oss-maintainer.svg" alt="{{name}} — maintainer" width="100%" />
</p>

### how to contribute

{{contributing_paragraph}}

Start with a [good first issue]({{good_first_url}}). Read [CONTRIBUTING.md]({{contributing_url}}) first — it is short.

### what I maintain

- **{{project_one_name}}** — {{project_one_desc}}
- **{{project_two_name}}** — {{project_two_desc}}
- **{{project_three_name}}** — {{project_three_desc}}

— [{{website}}]({{website_url}}) · [@{{twitter}}](https://twitter.com/{{twitter}})
```

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{name}}` | in the block below | Display name — also set on the card | `Jane Doe` |
| `{{repo_*}}` | inside the SVG | The three project rows and their figures | `acme-design-system · 1,243` |
| `{{commitment_*}}` | inside the SVG | First response, triage day, review, security | `within 72h` |
| `{{contributing_paragraph}}` | in the block below | How you want people to approach the projects | `Open an issue before a large PR.` |
| `{{good_first_url}}` | in the block below | Link to your good-first-issue filter | `https://github.com/jane/acme/labels/good%20first%20issue` |
| `{{contributing_url}}` | in the block below | Link to your contributing guide | `https://github.com/jane/acme/blob/main/CONTRIBUTING.md` |
| `{{project_*_name}}` | in the block below | Project name, one per bullet | `acme design system` |
| `{{project_*_desc}}` | in the block below | One line on what it is | `tokens shipped to 14 teams` |
| `{{website}}` | in the block below | Domain shown to the reader | `jane.dev` |
| `{{website_url}}` | in the block below | Site URL with protocol | `https://jane.dev` |
| `{{twitter}}` | in the block below | Twitter/X handle, no @ | `janedoe` |
<!-- END:placeholders -->

## Customization Tips

- **Only publish times you will hit.** This card converts a vague obligation into a stated one; a missed stated promise costs more goodwill than never having made it.
- **Keep the release age, not just the version.** `v0.9.0` says nothing. `v0.9.0 · 4mo ago` tells a contributor what they are walking into.
- **Say when a project is looking for co-maintainers.** It is the highest-value sentence on the card and it costs one line.
- **Three projects.** If you maintain twelve, list the three that need help.
- **Palette:** GitHub dark surface `#0d1117` · link `#58a6ff` · invitation `#3fb950` · sponsor `#db61a2`.

## Technical notes

Nothing here animates, and that is right for the content — a card of commitments should not blink.

The good-first-issue count is a filled pill rather than plain text. It is the only element on the card given a background, which is a cheap and reliable way to say "this is the one to click" without an arrow or a colour the rest of the palette does not have.

The column order is the design. Reading left to right you get identity, then substance, then popularity, then health — and popularity is deliberately the small number in the middle. Most maintainer cards put stars first and largest, which optimises the layout for the maintainer's ego rather than for the contributor's decision.

Row separators are drawn above each row rather than below, so the header rule and the first row rule are the same element. It is a small thing, but it is why the table has no doubled line at the top.

## Credits

- Self-hosted SVG. No third-party services.
- CC0 — copy, modify, ship.
