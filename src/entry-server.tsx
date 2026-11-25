// src/entry-server.tsx
// Build-time entry used by scripts/prerender.mjs to turn the SPA into static HTML.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { LanguageProvider } from './contexts/LanguageContext.tsx'
import { API_ENDPOINTS, type Json } from './data/api.ts'
import { REPOS } from './data/repos.ts'

export function render(): string {
  return renderToString(
    <StrictMode>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </StrictMode>,
  )
}

/** Documents published as static JSON under /v1/<path>.json (PT and EN paths). */
export function apiDocuments(): { path: string; body: Json }[] {
  const repos = (lang: 'pt' | 'en'): Json =>
    REPOS.map(r => ({ name: r.name, url: r.url, language: r.language, description: r.desc[lang] }))

  return [
    ...API_ENDPOINTS.pt,
    ...API_ENDPOINTS.en.filter(ep => !API_ENDPOINTS.pt.some(pt => pt.path === ep.path)),
    { path: 'repositorios', body: repos('pt') },
    { path: 'repositories', body: repos('en') },
  ]
}
