// The quality bar, as code. CONTRIBUTING.md describes these rules in prose;
// this file is what actually enforces them, on every push and pull request.
//
//   node scripts/validate.mjs
//
// Exits non-zero on the first failing run and prints every problem it found,
// grouped by template, so a contributor can fix them in one pass.

import { existsSync } from 'node:fs'
import { join } from 'node:path'
import {
  ROOT, CANONICAL_VIEWBOX, SECTION_ORDER, REQUIRED_SECTIONS, KINDS, DIFFICULTIES,
  read, headings, section, copySample, tokensIn, hostsIn, tokenMatches,
  viewBoxOf, svgProblems, loadCategories, loadTemplates,
} from './lib.mjs'

/** Where a reader actually replaces a token. */
const WHERES = ['markdown', 'setup', 'asset']

const problems = []
const fail = (where, msg) => problems.push({ where, msg })

const templates = loadTemplates()
const categories = loadCategories()

// ---------------------------------------------------------------- categories

const seenIds = new Set()
for (const cat of categories) {
  const where = `templates/categories.json → ${cat.id}`
  if (seenIds.has(cat.id)) fail(where, 'duplicate category id')
  seenIds.add(cat.id)
  for (const field of ['id', 'dir', 'title', 'tagline']) {
    if (!cat[field]) fail(where, `missing "${field}"`)
  }
  if (!cat.templates?.length) fail(where, 'category has no templates')
}

// ----------------------------------------------------------------- templates

const slugs = new Set()

for (const t of templates) {
  const where = `templates/${t.category}/${t.slug}`

  // -- meta.json shape -------------------------------------------------------
  if (slugs.has(t.slug)) fail(where, `duplicate slug "${t.slug}" — slugs are repo-wide unique`)
  slugs.add(t.slug)
  if (!KINDS[t.kind]) fail(where, `kind "${t.kind}" is not one of: ${Object.keys(KINDS).join(', ')}`)
  if (!DIFFICULTIES.includes(t.difficulty)) fail(where, `difficulty "${t.difficulty}" is not one of: ${DIFFICULTIES.join(', ')}`)
  if (!t.blurb) fail(where, 'meta.json has no blurb (the one-liner under the gallery card)')
  if (t.blurb && t.blurb.length > 70) fail(where, `blurb is ${t.blurb.length} chars; keep it under 70 so gallery cards stay one line`)
  if (!t.tags?.length) fail(where, 'meta.json has no tags')

  // -- the asset -------------------------------------------------------------
  if (!t.asset) {
    fail(where, 'meta.json has no asset — every template needs a 1200×420 gallery image')
  } else {
    const assetPath = join(ROOT, t.asset)
    if (!existsSync(assetPath)) {
      fail(where, `asset does not exist: ${t.asset}`)
    } else {
      const vb = viewBoxOf(assetPath)
      if (vb !== CANONICAL_VIEWBOX) {
        fail(where, `${t.asset} has viewBox "${vb}"; every asset must be "${CANONICAL_VIEWBOX}" or gallery rows misalign`)
      }
      for (const p of svgProblems(assetPath)) fail(where, `${t.asset}: ${p}`)
      const expectedDir = categories.find((c) => c.id === t.category).dir
      if (!t.asset.startsWith(`assets/${expectedDir}/`)) {
        fail(where, `asset should live in assets/${expectedDir}/, not ${t.asset}`)
      }
    }
  }

  // -- README ----------------------------------------------------------------
  if (!existsSync(t.readmePath)) { fail(where, 'README.md is missing'); continue }
  const md = read(t.readmePath)

  const h1 = md.match(/^#\s+(.+?)\s*$/m)?.[1]
  if (h1 !== t.name) fail(where, `README title "${h1}" does not match meta.json name "${t.name}"`)

  const found = headings(md)
  for (const required of REQUIRED_SECTIONS) {
    if (!found.includes(required)) fail(where, `README is missing the "## ${required}" section`)
  }
  for (const h of found) {
    if (!SECTION_ORDER.includes(h)) fail(where, `README has an unrecognised section "## ${h}" — see SECTION_ORDER in scripts/lib.mjs`)
  }
  const ranks = found.filter((h) => SECTION_ORDER.includes(h)).map((h) => SECTION_ORDER.indexOf(h))
  for (let i = 1; i < ranks.length; i++) {
    if (ranks[i] < ranks[i - 1]) {
      fail(where, `README sections are out of order: "## ${found[i]}" must come before "## ${found[i - 1]}"`)
      break
    }
  }

  // The preview at the top is generated; it must exist and point at the
  // template's own asset. `npm run build` writes it — never hand-edit it.
  const region = md.match(/<!-- BEGIN:preview -->([\s\S]*?)<!-- END:preview -->/)?.[1]
  if (region === undefined) fail(where, 'README has no <!-- BEGIN:preview --> region — run `npm run build`')
  else {
    const preview = region.match(/!\[[^\]]*\]\(([^)]+)\)/)?.[1]
    if (!preview) fail(where, 'the preview region holds no image')
    else if (t.tplRelAsset && preview !== t.tplRelAsset) {
      fail(where, `![preview] points at "${preview}" but meta.json declares "${t.asset}" — run \`npm run build\``)
    }
  }

  // -- placeholders ----------------------------------------------------------
  const sample = copySample(md)
  if (!sample.trim()) fail(where, '## Copy & Customize has no fenced block to paste')

  const specs = (t.placeholders ?? []).map((p) => p.token)
  for (const token of tokensIn(sample)) {
    if (!specs.some((spec) => tokenMatches(spec, token))) {
      fail(where, `{{${token}}} appears in the Copy block but is not declared in meta.json placeholders`)
    }
  }
  const setupText = section(md, 'Setup')
  for (const p of t.placeholders ?? []) {
    if (!p.description) fail(where, `placeholder {{${p.token}}} has no description`)
    if (!WHERES.includes(p.where)) fail(where, `placeholder {{${p.token}}} has where:"${p.where}" — expected one of ${WHERES.join(', ')}`)
    const home = { markdown: sample, setup: setupText }[p.where]
    if (home !== undefined && !p.token.includes('*') && !home.includes(`{{${p.token}}}`)) {
      fail(where, `placeholder {{${p.token}}} is marked where:"${p.where}" but does not appear there`)
    }
  }
  if (t.kind !== 'svg' && (t.placeholders ?? []).some((p) => p.where === 'asset')) {
    // Only self-hosted SVG templates have an asset the reader edits by hand.
    fail(where, `kind "${t.kind}" cannot have placeholders with where:"asset" — nothing for the reader to edit`)
  }

  // -- declared services must match what the sample actually calls -----------
  const declared = t.services.map((s) => s.host).sort()
  const actual = hostsIn(sample)
  for (const host of actual) {
    if (!declared.includes(host)) fail(where, `Copy block fetches from ${host} but meta.json does not declare it in services`)
  }
  for (const host of declared) {
    if (!actual.includes(host)) fail(where, `meta.json declares service ${host} but no image in the Copy block calls it`)
  }
  if (t.kind === 'markdown' && actual.some((h) => h !== 'readme-typing-svg.demolab.com')) {
    fail(where, `kind "markdown" means no images; the Copy block calls ${actual.join(', ')}`)
  }

  // -- the <picture> flag must be true iff the sample uses one ---------------
  const usesPicture = /<picture>/.test(sample)
  if (usesPicture !== !!t.picture) {
    fail(where, `meta.json picture:${!!t.picture} but the Copy block ${usesPicture ? 'does' : 'does not'} use <picture>`)
  }

  // -- an `action` template must show the workflow it needs ------------------
  if (t.kind === 'action') {
    const setup = section(md, 'Setup')
    if (!setup.trim()) fail(where, 'kind "action" requires a "## Setup" section explaining the one-time workflow')
    else if (!/```ya?ml/.test(setup)) fail(where, '## Setup must contain the workflow as a ```yaml block')
  }
  if (t.kind === 'svg' && !section(md, 'Setup').trim()) {
    fail(where, 'kind "svg" requires a "## Setup" section telling the reader where to put the file')
  }
}

// --------------------------------------------------------------- root README

const rootReadme = read(join(ROOT, 'README.md'))

// Every service credited at the root must be used by at least one template,
// and every service a template uses must be credited at the root.
const usedCredits = new Map()
for (const t of templates) for (const c of t.credits ?? []) usedCredits.set(c.url, c)

const creditsSection = section(rootReadme, 'Credits')
if (creditsSection) {
  for (const c of usedCredits.values()) {
    if (!creditsSection.includes(c.url)) fail('README.md', `${c.author}/${c.name} is used by a template but not credited`)
  }
  // Only project links (owner/repo) are credits; a bare owner link is the
  // heading for that person's entry, not a claim that we depend on them.
  const projectLinks = [...creditsSection.matchAll(/\((https:\/\/github\.com\/[^)\s]+\/[^)\s]+)\)/g)].map((m) => m[1])
  for (const url of projectLinks) {
    if (!usedCredits.has(url)) fail('README.md', `credits link ${url} is not used by any template`)
  }
}

// Counts written in prose must match the manifest.
for (const m of rootReadme.matchAll(/(\d+)\s+templates?\b/gi)) {
  if (Number(m[1]) !== templates.length) {
    fail('README.md', `prose says "${m[0]}" but the manifest has ${templates.length}`)
  }
}
for (const m of rootReadme.matchAll(/(\w+|\d+)\s+categor(?:y|ies)\b/gi)) {
  const words = { nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13 }
  const n = words[m[1].toLowerCase()] ?? Number(m[1])
  if (Number.isFinite(n) && n !== categories.length) {
    fail('README.md', `prose says "${m[0]}" but the manifest has ${categories.length}`)
  }
}

// ------------------------------------------------------------------- report

if (problems.length === 0) {
  console.log(`ok — ${templates.length} templates across ${categories.length} categories, all checks passed`)
  process.exit(0)
}

const byWhere = new Map()
for (const p of problems) {
  if (!byWhere.has(p.where)) byWhere.set(p.where, [])
  byWhere.get(p.where).push(p.msg)
}
for (const [where, msgs] of byWhere) {
  console.error(`\n${where}`)
  for (const m of msgs) console.error(`  · ${m}`)
}
console.error(`\n${problems.length} problem(s) in ${byWhere.size} file(s).`)
process.exit(1)
