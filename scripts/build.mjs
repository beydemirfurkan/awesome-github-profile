// Regenerates everything that can be derived from the manifest:
//
//   · the gallery and the index table in the root README
//   · the credits list in the root README
//   · the preview image and badge block at the top of every template README
//   · docs/templates.json, which the gallery site reads
//
//   node scripts/build.mjs [--check]
//
// `--check` writes nothing and exits non-zero if anything is out of date, so
// CI can prove the committed files match the manifest.

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, KINDS, read, section, copySample, loadCategories, loadTemplates, replaceRegion } from './lib.mjs'

const CHECK = process.argv.includes('--check')
const stale = []
const written = []

function emit(path, next) {
  const label = path.replace(ROOT, '').replace(/\\/g, '/').replace(/^\//, '')
  // read() normalises line endings, so normalise `next` before comparing —
  // otherwise --check would call every generated file stale on a CRLF
  // checkout even when the content is byte-for-byte equivalent.
  const prev = existsSync(path) ? read(path) : null
  if (prev === next.replace(/\r\n/g, '\n')) return
  if (CHECK) { stale.push(label); return }
  writeFileSync(path, next)
  written.push(label)
}

const categories = loadCategories()
const templates = loadTemplates()
const byCategory = (id) => templates.filter((t) => t.category === id)

// --------------------------------------------------------------- root README

/** One gallery cell. Kept on few lines so the generated diff stays readable. */
function cell(t) {
  return [
    '    <td width="50%" align="center" valign="top">',
    `      <a href="./${t.href}">`,
    `        <img src="./${t.rootRelAsset}" alt="${t.name}" width="100%" />`,
    `        <br><strong>${t.name}</strong>`,
    '      </a>',
    `      <br><sub><code>${t.kind}</code> · ${t.difficulty}</sub>`,
    `      <br><sub>${t.blurb}</sub>`,
    '    </td>',
  ].join('\n')
}

function galleryFor(cat) {
  const items = byCategory(cat.id)
  const rows = []
  for (let i = 0; i < items.length; i += 2) {
    const pair = items.slice(i, i + 2)
    // Pad odd categories so both columns keep the same width.
    const cells = pair.map(cell)
    if (pair.length === 1) cells.push('    <td width="50%"></td>')
    rows.push(['  <tr>', ...cells, '  </tr>'].join('\n'))
  }
  const heading = `### ${cat.id.split('-')[0]} · ${cat.title}${cat.showcase ? ' — showcase tier' : ''}`
  return [heading, '', `> ${cat.tagline}`, '', '<table border="0">', ...rows, '</table>'].join('\n')
}

const gallery = categories.map(galleryFor).join('\n\n')

const indexTable = [
  '| #  | Template | Category | Kind | Difficulty | External services |',
  '|----|----------|----------|------|------------|-------------------|',
  ...templates.map((t, i) => {
    const services = t.services.length
      ? t.services.map((s) => `\`${s.host}\`${s.optional ? ' *(optional)*' : ''}`).join('<br>')
      : 'none'
    return `| ${String(i + 1).padStart(2, '0')} | [${t.name}](./${t.href}) | ${t.categoryTitle} | \`${t.kind}\` | ${t.difficulty} | ${services} |`
  }),
].join('\n')

const kindLegend = [
  '| Kind | What you get |',
  '|------|--------------|',
  ...Object.entries(KINDS).map(([k, v]) => `| \`${k}\` | ${v} |`),
].join('\n')

// Credits are derived from what templates actually declare, so the list can
// never drift into crediting something no template uses.
const creditsByAuthor = new Map()
for (const t of templates) {
  for (const c of t.credits ?? []) {
    if (!creditsByAuthor.has(c.author)) creditsByAuthor.set(c.author, new Map())
    creditsByAuthor.get(c.author).set(c.name, c)
  }
}
const credits = [...creditsByAuthor.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([author, projects]) => {
    const list = [...projects.values()]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((c) => `[${c.name}](${c.url})`)
      .join(', ')
    return `- [${author}](https://github.com/${author}) — ${list}`
  })
  .join('\n')

const badges = [
  '<p align="center">',
  `  <a href="#categories"><img src="https://img.shields.io/badge/templates-${templates.length}-111111?style=for-the-badge&labelColor=f5f3ee" alt="${templates.length} templates" /></a>`,
  `  <a href="#categories"><img src="https://img.shields.io/badge/categories-${categories.length}-111111?style=for-the-badge&labelColor=f5f3ee" alt="${categories.length} categories" /></a>`,
  '  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-111111?style=for-the-badge&labelColor=f5f3ee" alt="MIT license" /></a>',
  '  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-111111?style=for-the-badge&labelColor=f5f3ee" alt="contributions welcome" /></a>',
  '</p>',
].join('\n')

let rootReadme = read(join(ROOT, 'README.md'))
for (const [name, body] of [
  ['badges', badges],
  ['gallery', gallery],
  ['kinds', kindLegend],
  ['index', indexTable],
  ['credits', credits],
]) {
  rootReadme = replaceRegion(rootReadme, name, body)
}
emit(join(ROOT, 'README.md'), rootReadme)

// The PR template lists the categories a contributor may pick, which is one
// more thing that used to go stale by hand — 09-avant-garde was missing from
// it for the whole of v1.
const prTemplate = join(ROOT, '.github', 'PULL_REQUEST_TEMPLATE.md')
const categoryChoices = categories.map((c) => `\`${c.id}\``).join(' | ')
emit(prTemplate, replaceRegion(read(prTemplate), 'categories', categoryChoices))

// ----------------------------------------------------------- template README

for (const t of templates) {
  let md = read(t.readmePath)

  const preview = `![${t.name}](${t.tplRelAsset})`
  const services = t.services.length
    ? t.services.map((s) => `\`${s.host}\`${s.optional ? ' (optional)' : ''}`).join(', ')
    : 'none'
  const meta = [
    `**Kind:** \`${t.kind}\` — ${KINDS[t.kind]}  `,
    `**Difficulty:** ${t.difficulty}  `,
    `**External services:** ${services}  `,
    `**Tags:** ${t.tags.map((x) => `\`${x}\``).join(' ')}`,
  ].join('\n')

  // The placeholder table is the manifest rendered, not a second copy of it.
  // Hand-maintained, it drifted: four templates abbreviated whole families as
  // "(etc. for two, three)" and left the siblings undocumented.
  const WHERE_NOTE = {
    markdown: 'in the block below',
    setup: 'in the setup workflow',
    asset: 'inside the SVG',
  }
  const placeholders = [
    '| Token | Replace it | Description | Example |',
    '|-------|------------|-------------|---------|',
    ...t.placeholders.map((p) =>
      `| \`{{${p.token}}}\` | ${WHERE_NOTE[p.where] ?? p.where} | ${p.description} | ${p.example ? `\`${p.example}\`` : '—'} |`,
    ),
  ].join('\n')

  // One-time migration: wrap the hand-written blocks in regions so later runs
  // can regenerate them in place.
  if (!md.includes('<!-- BEGIN:preview -->')) {
    md = md.replace(/^!\[[^\]]*\]\([^)]+\)$/m, `<!-- BEGIN:preview -->\n${preview}\n<!-- END:preview -->`)
  }
  if (!md.includes('<!-- BEGIN:meta -->')) {
    md = md.replace(
      /^\*\*Difficulty:\*\*[\s\S]*?^\*\*Tags:\*\*.*$/m,
      `<!-- BEGIN:meta -->\n${meta}\n<!-- END:meta -->`,
    )
  }
  if (!md.includes('<!-- BEGIN:placeholders -->')) {
    // Replace the whole existing table, however many rows it had.
    md = md.replace(
      /(^## Placeholders\s*\n+)(\|[\s\S]*?)(?=\n##\s)/m,
      `$1<!-- BEGIN:placeholders -->\n${placeholders}\n<!-- END:placeholders -->\n`,
    )
  }
  md = replaceRegion(md, 'preview', preview)
  md = replaceRegion(md, 'meta', meta)
  md = replaceRegion(md, 'placeholders', placeholders)
  emit(t.readmePath, md)
}

// ------------------------------------------------------------- workflow files

// The four Action templates each carry their workflow as a fenced block in
// their Setup section. Writing that block out as a real file means a reader
// can link to it, fork it, or diff it — and because it is generated from the
// prose rather than kept beside it, the two cannot disagree.
mkdirSync(join(ROOT, 'workflows'), { recursive: true })
for (const t of templates.filter((x) => x.kind === 'action')) {
  const setup = section(read(t.readmePath), 'Setup')
  const yaml = [...setup.matchAll(/```ya?ml\n([\s\S]*?)```/g)].map((m) => m[1])[0]
  if (!yaml) throw new Error(`${t.slug}: kind "action" but no yaml block in ## Setup`)
  emit(join(ROOT, 'workflows', `${t.slug}.yml`), yaml.trimEnd() + '\n')
}

// ---------------------------------------------------------------- docs data

const site = {
  generated: 'scripts/build.mjs — do not edit by hand',
  counts: { templates: templates.length, categories: categories.length },
  categories: categories.map((c) => ({ id: c.id, title: c.title, tagline: c.tagline, showcase: !!c.showcase })),
  kinds: KINDS,
  templates: templates.map((t) => ({
    slug: t.slug,
    name: t.name,
    category: t.category,
    categoryTitle: t.categoryTitle,
    kind: t.kind,
    difficulty: t.difficulty,
    blurb: t.blurb,
    tags: t.tags,
    asset: t.rootRelAsset,
    href: t.href,
    picture: !!t.picture,
    services: t.services,
    placeholders: t.placeholders,
    credits: t.credits,
    // The site's Copy button needs the paste-ready block itself.
    sample: copySample(read(t.readmePath)),
    pitch: (read(t.readmePath).match(/^>\s+(.+)$/m)?.[1] ?? '').trim(),
  })),
}
mkdirSync(join(ROOT, 'docs'), { recursive: true })
emit(join(ROOT, 'docs', 'templates.json'), JSON.stringify(site, null, 2) + '\n')

// ------------------------------------------------------------------- report

if (CHECK) {
  if (stale.length) {
    console.error('out of date — run `npm run build` and commit the result:')
    for (const f of stale) console.error(`  · ${f}`)
    process.exit(1)
  }
  console.log('ok — generated files match the manifest')
} else {
  console.log(written.length ? `updated ${written.length} file(s):` : 'nothing to update')
  for (const f of written) console.log(`  · ${f}`)
}
