# Typewriter Intro

<!-- BEGIN:preview -->
![Typewriter Intro](../../../assets/animated/typewriter-intro.svg)
<!-- END:preview -->

> A pixel-perfect macOS terminal as your hero. Multiple `$` prompts, syntax-highlighted output, a single blinking cursor. Self-hosted SVG, zero dependencies on third-party typing services.

<!-- BEGIN:meta -->
**Kind:** `svg` — ships a self-hosted SVG you download and commit  
**Difficulty:** Basic  
**External services:** none  
**Tags:** `animated` `terminal` `typing` `self-hosted`
<!-- END:meta -->

## Preview

A terminal window at full width: chrome bar with traffic lights, then three prompts of syntax-highlighted output — who you are, what you are shipping, where to find you. Everything is drawn statically; the only motion is the cursor blinking at the last prompt.

## Why this design

The obvious way to build a typing terminal is a hosted typing-SVG service — until it rate-limits, or your `lines=` URL-encoding breaks on a character you did not think about. This draws the whole terminal instead: window chrome, traffic lights, three prompts of syntax-highlighted output. The only thing that animates is the cursor, because the cursor is the only thing that actually needed to move.

## Live showcase

![showcase](../../../assets/animated/typewriter-intro.svg)

## Setup

1. Download [`typewriter-intro.svg`](../../../assets/animated/typewriter-intro.svg) into `./assets/typewriter-intro.svg` of your profile repo.
2. Open in any text editor.
3. Edit the `<text>` elements grouped by prompt:
   - **Prompt 1** (`whoami --verbose`) — replace `Jane Doe — frontend.engineer · motion · type`, the metadata line.
   - **Prompt 2** (`cat now.md`) — replace the three bullet points under `## currently`.
   - **Prompt 3** (`contact --all`) — replace the four contact strings.
4. Optional: edit the window title (`~/jane — zsh — 124×34`) and the tab name (`jane@studio`).
5. Commit. Done.

## Copy & Customize (paste into README.md)

```markdown
<p align="center">
  <img src="./assets/typewriter-intro.svg" alt="{{name}} — terminal session" width="100%" />
</p>

### projects on the desk

- [{{project_one_name}}]({{project_one_url}}) — {{project_one_desc}}
- [{{project_two_name}}]({{project_two_url}}) — {{project_two_desc}}
- [{{project_three_name}}]({{project_three_url}}) — {{project_three_desc}}

### writing

[`{{essay_one_title}}`]({{essay_one_url}}) · [`{{essay_two_title}}`]({{essay_two_url}})
```

## Placeholders

<!-- BEGIN:placeholders -->
| Token | Replace it | Description | Example |
|-------|------------|-------------|---------|
| `{{name}}` | in the block below | Display name | `Jane Doe` |
| `{{prompt_outputs_*}}` | inside the SVG | prompts' content | `Jane Doe — frontend.engineer...` |
| `{{essay_*_title}}` | in the block below | Essay link | `On the slowness of good interfaces` |
| `{{essay_*_url}}` | in the block below | URL | `https://jane.dev/log/slow` |
| `{{project_*_name}}` | in the block below | Project name, one per row | `acme-ds` |
| `{{project_*_url}}` | in the block below | Repo or site URL for that project | `https://github.com/jane/acme-ds` |
| `{{project_*_desc}}` | in the block below | One line on what it is | `token-driven UI kit` |
<!-- END:placeholders -->

## Customization Tips

- **Three prompts is the rhythm.** Two feels stunted; four overflows the window. The `whoami → cat now.md → contact --all` pattern is intentional: identity, current state, reach.
- **Syntax-color the right tokens.**
  - `#a78bfa` violet — the username (`jane@studio`)
  - `#7ee787` green — the prompt symbol (`$`) and command name
  - `#c9d1d9` near-white — output and arguments
  - `#fcd34d` amber — markdown headings (`## currently`)
  - `#58a6ff` blue — links and paths
  - `#7a7f99` muted — colons, separators, metadata
  These match GitHub's own syntax theme — visitors recognize the palette subconsciously.
- **The blinking cursor uses `keyTimes="0;0.5;0.5;1"` with values `1;1;0;0`.** That's the *square wave* blink — on for the first half, off for the second half. Smooth `1;0;1` gives a fade that reads as "loading", which you don't want.
- **The 14px traffic lights are slightly oversized.** Real macOS lights are 12px, but SVG anti-aliasing eats edges; bumping to 14 keeps them crisp.
- **`UTF-8 · zsh · ⌘K · clear` status bar at the bottom is optional.** It's the kind of detail that signals "this person uses a terminal daily" — a quiet authenticity flex.
- **Don't pair with another animated SVG above the fold.** One blinking cursor per profile is plenty.

## Technical notes

The cursor blink, with a square-wave timing instead of a smooth sine:

```svg
<rect x="252" y="360" width="9" height="14" fill="#c9d1d9">
  <animate attributeName="opacity"
           values="1;1;0;0"
           keyTimes="0;0.5;0.5;1"
           dur="1.1s" repeatCount="indefinite"/>
</rect>
```

The `keyTimes` array has duplicate `0.5` entries — that creates the *instant* on/off transition at exactly the halfway point of the 1.1s cycle. This is the difference between "modern smooth fade" and "real terminal cursor."

The `<filter id="ti-shadow">` is a 4-step drop shadow: blur the alpha, offset, attenuate, merge with source. That's what gives the terminal its "floating window" feel.

## Credits

- Self-hosted SVG. SMIL animation (W3C SVG 1.1).
- macOS terminal palette referenced from One Dark, GitHub Dark.
- CC0 — copy, modify, ship.
