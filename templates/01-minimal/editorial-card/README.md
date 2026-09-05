# Editorial Card

<!-- BEGIN:preview -->
![Editorial Card](../../../assets/minimal/editorial-card.svg)
<!-- END:preview -->

> A magazine-style profile that earns attention through restraint, not noise.

<!-- BEGIN:meta -->
**Kind:** `markdown` — pure markdown — no images at all  
**Difficulty:** Basic  
**External services:** none  
**Tags:** `minimal` `serif` `editorial` `no-deps`
<!-- END:meta -->

## Preview

A printed-page aesthetic: a heavy black masthead, a single hairline divider, two short editorial paragraphs, and a footer line in faded monospace. No images, no badges, no animations — and somehow more memorable than most.

Works identically in light and dark themes because it relies on GitHub's default markdown rendering with no inline color.

## Copy & Customize

```markdown
# {{name}}

---

> *{{tagline}}*

— **CURRENTLY**
{{currently_line}}

— **ELSEWHERE**
[{{website}}]({{website_url}}) · [@{{twitter}}](https://twitter.com/{{twitter}}) · [in/{{linkedin}}](https://linkedin.com/in/{{linkedin}})

— **WORK**
1. **{{project_one_name}}** — {{project_one_desc}}
2. **{{project_two_name}}** — {{project_two_desc}}
3. **{{project_three_name}}** — {{project_three_desc}}

---

<sub>issue №01 · 2026 · written in this README</sub>
```

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{name}}` | in the block below | Display name | `Jane Doe` |
| `{{tagline}}` | in the block below | One-liner under the name (italic) | `Frontend engineer who writes essays in code` |
| `{{currently_line}}` | in the block below | What you're working on right now | `Building the design system at Acme.` |
| `{{website}}` | in the block below | Site domain shown to the reader | `jane.dev` |
| `{{website_url}}` | in the block below | Site URL with protocol | `https://jane.dev` |
| `{{twitter}}` | in the block below | Twitter/X handle, no @ | `janedoe` |
| `{{linkedin}}` | in the block below | LinkedIn slug | `janedoe` |
| `{{project_*_name}}` | in the block below | nth project name | `acme design system` |
| `{{project_*_desc}}` | in the block below | n-sentence description | `A token-driven UI kit shipped to 14 teams.` |
<!-- END:placeholders -->

## Customization Tips

- **Keep tagline under 60 characters.** Editorial layouts breathe; long lines look crammed.
- **Drop entries you don't need.** If you only have two projects, delete the third — don't pad. Restraint is the point.
- **Want a darker masthead?** Wrap the title in a blockquote: `> # {{name}}` for a left-bar effect.
- **Palette:** white surface · `#111` text · `#444` muted · `#777` labels — works in both themes by virtue of using none.

## Credits

- No third-party services. Pure CommonMark + GitHub Flavored Markdown.
