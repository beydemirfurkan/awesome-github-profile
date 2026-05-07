# Editorial Card

![preview](../../../assets/previews/editorial-card.svg)

> A magazine-style profile that earns attention through restraint, not noise.

**Difficulty:** Basic
**External services:** none (pure markdown)
**Tags:** `minimal` `serif` `editorial` `no-deps`

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

| Token                       | Description                                | Example                                      |
|-----------------------------|--------------------------------------------|----------------------------------------------|
| `{{name}}`                  | Display name                               | `Jane Doe`                                   |
| `{{tagline}}`               | One-liner under the name (italic)          | `Frontend engineer who writes essays in code`|
| `{{currently_line}}`        | What you're working on right now           | `Building the design system at Acme.`        |
| `{{website}}`               | Site domain shown to the reader            | `jane.dev`                                   |
| `{{website_url}}`           | Site URL with protocol                     | `https://jane.dev`                           |
| `{{twitter}}`               | Twitter/X handle, no `@`                   | `janedoe`                                    |
| `{{linkedin}}`              | LinkedIn slug                              | `janedoe`                                    |
| `{{project_one_name}}`      | First project name                         | `acme design system`                         |
| `{{project_one_desc}}`      | One-sentence description                   | `A token-driven UI kit shipped to 14 teams.` |
| `{{project_two_name}}`      | Second project name                        | `the type observatory`                       |
| `{{project_two_desc}}`      | One-sentence description                   | `WebGL studies of variable fonts in motion.` |
| `{{project_three_name}}`    | Third project name                         | `runtime essays`                             |
| `{{project_three_desc}}`    | One-sentence description                   | `Notes on shipping interfaces.`              |

## Customization Tips

- **Keep tagline under 60 characters.** Editorial layouts breathe; long lines look crammed.
- **Drop entries you don't need.** If you only have two projects, delete the third — don't pad. Restraint is the point.
- **Want a darker masthead?** Wrap the title in a blockquote: `> # {{name}}` for a left-bar effect.
- **Palette:** white surface · `#111` text · `#444` muted · `#777` labels — works in both themes by virtue of using none.

## Credits

- No third-party services. Pure CommonMark + GitHub Flavored Markdown.
