# Collapsible Projects

![preview](../../../assets/previews/collapsible-projects.svg)

> Pack ten projects into the space of three with `<details>`. The visitor opens what they care about.

**Difficulty:** Basic
**External services:** none
**Tags:** `tricks` `details-tag` `accordion` `space-saving` `interactive`

## Preview

Each project is a single line by default — title plus a short tag. Clicking the line expands it to show the description, tech stack, and a link to the repo. GitHub renders `<details>` natively as an accordion. No JavaScript, no dependencies.

This is the antidote to the "endless scrolling list of repos" pattern that bloats most profiles.

## How it works

```html
<details>
  <summary>Visible-by-default text · <code>tags</code></summary>

  Hidden content goes here, indented for readability.
  Markdown still works inside!

</details>
```

Two rules:
1. The `<summary>` must be the first child of `<details>`.
2. Leave a **blank line** after `<summary>` and before the closing `</details>` — otherwise GitHub renders the content as plain text instead of markdown.

## Copy & Customize

```markdown
## Projects

<details>
  <summary><strong>{{project_one_name}}</strong> · <code>{{project_one_tags}}</code></summary>

  {{project_one_description}}

  **Stack:** {{project_one_stack}}
  **Repo:** [{{project_one_repo_short}}]({{project_one_repo_url}})

</details>

<details>
  <summary><strong>{{project_two_name}}</strong> · <code>{{project_two_tags}}</code></summary>

  {{project_two_description}}

  **Stack:** {{project_two_stack}}
  **Repo:** [{{project_two_repo_short}}]({{project_two_repo_url}})

</details>

<details>
  <summary><strong>{{project_three_name}}</strong> · <code>{{project_three_tags}}</code></summary>

  {{project_three_description}}

  **Stack:** {{project_three_stack}}
  **Repo:** [{{project_three_repo_short}}]({{project_three_repo_url}})

</details>

<details>
  <summary><strong>archived</strong> · <em>older work</em></summary>

  - [{{archive_one_name}}]({{archive_one_url}}) — {{archive_one_desc}}
  - [{{archive_two_name}}]({{archive_two_url}}) — {{archive_two_desc}}
  - [{{archive_three_name}}]({{archive_three_url}}) — {{archive_three_desc}}

</details>
```

## Placeholders

| Token                            | Description                                | Example                                       |
|----------------------------------|--------------------------------------------|-----------------------------------------------|
| `{{project_one_name}}`           | Project title                              | `acme design system`                          |
| `{{project_one_tags}}`           | Short tag string                           | `typescript · react`                          |
| `{{project_one_description}}`    | 1–2 sentences                              | `A token-driven UI kit shipped to 14 teams.`  |
| `{{project_one_stack}}`          | Detailed stack                             | `TypeScript, React, Vanilla Extract, Storybook` |
| `{{project_one_repo_short}}`     | Repo display label                         | `jane/acme-ds`                                |
| `{{project_one_repo_url}}`       | Repo URL                                   | `https://github.com/jane/acme-ds`             |
| (repeat for projects two, three) |                                            |                                               |
| `{{archive_one_name}}`           | Archive entry title                        | `the type observatory`                        |
| `{{archive_one_url}}`            | URL                                        | `https://typeobservatory.dev`                 |
| `{{archive_one_desc}}`           | Description                                | `webgl variable-font experiments, 2023`       |

## Customization Tips

- **Three to five top-level `<details>` is the sweet spot.** More than five and the accordion becomes a wall again.
- **Use one `<details>` for an "archive" of older work.** Nests several short links inside, keeps the main list focused on what's recent.
- **Default-open one item with `<details open>`.** Useful for highlighting your most-recent or most-impressive project — visitors land already engaged.
- **Don't nest `<details>` inside `<details>`** — GitHub renders it but the indentation gets confusing fast on mobile.
- **Keep summaries short.** They're meant to be scannable. Project name + tag string + maybe one stat is plenty.
- **Don't use this for "hobbies", "favorite quotes", or "fun facts."** Collapsibles for project showcases respect the reader's time; collapsibles for trivia just hide content nobody asked for.
- **Mobile.** `<details>` works perfectly in the GitHub mobile app. Tap-to-expand feels native.

## Credits

- HTML5 `<details>` element — [MDN: details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)
