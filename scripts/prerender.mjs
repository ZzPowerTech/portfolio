// scripts/prerender.mjs
// Runs after `vite build` (client) and `vite build --ssr` (server). Renders the app to
// HTML and injects it into dist/index.html so crawlers and AI assistants get the full
// content without executing JavaScript.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const serverDir = path.join(root, 'dist-server')
const indexPath = path.join(dist, 'index.html')
const PLACEHOLDER = '<!--app-html-->'

const { render, apiDocuments } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)
const template = await readFile(indexPath, 'utf8')

if (!template.includes(PLACEHOLDER)) {
  throw new Error(`prerender: ${PLACEHOLDER} not found in dist/index.html`)
}

const appHtml = render()
if (!appHtml.includes('Murillo')) {
  throw new Error('prerender: rendered HTML looks empty')
}

await writeFile(indexPath, template.replace(PLACEHOLDER, appHtml))
const apiDir = path.join(dist, 'v1')
await mkdir(apiDir, { recursive: true })
const docs = apiDocuments()
for (const doc of docs) {
  await writeFile(path.join(apiDir, `${doc.path}.json`), `${JSON.stringify(doc.body, null, 2)}\n`)
}
console.log(`prerender: wrote ${docs.length} JSON documents to dist/v1/`)

await rm(serverDir, { recursive: true, force: true })

console.log(`prerender: injected ${(appHtml.length / 1024).toFixed(1)} KiB of HTML into dist/index.html`)
