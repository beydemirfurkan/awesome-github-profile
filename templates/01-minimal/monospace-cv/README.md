# Monospace CV

<!-- BEGIN:preview -->
![Monospace CV](../../../assets/minimal/monospace-cv.svg)
<!-- END:preview -->

> Your profile as a terminal session. One font, four prompts, zero noise.

<!-- BEGIN:meta -->
**Kind:** `markdown` — pure markdown — no images at all  
**Difficulty:** Basic  
**External services:** `readme-typing-svg.demolab.com` (optional)  
**Tags:** `minimal` `monospace` `terminal` `cv`
<!-- END:meta -->

## Preview

Renders as a fenced code block, so GitHub's monospace + the dark code surface do the heavy lifting. Works in both themes. The optional typing SVG below the block adds a subtle blinking cursor; remove it if you want pure static output.

## Copy & Customize

````markdown
```bash
$ whoami
{{username}} — {{role}}

$ cat skills.txt
{{skills_csv}}

$ uptime
{{uptime_line}}

$ contact --all
→ {{website}}   @{{twitter}}   in/{{linkedin}}
```

<a href="{{website_url}}">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=14&duration=3000&pause=600&color={{accent}}&center=false&vCenter=true&width=435&lines={{typing_line_one}};{{typing_line_two}};{{typing_line_three}}" alt="status" />
</a>
````

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{username}}` | in the block below | GitHub-style handle (lowercase + dot OK) | `jane.doe` |
| `{{role}}` | in the block below | Short role title | `frontend.eng` |
| `{{skills_csv}}` | in the block below | Comma-separated skills | `typescript · react · node · figma` |
| `{{uptime_line}}` | in the block below | Years of experience as a sentence | `8 yrs shipping production interfaces.` |
| `{{website}}` | in the block below | Domain only | `jane.dev` |
| `{{website_url}}` | in the block below | Full URL | `https://jane.dev` |
| `{{twitter}}` | in the block below | Twitter handle, no @ | `janedoe` |
| `{{linkedin}}` | in the block below | LinkedIn slug | `janedoe` |
| `{{accent}}` | in the block below | Hex color, no #, used for the typing cursor | `7ee787` |
| `{{typing_line_*}}` | in the block below | nth rotating status | `currently shipping design tokens` |
<!-- END:placeholders -->

## Customization Tips

- **Strip the typing SVG** for a fully offline, zero-deps version — leave only the code block.
- **Pick a font** by changing `font=JetBrains+Mono` to `Fira+Code`, `IBM+Plex+Mono`, `Source+Code+Pro`, or `Space+Mono`.
- **Color palette:** GitHub dark code surface `#0d1117` · prompt `#7ee787` · text `#c9d1d9` · link `#58a6ff`. Don't override — these match GitHub's own theme on both light and dark.
- **Add a fifth prompt** if you have a public PGP key or a `.well-known` URL: `$ gpg --fingerprint` reads as quietly serious.

## Credits

- [readme-typing-svg](https://github.com/DenverCoder1/readme-typing-svg) by DenverCoder1 (MIT)
