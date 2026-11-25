import { defineConfig } from 'vitest/config'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

// Favicons and the link-preview cover live in public/ under fixed names, so browsers
// (favicon cache) and link-preview crawlers kept showing the old images after they changed.
// This appends ?v=<content hash> to every reference to them in index.html, so the URL
// changes exactly when the file does.
const VERSIONED = /((?:href|content)="|"image": ")((?:https:\/\/portfolio\.weissmurillo\.de)?\/([\w.-]+\.(?:ico|svg|png|jpg|webmanifest)))"/g
function versionPublicAssets(): Plugin {
  return {
    name: 'version-public-assets',
    transformIndexHtml(html) {
      return html.replace(VERSIONED, (match, before: string, url: string, file: string) => {
        const path = resolve(__dirname, 'public', file)
        if (!existsSync(path)) return match
        const v = createHash('sha256').update(readFileSync(path)).digest('hex').slice(0, 8)
        return `${before}${url}?v=${v}"`
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    versionPublicAssets(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
