// Shared parsing + loading helpers for the build and validate scripts.
// Node stdlib only, on purpose: this repo should stay clonable and runnable
// with zero `npm install`.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join, dirname, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
export const TEMPLATES_DIR = join(ROOT, 'templates')

/** The canonical aspect for every gallery/hero asset in the repo. */
export const CANONICAL_VIEWBOX = '0 0 1200 420'

/** Section names a template README may use, in the only order they may appear. */
export const SECTION_ORDER = [
  'Preview',
  'Why this design',
  'Live showcase',
  'How it works',
  'Setup',
  'Copy & Customize',
  'Placeholders',
  'Customization Tips',
  'Technical notes',
  'Credits',
]

export const REQUIRED_SECTIONS = [
  'Preview',
  'Copy & Customize',
  'Placeholders',
  'Customization Tips',
  'Credits',
]

export const KINDS = {
  svg: 'ships a self-hosted SVG you download and commit',
  markdown: 'pure markdown — no images at all',
  action: 'a GitHub Action generates it in your repo',
  technique: 'a pattern you apply inside another template',
}

export const DIFFICULTIES = ['Basic', 'Intermediate', 'Advanced']

const posix = (p) => p.split(sep).join('/')

export function read(path) {
  // Normalise line endings before anything parses this. .gitattributes pins
  // the working tree to LF, but a clone with a different git config would
  // otherwise hand every fence and heading pattern a stray \r and they would
  // quietly stop matching — which is exactly how `npm run build` first broke
  // on a Windows checkout with core.autocrlf=true.
  return readFileSync(path, 'utf8').replace(/\r\n/g, '\n')
}

/**
 * Walk lines, tracking fenced code blocks. Fences may be longer than three
 * backticks — a sample that itself contains a ```block``` has to be wrapped in
 * ````four````, and monospace-cv does exactly that — so a fence closes only on
 * a run at least as long as the one that opened it.
 *
 * Yields `{ line, inFence }` for every line, where `inFence` is true for the
 * fence markers themselves as well as their contents.
 */
function* scan(md) {
  let fence = null
  for (const line of md.split('\n')) {
    const m = line.match(/^(`{3,})/)
    if (fence === null && m) {
      fence = m[1].length
      yield { line, inFence: true }
      continue
    }
    if (fence !== null && m && m[1].length >= fence) {
      fence = null
      yield { line, inFence: true }
      continue
    }
    yield { line, inFence: fence !== null }
  }
}

/**
 * Remove fenced code blocks so that headings *inside* a paste-ready markdown
 * sample are not mistaken for headings of the document itself. Several
 * templates paste `## Projects` and friends inside their Copy block.
 */
export function stripFences(md) {
  return [...scan(md)].filter((l) => !l.inFence).map((l) => l.line).join('\n')
}

/**
 * Map an as-written heading onto its canonical section name. Real headings
 * carry suffixes ("Setup (one-time)", "Copy & Customize (paste into
 * README.md)") and two legacy spellings of the rationale section; the parser
 * folds all of them onto the canonical name so it reads the repo correctly
 * both before and after the schema normalization pass.
 */
export function canonicalHeading(h) {
  const raw = h.trim()
  if (/^Why this (got upgraded|is different|design)/i.test(raw)) return 'Why this design'
  const hit = SECTION_ORDER.find((s) => raw.toLowerCase().startsWith(s.toLowerCase()))
  return hit ?? raw
}

/** Canonical H2 headings of the document itself, in source order. */
export function headings(md) {
  const out = []
  for (const { line, inFence } of scan(md)) {
    if (inFence) continue
    const m = line.match(/^##\s+(.+?)\s*$/)
    if (m) out.push(canonicalHeading(m[1]))
  }
  return out
}

/**
 * Body of one canonical H2 section, fences included (callers that want the
 * paste sample need them). Returns '' when the section is absent.
 */
export function section(md, name) {
  const rows = [...scan(md)]
  const isHeadingFor = (r, want) => {
    if (r.inFence) return false
    const m = r.line.match(/^##\s+(.+?)\s*$/)
    return m ? (want === null || canonicalHeading(m[1]) === want) : false
  }
  const start = rows.findIndex((r) => isHeadingFor(r, name))
  if (start === -1) return ''
  let end = rows.length
  for (let i = start + 1; i < rows.length; i++) {
    if (isHeadingFor(rows[i], null)) { end = i; break }
  }
  return rows.slice(start + 1, end).map((r) => r.line).join('\n')
}

/**
 * The sample(s) a reader is meant to paste. Only the outermost fence counts:
 * a ````markdown wrapper whose body contains its own ```bash block is one
 * sample, not two.
 */
export function copySample(md) {
  const body = section(md, 'Copy & Customize')
  const out = []
  let fence = null
  let buf = []
  for (const line of body.split('\n')) {
    const m = line.match(/^(`{3,})/)
    if (fence === null) {
      if (m) { fence = m[1].length; buf = [] }
      continue
    }
    if (m && m[1].length >= fence) { out.push(buf.join('\n')); fence = null; continue }
    buf.push(line)
  }
  return out.join('\n')
}

/** `{{token}}` names in source order, de-duplicated. */
export function tokensIn(text) {
  return [...new Set([...text.matchAll(/\{\{([a-zA-Z0-9_]+)\}\}/g)].map((m) => m[1]))]
}

/**
 * Distinct external hosts the pasted sample would actually fetch from.
 * Only image-bearing attributes count — a markdown link to twitter.com is a
 * link, not a service dependency, and must not be reported as one.
 */
export function hostsIn(text) {
  const urls = [...text.matchAll(/(?:src|srcset)="([^"]+)"/g)].map((m) => m[1])
  const hosts = urls.flatMap((u) =>
    // The host ends at the first `/`, `?` or `#` — readme-typing-svg is
    // addressed with a bare host plus a query string and no path at all.
    [...u.matchAll(/https?:\/\/([^/?#"'\s)]+)/g)].map((m) => m[1]),
  )
  return [...new Set(hosts)].sort()
}

/**
 * Does a concrete token satisfy a declared spec? A spec may use `*` anywhere
 * to stand for a family — the tables in the wild use both the trailing form
 * (`tags_*` covers `tags_one`) and the infix form (`project_*_name` covers
 * `project_one_name`, `project_two_name`; `project_one_*` covers that
 * project's name, url and desc).
 */
export function tokenMatches(spec, token) {
  if (spec === token) return true
  if (!spec.includes('*')) return false
  const pattern = spec.split('*').map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('[a-zA-Z0-9]+')
  return new RegExp(`^${pattern}$`).test(token)
}

export function viewBoxOf(svgPath) {
  const head = read(svgPath).slice(0, 600)
  return head.match(/viewBox="([^"]+)"/)?.[1] ?? null
}

const VOID_OK = new Set(['?xml', '!DOCTYPE'])

/**
 * Well-formedness problems in an SVG, as a list of human-readable strings.
 *
 * Browsers are forgiving enough that a malformed asset can sit in a repo for
 * months looking fine in one renderer and blank in another — `previews/
 * glassmorphism-hero.svg` shipped with a raw `&` in it from the very first
 * commit, and a section-divider comment full of dashes silently blanked
 * light-dark-switcher. Both are caught here.
 */
export function svgProblems(svgPath) {
  const src = read(svgPath)
  const problems = []

  // Comments: `--` is illegal inside one, and rule-style dividers hit it.
  for (const m of src.matchAll(/<!--([\s\S]*?)-->/g)) {
    if (m[1].includes('--')) problems.push('an XML comment contains "--", which is not legal and blanks the whole file')
  }

  // Bare `&` that is not the start of an entity.
  const withoutComments = src.replace(/<!--[\s\S]*?-->/g, '')
  for (const m of withoutComments.matchAll(/&(?!(?:[a-zA-Z][a-zA-Z0-9]*|#\d+|#x[0-9a-fA-F]+);)/g)) {
    const near = withoutComments.slice(Math.max(0, m.index - 30), m.index + 30).replace(/\s+/g, ' ')
    problems.push(`unescaped "&" (use &amp;) near: …${near}…`)
  }

  // Tag balance.
  const stack = []
  for (const m of withoutComments.matchAll(/<(\/?)([a-zA-Z?!][\w:.-]*)([^>]*?)(\/?)>/g)) {
    const [, closing, name, attrs, selfClose] = m
    if (VOID_OK.has(name) || name.startsWith('?') || name.startsWith('!')) continue
    if (closing) {
      const open = stack.pop()
      if (open !== name) problems.push(`</${name}> closes <${open ?? 'nothing'}>`)
    } else if (!selfClose && !attrs.endsWith('/')) {
      stack.push(name)
    }
  }
  if (stack.length) problems.push(`unclosed tag(s): ${[...new Set(stack)].join(', ')}`)

  // A gradient defaults to objectBoundingBox units, which are undefined when
  // the box has zero width or height — so a gradient-stroked horizontal or
  // vertical <line> paints nothing at all, silently. Two divider rules in
  // holographic-foil.svg were invisible this way from the first commit.
  const userSpace = new Set(
    [...src.matchAll(/<(?:linear|radial)Gradient\b[^>]*\bid="([^"]+)"[^>]*gradientUnits="userSpaceOnUse"/g)].map((m) => m[1]),
  )
  for (const m of withoutComments.matchAll(/<line\b([^>]*)>/g)) {
    const attrs = m[1]
    const ref = attrs.match(/stroke="url\(#([^)]+)\)"/)?.[1]
    if (!ref || userSpace.has(ref)) continue
    const num = (n) => Number(attrs.match(new RegExp(`\\b${n}="([-\\d.]+)"`))?.[1] ?? NaN)
    if (num('x1') === num('x2') || num('y1') === num('y2')) {
      problems.push(`<line> stroked with url(#${ref}) is axis-aligned, so its gradient has a zero-area box and paints nothing — use a <rect>, or give the gradient gradientUnits="userSpaceOnUse"`)
    }
  }

  return problems
}

export function loadCategories() {
  return JSON.parse(read(join(TEMPLATES_DIR, 'categories.json')))
}

/**
 * Every template, ordered by category then by the order the category declares.
 * Each entry carries its own meta plus the resolved paths the scripts need.
 */
export function loadTemplates() {
  const out = []
  for (const cat of loadCategories()) {
    const dir = join(TEMPLATES_DIR, cat.id)
    if (!existsSync(dir)) throw new Error(`category directory missing: templates/${cat.id}`)
    const known = new Set(cat.templates)
    for (const slug of readdirSync(dir)) {
      if (!statSync(join(dir, slug)).isDirectory()) continue
      if (!known.has(slug)) throw new Error(`templates/${cat.id}/${slug} is not listed in categories.json`)
    }
    for (const slug of cat.templates) {
      const tplDir = join(dir, slug)
      const metaPath = join(tplDir, 'meta.json')
      if (!existsSync(metaPath)) throw new Error(`missing templates/${cat.id}/${slug}/meta.json`)
      const meta = JSON.parse(read(metaPath))
      out.push({
        ...meta,
        category: cat.id,
        categoryTitle: cat.title,
        dir: tplDir,
        readmePath: join(tplDir, 'README.md'),
        // Path from the repo root, as the root README and docs site need it.
        rootRelAsset: meta.asset ? posix(meta.asset) : null,
        // Path from inside the template folder, as that README needs it.
        tplRelAsset: meta.asset ? posix(relative(tplDir, join(ROOT, meta.asset))) : null,
        href: `templates/${cat.id}/${slug}/`,
      })
    }
  }
  return out
}

/** Replace the body between `<!-- BEGIN:name -->` and `<!-- END:name -->`. */
export function replaceRegion(text, name, body) {
  const re = new RegExp(`(<!-- BEGIN:${name} -->)[\\s\\S]*?(<!-- END:${name} -->)`)
  if (!re.test(text)) throw new Error(`region "${name}" not found`)
  return text.replace(re, `$1\n${body}\n$2`)
}
