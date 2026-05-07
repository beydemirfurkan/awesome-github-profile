# Contributing

Thanks for considering a contribution. This repository curates **production-grade, ready-to-paste** GitHub profile README templates. The bar is high on purpose — most generic README generators already exist; this one is for senior-quality design.

## What we accept

- New templates that are **visually distinct** from the existing 16 (no recolors, no minor remixes).
- Improvements to existing templates (bug fixes, better placeholders, light/dark fixes, mobile fixes).
- New categories — open an issue first to discuss the taxonomy.

## What we don't accept

- Form-style "fill-in-the-blanks" generators (different scope).
- Templates that depend on private services or paid APIs.
- Templates that copy another contributor's design with cosmetic changes.

## Quality bar (applied to every PR)

Your template must satisfy **all** of these:

- [ ] **Visual hierarchy.** Hero, sections, and footer are visually distinguishable on first glance.
- [ ] **Typography.** At most two type-styles. Sizing is consistent.
- [ ] **Spacing.** Uses padding/spacing — not crammed.
- [ ] **Color palette.** Maximum four colors. Palette is documented in `Customization Tips`.
- [ ] **Light + dark mode.** Either uses `<picture>` for theme-aware swap, or a neutral palette that reads in both.
- [ ] **Mobile.** Renders cleanly in the GitHub mobile app — include a screenshot in the PR.
- [ ] **External calls ≤ 5.** Counted across all `<img>` tags in the template. Heavier templates frustrate visitors with slow loads.
- [ ] **Preview asset ≤ 300KB.** PNGs through `oxipng -o4`, GIFs through `gifsicle -O3`.
- [ ] **Originality.** Not a recolor of an existing template here or upstream.

## Folder conventions

```
templates/<NN>-<category>/<template-slug>/
├── README.md          # full template doc (use the schema below)
└── (no other files)   # preview goes in /assets/previews/<template-slug>.<png|gif>
```

`<NN>` matches the category index in the root README. `<template-slug>` is `kebab-case`, max 24 chars.

## Template README schema

Every template README must follow this exact section order:

```markdown
# <Template Name>

![preview](../../../assets/previews/<slug>.png)

> One-sentence pitch.

**Difficulty:** Basic | Intermediate | Advanced
**External services:** [name](url), [name](url)
**Tags:** `tag1` `tag2` `tag3`

## Preview
<short description of what it looks like>

## Copy & Customize

\`\`\`markdown
<the full markdown block, ready to paste>
\`\`\`

## Placeholders
| Token | Description | Example |
|-------|-------------|---------|

## Customization Tips
- ...

## Credits
- [service-name](url) — License
```

## Placeholder convention (mandatory)

Use **only** these placeholders, exactly:

| Token            | Meaning                                |
|------------------|----------------------------------------|
| `{{username}}`   | GitHub username (for stat URLs)        |
| `{{name}}`       | Display name                           |
| `{{tagline}}`    | One-liner under the name               |
| `{{accent}}`     | Hex color, **without** `#` (e.g. `00d9ff`) |
| `{{secondary}}`  | Hex color, without `#`                 |
| `{{location}}`   | Optional: city/country                 |
| `{{website}}`    | Personal site URL                      |
| `{{twitter}}`    | Twitter/X handle without `@`           |
| `{{linkedin}}`   | LinkedIn slug (after `/in/`)           |

If your template needs a token not in this list, propose it in your PR and we'll discuss.

## PR process

1. Fork, branch off `main`.
2. Add your template under the right category folder.
3. Add the preview asset to `assets/previews/`.
4. Add a row to the **Full template index** table in the root `README.md`.
5. Open the PR using the provided template — fill the checklist.
6. A maintainer reviews against the quality bar; expect 2–3 rounds of feedback.

## Test your template before submitting

Paste the markdown into your own `<your-username>/<your-username>` profile repo and confirm:

- Renders correctly on github.com (desktop).
- Renders correctly in the GitHub mobile app.
- All `<img>` URLs return 200 (open the raw image URL in your browser).
- Light and dark themes both look intentional.

A PR without this confirmation in its description will be asked for it.
