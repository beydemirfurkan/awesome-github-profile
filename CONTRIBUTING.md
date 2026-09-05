# Contributing

Thanks for considering a contribution. This repository curates **production-grade, ready-to-paste** GitHub profile README templates. The bar is high on purpose — generic README generators already exist; this one is for senior-quality design.

Most of the bar below is enforced by a script rather than by a reviewer's patience:

```bash
npm run check     # generated files are current + every quality rule passes
npm run build     # regenerate the gallery, the index, and docs/templates.json
```

There is nothing to install — the scripts use the Node standard library only. If `npm run check` is green, your PR is structurally correct and review can be about the design.

## What we accept

- New templates that are **visually distinct** from every existing one (no recolors, no minor remixes).
- Improvements to existing templates (bug fixes, better placeholders, light/dark fixes, mobile fixes).
- New categories — open an issue first to discuss the taxonomy.

## What we don't accept

- Form-style "fill-in-the-blanks" generators (different scope).
- Templates that depend on private services or paid APIs.
- Templates that copy another contributor's design with cosmetic changes.
- Claims we cannot verify. Don't write a measured frame time you did not measure, or describe a history the git log does not contain.

## The four kinds

Every template declares what a reader actually gets. Pick the honest one:

| `kind` | What the reader gets |
|--------|----------------------|
| `svg` | a self-hosted SVG they download and commit into their own repo |
| `markdown` | pure markdown — no images at all |
| `action` | a GitHub Action that regenerates the image in their repo |
| `technique` | a pattern they apply inside another template |

A `markdown` template must not embed images. An `action` template must ship the workflow YAML in its `## Setup` section. An `svg` template must tell the reader where to put the file.

## Quality bar

Checked automatically by `npm run check`:

- [ ] Asset exists, lives in `assets/<category-dir>/<slug>.svg`, and its `viewBox` is exactly `0 0 1200 420`. **This one is not negotiable** — mixed aspect ratios make gallery rows render at different heights.
- [ ] README follows the section schema below, in order, with nothing unrecognised.
- [ ] Every `{{token}}` in the Copy block is declared in `meta.json`, and every declared token exists where it says it does.
- [ ] Every host the Copy block fetches from is declared in `services`, and every declared service is actually called.
- [ ] The `picture` flag matches whether the Copy block uses `<picture>`.
- [ ] Every credited project is used by some template, and every used project is credited.
- [ ] Counts written in prose match the manifest.

Checked by a human, because a script can't:

- [ ] **Visual hierarchy.** Hero, sections, and footer are distinguishable at a glance.
- [ ] **Typography.** At most two type styles. Sizing is consistent.
- [ ] **Spacing.** Uses padding — not crammed.
- [ ] **Colour.** At most four colours, documented in `Customization Tips`.
- [ ] **Light + dark.** Either a `<picture>` swap, or a palette that reads intentionally in both.
- [ ] **Mobile.** Renders cleanly at 390px — include a screenshot in the PR.
- [ ] **Originality.** Not a recolor of an existing template here or upstream.

## Folder conventions

```
templates/<NN>-<category>/<template-slug>/
├── meta.json          # the manifest entry — single source of truth
└── README.md          # the template doc (schema below)

assets/<category-dir>/<template-slug>.svg   # the 1200×420 gallery + hero asset
```

`<NN>-<category>` and `<category-dir>` both come from [`templates/categories.json`](templates/categories.json); a new template must be listed there too. `<template-slug>` is `kebab-case`, max 24 characters, and unique across the whole repo.

## `meta.json`

```jsonc
{
  "slug": "swiss-grid",
  "name": "Swiss Grid",
  "kind": "svg",
  "difficulty": "Intermediate",        // Basic | Intermediate | Advanced
  "blurb": "Twelve columns, one red.", // under 70 chars — it's a gallery caption
  "asset": "assets/swiss-brutalist/swiss-grid.svg",
  "picture": false,
  "tags": ["swiss", "grid", "typography"],
  "services": [],                      // { "host": "…", "optional": true }
  "placeholders": [
    {
      "token": "name",                 // or a family: "project_*"
      "where": "markdown",             // "markdown" = in the Copy block
      "description": "Display name",   //  "asset"   = edited inside the SVG
      "example": "Jane Doe"
    }
  ],
  "credits": []                        // { name, author, url, license }
}
```

Content tokens are per-template and live here — there is no global list to squeeze into. Reuse the common spellings when they fit (`name`, `tagline`, `username`, `website`, `website_url`, `twitter`, `linkedin`, `email`, `accent`) so readers who switch templates keep their muscle memory.

## Template README schema

Sections must appear in this order. Bold ones are required; the rest are optional but cannot move.

1. `# <Template Name>` — must equal `meta.json` `name`
2. `<!-- BEGIN:preview -->` … `<!-- END:preview -->` — generated, don't hand-edit
3. `> One-sentence pitch.`
4. `<!-- BEGIN:meta -->` … `<!-- END:meta -->` — generated, don't hand-edit
5. **`## Preview`** — what it looks like, in words
6. `## Why this design` — the decisions and the reasoning
7. `## Live showcase` — the full-size asset, for `svg` templates
8. `## How it works` — for `technique` templates
9. `## Setup` — required for `svg` and `action`
10. **`## Copy & Customize`** — one fenced block, ready to paste
11. **`## Placeholders`**
12. **`## Customization Tips`**
13. `## Technical notes` — the interesting part, for readers who want it
14. **`## Credits`**

## PR process

1. Fork, branch off `main`.
2. Add your template folder, its `meta.json`, and its `1200×420` asset.
3. Add the slug to `templates/categories.json`.
4. Run `npm run build` and commit the regenerated files — **never hand-edit the root README gallery, index or credits.**
5. Run `npm run check` until green.
6. Open the PR using the provided template.

## Test before submitting

Paste the markdown into your own `<your-username>/<your-username>` profile repo and confirm:

- Renders correctly on github.com, desktop and at 390px.
- All `<img>` URLs return 200.
- Light and dark themes both look intentional.

A PR without this confirmation in its description will be asked for it.
