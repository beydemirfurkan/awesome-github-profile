# Fonts

Two families, self-hosted, used only by the gallery page at [`/index.html`](../../index.html).

| Family | Files | Role |
|---|---|---|
| Instrument Serif | regular, italic (latin + latin-ext) | display — wordmark, template names, panel titles |
| Instrument Sans | variable 400–700 (latin + latin-ext) | body and UI |

## Why these are here rather than linked

Linking Google Fonts would mean the gallery makes a third-party request on
every visit, in a repository whose whole argument is that you should not need
one. 120 KB of woff2 committed here costs less than that argument.

## Why the templates do not use them

They cannot. GitHub serves README images through an image proxy, so an
`@font-face` inside a template's SVG never loads and the reader silently gets
a substitute. Every template is therefore set in a system stack that resolves
on every platform. The gallery is an ordinary web page, so it has the choice
the templates do not.

## Licence

Both families are licensed under the SIL Open Font License 1.1 — see
[`OFL.txt`](OFL.txt). Sources:

- Instrument Serif — https://github.com/Instrument/instrument-serif
- Instrument Sans — https://github.com/Instrument/instrument-sans

Subsets were taken from the Google Fonts CDN and are unmodified.
