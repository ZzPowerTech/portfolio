# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark, purple-accented portfolio SPA for Murillo W. Kist with animated hero, clickable project/repo cards, PT/EN toggle, and GitHub API integration — deployed to Vercel at portfolio.weissmurillo.de.

**Architecture:** Single-page React 19 + Vite 8 SPA. No router — `<a href="#projects">` for smooth scroll. `LanguageContext` (plain React context, no external library) handles PT/EN i18n. GitHub repos fetched live via `api.github.com` in a custom hook. Framer Motion drives all animations. All cards are `<a target="_blank">` elements.

**Tech Stack:** React 19, TypeScript, Vite 8, Framer Motion, Vitest + React Testing Library + jsdom

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `vite.config.ts` | Add Vitest test configuration |
| Modify | `tsconfig.app.json` | Add `vitest/globals` to types |
| Modify | `package.json` | Add `test` script |
| Create | `src/test/setup.ts` | Import `@testing-library/jest-dom` matchers |
| Replace | `src/index.css` | Global CSS variables (design tokens) + resets |
| Replace | `src/App.css` | Empty — boilerplate removed |
| Replace | `src/App.tsx` | Root layout: assembles Header + Hero + Projects + Repos + Footer |
| Modify | `src/main.tsx` | Wrap `<App>` with `<LanguageProvider>` |
| Create | `src/data/translations.ts` | PT/EN string dictionaries + `Language` type |
| Create | `src/data/projects.ts` | Hardcoded online project data + `Project` type |
| Create | `src/data/repos.ts` | List of GitHub repo slugs |
| Create | `src/contexts/LanguageContext.tsx` | Language state, toggle, `useLanguage` hook |
| Create | `src/contexts/__tests__/LanguageContext.test.tsx` | Tests: initial state, toggle, error outside provider |
| Create | `src/hooks/useGitHubRepos.ts` | Fetch repos from GitHub API → `{ repos, loading, error }` |
| Create | `src/hooks/__tests__/useGitHubRepos.test.ts` | Tests: loading, success, failure |
| Create | `src/components/Header.tsx` | Sticky nav: logo, links, PT/EN toggle button |
| Create | `src/components/__tests__/Header.test.tsx` | Tests: renders links, toggle changes language |
| Create | `src/components/Hero.tsx` | Split layout: left content + right photo + Framer Motion stagger |
| Create | `src/components/__tests__/Hero.test.tsx` | Tests: name, CV link, photo present |
| Create | `src/components/ProjectCard.tsx` | `<a>` card: emoji, name, desc, tags, ONLINE badge, ↗ |
| Create | `src/components/Projects.tsx` | Section heading + 3-col grid of ProjectCards |
| Create | `src/components/__tests__/Projects.test.tsx` | Tests: 4 cards rendered, correct hrefs |
| Create | `src/components/RepoCard.tsx` | `<a>` card: name, desc, language dot, stars, ↗ |
| Create | `src/components/Repos.tsx` | Section heading + grid of RepoCards + loading/error states |
| Create | `src/components/__tests__/Repos.test.tsx` | Tests: loading state, repos rendered, error state |
| Create | `src/components/Footer.tsx` | Copyright + GitHub/LinkedIn icon links |
| Create | `src/components/__tests__/Footer.test.tsx` | Tests: renders both social links |

---

## Task 1: Dev tooling — Vitest + Framer Motion

**Files:**
- Modify: `vite.config.ts`
- Modify: `tsconfig.app.json`
- Modify: `package.json`
- Create: `src/test/setup.ts`

- [ ] **Step 1.1: Install dependencies**

```bash
cd C:/Users/Murilo/Documents/Faculdade/Projetos/portfolio
npm install framer-motion
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

Expected: packages added to `node_modules`, `package-lock.json` updated.

- [ ] **Step 1.2: Write failing test to confirm Vitest is not yet configured**

Create `src/test/setup.ts` (empty for now):

```ts
// src/test/setup.ts
```

Try running:
```bash
npx vitest run 2>&1 | head -20
```
Expected: error about missing config or no test files found.

- [ ] **Step 1.3: Update `vite.config.ts` to add Vitest config**

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
```

- [ ] **Step 1.4: Update `src/test/setup.ts`**

```ts
// src/test/setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 1.5: Update `tsconfig.app.json` — add vitest globals**

Change `"types": ["vite/client"]` to:

```json
"types": ["vite/client", "vitest/globals"]
```

- [ ] **Step 1.6: Add `test` script to `package.json`**

In the `scripts` block, add:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 1.7: Verify setup works**

Create a smoke test `src/test/smoke.test.ts`:

```ts
describe('vitest setup', () => {
  it('jest-dom matchers work', () => {
    const el = document.createElement('div')
    el.textContent = 'hello'
    document.body.appendChild(el)
    expect(el).toBeInTheDocument()
    document.body.removeChild(el)
  })
})
```

Run:
```bash
npm test
```
Expected: `1 passed`.

- [ ] **Step 1.8: Delete smoke test and commit**

```bash
del src\test\smoke.test.ts
git add vite.config.ts tsconfig.app.json package.json package-lock.json src/test/setup.ts
git commit -m "chore: install framer-motion and configure vitest"
```

---

## Task 2: Clear boilerplate + global CSS design system

**Files:**
- Replace: `src/index.css`
- Replace: `src/App.css`

- [ ] **Step 2.1: Replace `src/App.css` with empty file**

```css
/* src/App.css — intentionally empty, styles live in index.css and inline */
```

- [ ] **Step 2.2: Replace `src/index.css` with design system**

```css
/* src/index.css */
:root {
  --bg-base: #030712;
  --bg-card: #0f172a;
  --purple-600: #7c3aed;
  --purple-500: #a855f7;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --green-500: #22c55e;
  --border-subtle: #1e293b;
  --border-purple: rgba(124, 58, 237, 0.25);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
}
```

- [ ] **Step 2.3: Commit**

```bash
git add src/index.css src/App.css
git commit -m "style: replace boilerplate CSS with portfolio design system"
```

---

## Task 3: Data layer — translations, projects, repos

**Files:**
- Create: `src/data/translations.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/repos.ts`

- [ ] **Step 3.1: Create `src/data/translations.ts`**

```ts
// src/data/translations.ts
export type Language = 'pt' | 'en'

export interface Translations {
  nav: { projects: string }
  hero: {
    tag: string
    role: string
    desc: string
    downloadCV: string
    viewProjects: string
    available: string
  }
  projects: {
    label: string
    title: string
    subtitle: string
    online: string
  }
  repos: {
    label: string
    title: string
    subtitle: string
  }
  footer: { copyright: string }
}

export const translations: Record<Language, Translations> = {
  pt: {
    nav: { projects: 'Projetos' },
    hero: {
      tag: 'DESENVOLVEDOR · IA & JAVA',
      role: 'Java Developer & AI Enthusiast',
      desc: 'Desenvolvedor apaixonado por Inteligência Artificial e Java, com experiência real em produção liderando o AusTv Network. Em busca da primeira oportunidade formal na área de tecnologia.',
      downloadCV: '↓ Baixar Currículo',
      viewProjects: 'Ver Projetos ↓',
      available: 'Aberto a oportunidades',
    },
    projects: {
      label: 'PORTFÓLIO',
      title: 'Projetos em produção',
      subtitle: 'Sistemas ativos — clique para visitar',
      online: 'ONLINE',
    },
    repos: {
      label: 'OPEN SOURCE',
      title: 'Repositórios públicos',
      subtitle: 'Clique para abrir no GitHub · dados ao vivo via API',
    },
    footer: { copyright: '© 2026 Murillo W. Kist · portfolio.weissmurillo.de' },
  },
  en: {
    nav: { projects: 'Projects' },
    hero: {
      tag: 'DEVELOPER · AI & JAVA',
      role: 'Java Developer & AI Enthusiast',
      desc: 'Developer passionate about Artificial Intelligence and Java, with real production experience leading AusTv Network. Looking for the first formal opportunity in tech.',
      downloadCV: '↓ Download Resume',
      viewProjects: 'View Projects ↓',
      available: 'Open to opportunities',
    },
    projects: {
      label: 'PORTFOLIO',
      title: 'Live projects',
      subtitle: 'Active systems — click to visit',
      online: 'LIVE',
    },
    repos: {
      label: 'OPEN SOURCE',
      title: 'Public repositories',
      subtitle: 'Click to open on GitHub · live data from API',
    },
    footer: { copyright: '© 2026 Murillo W. Kist · portfolio.weissmurillo.de' },
  },
}
```

- [ ] **Step 3.2: Create `src/data/projects.ts`**

```ts
// src/data/projects.ts
export interface Project {
  id: string
  name: string
  desc: { pt: string; en: string }
  url: string
  emoji: string
  tags: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 'austv',
    name: 'AusTv Network',
    desc: {
      pt: 'Servidor Minecraft com plugins customizados em Java, gestão de 200+ jogadores e economia virtual.',
      en: 'Minecraft server with custom Java plugins, managing 200+ players and a virtual economy.',
    },
    url: 'https://austv.net',
    emoji: '⚡',
    tags: ['Java', 'Spigot', 'MySQL'],
  },
  {
    id: 'austv-store',
    name: 'AusTv Store',
    desc: {
      pt: 'Loja de itens e ranks com integração de pagamentos e painel administrativo.',
      en: 'Items and rank store with payment integration and admin dashboard.',
    },
    url: 'https://loja.austv.net',
    emoji: '🛒',
    tags: ['Next.js', 'NestJS', 'PostgreSQL'],
  },
  {
    id: 'intercom',
    name: 'Intercom 2026 — FAG',
    desc: {
      pt: 'Site oficial da semana acadêmica da FAG Toledo com programação e inscrições.',
      en: 'Official site for FAG Toledo academic week with schedule and registrations.',
    },
    url: 'https://intercom2026.fag.edu.br/',
    emoji: '🎓',
    tags: ['React', 'NestJS'],
  },
  {
    id: 'samuel',
    name: 'Landing Page — Samuel',
    desc: {
      pt: 'Landing page profissional desenvolvida sob demanda com foco em conversão.',
      en: 'Professional landing page built on demand with a focus on conversion.',
    },
    url: 'https://samuel-frontend.vercel.app/',
    emoji: '🌐',
    tags: ['React', 'Vercel'],
  },
]
```

- [ ] **Step 3.3: Create `src/data/repos.ts`**

```ts
// src/data/repos.ts
export const REPO_SLUGS = [
  'questExtra---plugin',
  'Intercom-BackEnd-',
  'api-discord-top-donators',
  'centralCartAPIPlugin',
  'estacionamento-vision',
  'portfolio',
] as const

export type RepoSlug = (typeof REPO_SLUGS)[number]
```

- [ ] **Step 3.4: Commit**

```bash
git add src/data/
git commit -m "feat: add translations, projects and repo data"
```

---

## Task 4: LanguageContext

**Files:**
- Create: `src/contexts/LanguageContext.tsx`
- Create: `src/contexts/__tests__/LanguageContext.test.tsx`

- [ ] **Step 4.1: Write failing tests**

Create `src/contexts/__tests__/LanguageContext.test.tsx`:

```tsx
// src/contexts/__tests__/LanguageContext.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider, useLanguage } from '../LanguageContext'

function Consumer() {
  const { lang, t, toggle } = useLanguage()
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="tag">{t.hero.tag}</span>
      <button onClick={toggle}>toggle</button>
    </div>
  )
}

describe('LanguageContext', () => {
  it('defaults to Portuguese', () => {
    render(<LanguageProvider><Consumer /></LanguageProvider>)
    expect(screen.getByTestId('lang')).toHaveTextContent('pt')
    expect(screen.getByTestId('tag')).toHaveTextContent('DESENVOLVEDOR')
  })

  it('toggles to English on click', async () => {
    render(<LanguageProvider><Consumer /></LanguageProvider>)
    await userEvent.click(screen.getByRole('button', { name: /toggle/i }))
    expect(screen.getByTestId('lang')).toHaveTextContent('en')
    expect(screen.getByTestId('tag')).toHaveTextContent('DEVELOPER')
  })

  it('throws when used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Consumer />)).toThrow('useLanguage must be used within LanguageProvider')
    spy.mockRestore()
  })
})
```

Run:
```bash
npm test
```
Expected: 3 tests FAIL — `LanguageContext` not created yet.

- [ ] **Step 4.2: Create `src/contexts/LanguageContext.tsx`**

```tsx
// src/contexts/LanguageContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react'
import { type Language, type Translations, translations } from '../data/translations'

interface LanguageContextType {
  lang: Language
  t: Translations
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('pt')
  const toggle = () => setLang(prev => (prev === 'pt' ? 'en' : 'pt'))

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
```

- [ ] **Step 4.3: Run tests — all 3 must pass**

```bash
npm test
```
Expected: `3 passed`.

- [ ] **Step 4.4: Commit**

```bash
git add src/contexts/
git commit -m "feat: add LanguageContext with PT/EN toggle"
```

---

## Task 5: useGitHubRepos hook

**Files:**
- Create: `src/hooks/useGitHubRepos.ts`
- Create: `src/hooks/__tests__/useGitHubRepos.test.ts`

- [ ] **Step 5.1: Write failing tests**

Create `src/hooks/__tests__/useGitHubRepos.test.ts`:

```ts
// src/hooks/__tests__/useGitHubRepos.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { useGitHubRepos } from '../useGitHubRepos'

const mockRepo = (slug: string) => ({
  name: slug,
  description: `Description of ${slug}`,
  html_url: `https://github.com/ZzPowerTech/${slug}`,
  language: 'TypeScript',
  stargazers_count: 0,
})

describe('useGitHubRepos', () => {
  afterEach(() => vi.restoreAllMocks())

  it('starts in loading state', () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response())
    const { result } = renderHook(() => useGitHubRepos())
    expect(result.current.loading).toBe(true)
    expect(result.current.repos).toHaveLength(0)
  })

  it('returns repos on success', async () => {
    vi.spyOn(global, 'fetch').mockImplementation((url) => {
      const slug = String(url).split('/').pop()!
      return Promise.resolve(new Response(JSON.stringify(mockRepo(slug)), { status: 200 }))
    })

    const { result } = renderHook(() => useGitHubRepos())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.repos).toHaveLength(6)
    expect(result.current.error).toBeNull()
  })

  it('sets error on fetch failure', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('network error'))
    const { result } = renderHook(() => useGitHubRepos())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('network error')
    expect(result.current.repos).toHaveLength(0)
  })
})
```

Run:
```bash
npm test
```
Expected: 3 tests FAIL — hook not created yet.

- [ ] **Step 5.2: Create `src/hooks/useGitHubRepos.ts`**

```ts
// src/hooks/useGitHubRepos.ts
import { useEffect, useState } from 'react'
import { REPO_SLUGS } from '../data/repos'

export interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
}

interface UseGitHubReposResult {
  repos: GitHubRepo[]
  loading: boolean
  error: string | null
}

const OWNER = 'ZzPowerTech'

export function useGitHubRepos(): UseGitHubReposResult {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const promises = REPO_SLUGS.map(slug =>
      fetch(`https://api.github.com/repos/${OWNER}/${slug}`).then(r => {
        if (!r.ok) throw new Error(`Failed to fetch ${slug}: ${r.status}`)
        return r.json() as Promise<GitHubRepo>
      }),
    )

    Promise.all(promises)
      .then(data => {
        setRepos(data)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { repos, loading, error }
}
```

- [ ] **Step 5.3: Run tests — all 3 must pass**

```bash
npm test
```
Expected: `6 passed` (3 context + 3 hook).

- [ ] **Step 5.4: Commit**

```bash
git add src/hooks/
git commit -m "feat: add useGitHubRepos hook with loading/error states"
```

---

## Task 6: Header component

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/__tests__/Header.test.tsx`

- [ ] **Step 6.1: Write failing test**

Create `src/components/__tests__/Header.test.tsx`:

```tsx
// src/components/__tests__/Header.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider } from '../../contexts/LanguageContext'
import { Header } from '../Header'

vi.mock('framer-motion', () => ({
  motion: { header: ({ children, ...p }: React.HTMLAttributes<HTMLElement>) => <header {...p}>{children}</header> },
}))

function Wrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

describe('Header', () => {
  it('renders MW. logo', () => {
    render(<Header />, { wrapper: Wrapper })
    expect(screen.getByText('MW.')).toBeInTheDocument()
  })

  it('links to GitHub and LinkedIn', () => {
    render(<Header />, { wrapper: Wrapper })
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/ZzPowerTech')
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/murillo-weiss-kist-6aa2a1279/')
  })

  it('language toggle switches PT to EN', async () => {
    render(<Header />, { wrapper: Wrapper })
    const btn = screen.getByRole('button', { name: /pt/i })
    expect(btn).toBeInTheDocument()
    await userEvent.click(btn)
    expect(btn).toHaveTextContent('EN | PT')
  })
})
```

Run:
```bash
npm test
```
Expected: 3 FAIL — `Header` not created.

- [ ] **Step 6.2: Create `src/components/Header.tsx`**

```tsx
// src/components/Header.tsx
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

const GH_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LI_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const linkStyle: React.CSSProperties = {
  color: 'var(--text-secondary)',
  fontSize: 13,
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  transition: 'color 0.2s',
}

export function Header() {
  const { lang, t, toggle } = useLanguage()

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 48px',
        background: 'rgba(3, 7, 18, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(124, 58, 237, 0.12)',
      }}
    >
      <span style={{ color: 'var(--purple-500)', fontWeight: 800, fontSize: 16, letterSpacing: '-0.5px' }}>
        MW.
      </span>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <a href="#projects" style={linkStyle}>{t.nav.projects}</a>
        <a href="https://github.com/ZzPowerTech" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={linkStyle}>
          {GH_ICON} GitHub
        </a>
        <a href="https://www.linkedin.com/in/murillo-weiss-kist-6aa2a1279/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={linkStyle}>
          {LI_ICON} LinkedIn
        </a>
        <button
          onClick={toggle}
          style={{
            background: 'rgba(124, 58, 237, 0.12)',
            border: '1px solid rgba(124, 58, 237, 0.25)',
            color: 'var(--purple-500)',
            padding: '5px 12px',
            borderRadius: 6,
            fontSize: 11,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          {lang === 'pt' ? 'PT | EN' : 'EN | PT'}
        </button>
      </nav>
    </motion.header>
  )
}
```

- [ ] **Step 6.3: Run tests — all must pass**

```bash
npm test
```
Expected: `9 passed`.

- [ ] **Step 6.4: Commit**

```bash
git add src/components/Header.tsx src/components/__tests__/Header.test.tsx
git commit -m "feat: add Header with sticky nav and language toggle"
```

---

## Task 7: Hero section

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/__tests__/Hero.test.tsx`

- [ ] **Step 7.1: Write failing test**

Create `src/components/__tests__/Hero.test.tsx`:

```tsx
// src/components/__tests__/Hero.test.tsx
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../../contexts/LanguageContext'
import { Hero } from '../Hero'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div {...p}>{children}</div>,
    section: ({ children, ...p }: React.HTMLAttributes<HTMLElement>) => <section {...p}>{children}</section>,
    img: ({ ...p }: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...p} />,
  },
  useAnimation: () => ({}),
}))

function Wrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

describe('Hero', () => {
  it('renders full name', () => {
    render(<Hero />, { wrapper: Wrapper })
    expect(screen.getByText(/murillo/i)).toBeInTheDocument()
    expect(screen.getByText(/w\. kist/i)).toBeInTheDocument()
  })

  it('CV button links to correct PDF', () => {
    render(<Hero />, { wrapper: Wrapper })
    const cvLink = screen.getByRole('link', { name: /baixar currículo|download resume/i })
    expect(cvLink).toHaveAttribute('download')
  })

  it('renders profile photo', () => {
    render(<Hero />, { wrapper: Wrapper })
    const img = screen.getByAltText(/murillo w\. kist/i)
    expect(img).toBeInTheDocument()
  })
})
```

Run:
```bash
npm test
```
Expected: 3 FAIL.

- [ ] **Step 7.2: Create `src/components/Hero.tsx`**

```tsx
// src/components/Hero.tsx
import { motion } from 'framer-motion'
import heroImg from '../assets/hero.png'
import cvUrl from '../assets/curriculum/Curriculo_Murilo_Weiss_Kist_Ultra_Profissional.pdf?url'
import { useLanguage } from '../contexts/LanguageContext'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

export function Hero() {
  const { t } = useLanguage()

  return (
    <section
      style={{
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.04,
        backgroundImage: 'linear-gradient(var(--purple-500) 1px, transparent 1px), linear-gradient(90deg, var(--purple-500) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 600px 500px at 80% 50%, rgba(124,58,237,0.1) 0%, transparent 70%), radial-gradient(ellipse 300px 300px at 20% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)',
      }} />

      {/* Left: content */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, maxWidth: 520 }}>
        <motion.div {...fadeUp(0.1)}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
            color: 'var(--purple-500)', fontSize: 10, letterSpacing: 3,
            padding: '5px 12px', borderRadius: 20, marginBottom: 20,
          }}>
            <span style={{ width: 5, height: 5, background: 'var(--purple-500)', borderRadius: '50%', display: 'inline-block' }} />
            {t.hero.tag}
          </span>
        </motion.div>

        <motion.h1 {...fadeUp(0.2)} style={{ fontSize: 52, fontWeight: 900, letterSpacing: '-2px', lineHeight: 1, color: 'var(--text-primary)', marginBottom: 6 }}>
          Murillo<br />
          <span style={{ color: 'var(--purple-500)' }}>W. Kist</span>
        </motion.h1>

        <motion.p {...fadeUp(0.3)} style={{ fontSize: 16, color: 'var(--text-muted)', fontWeight: 400 }}>
          {t.hero.role}
        </motion.p>

        <motion.div {...fadeUp(0.35)} style={{ width: 40, height: 2, background: 'var(--purple-600)', margin: '16px 0' }} />

        <motion.p {...fadeUp(0.4)} style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, marginBottom: 28, maxWidth: 400 }}>
          {t.hero.desc}
        </motion.p>

        <motion.div {...fadeUp(0.5)} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a
            href={cvUrl}
            download
            style={{
              background: 'linear-gradient(135deg, var(--purple-600), var(--purple-500))',
              color: '#fff', padding: '11px 24px', borderRadius: 8,
              fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: '0 0 20px rgba(124,58,237,0.25)',
            }}
          >
            {t.hero.downloadCV}
          </a>
          <a
            href="#projects"
            style={{
              border: '1px solid rgba(124,58,237,0.25)',
              color: 'var(--purple-500)', padding: '11px 24px', borderRadius: 8,
              fontSize: 12, display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            {t.hero.viewProjects}
          </a>
        </motion.div>
      </div>

      {/* Right: photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ position: 'relative', zIndex: 1, flexShrink: 0, marginLeft: 60 }}
      >
        {/* Pulsing glow */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: -24,
            background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        <div style={{
          width: 210, height: 210, borderRadius: 24,
          border: '2px solid rgba(124,58,237,0.4)',
          overflow: 'hidden', position: 'relative',
          boxShadow: '0 0 50px rgba(124,58,237,0.18)',
        }}>
          <img
            src={heroImg}
            alt="Murillo W. Kist"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
          {/* Subtle purple overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(124,58,237,0.05), transparent 60%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Available badge */}
        <div style={{
          position: 'absolute', bottom: -12, right: -12,
          background: 'var(--bg-card)', border: '1px solid rgba(124,58,237,0.25)',
          borderRadius: 10, padding: '7px 12px',
          display: 'flex', alignItems: 'center', gap: 6,
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }}>
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 6, height: 6, background: 'var(--green-500)', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px var(--green-500)' }}
          />
          <span style={{ color: 'var(--text-secondary)', fontSize: 9 }}>{t.hero.available}</span>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 7.3: Run tests — all must pass**

```bash
npm test
```
Expected: `12 passed`.

- [ ] **Step 7.4: Commit**

```bash
git add src/components/Hero.tsx src/components/__tests__/Hero.test.tsx
git commit -m "feat: add Hero section with Framer Motion animations"
```

---

## Task 8: ProjectCard + Projects section

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/Projects.tsx`
- Create: `src/components/__tests__/Projects.test.tsx`

- [ ] **Step 8.1: Write failing test**

Create `src/components/__tests__/Projects.test.tsx`:

```tsx
// src/components/__tests__/Projects.test.tsx
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../../contexts/LanguageContext'
import { Projects } from '../Projects'

vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...p }: React.HTMLAttributes<HTMLElement>) => <section {...p}>{children}</section>,
    a: ({ children, ...p }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...p}>{children}</a>,
  },
}))

function Wrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

describe('Projects', () => {
  it('renders all 4 project cards', () => {
    render(<Projects />, { wrapper: Wrapper })
    expect(screen.getByText('AusTv Network')).toBeInTheDocument()
    expect(screen.getByText('AusTv Store')).toBeInTheDocument()
    expect(screen.getByText('Intercom 2026 — FAG')).toBeInTheDocument()
    expect(screen.getByText('Landing Page — Samuel')).toBeInTheDocument()
  })

  it('each card links to correct URL in new tab', () => {
    render(<Projects />, { wrapper: Wrapper })
    const austv = screen.getByRole('link', { name: /austv network/i })
    expect(austv).toHaveAttribute('href', 'https://austv.net')
    expect(austv).toHaveAttribute('target', '_blank')
  })

  it('shows ONLINE badge on all cards', () => {
    render(<Projects />, { wrapper: Wrapper })
    const badges = screen.getAllByText('ONLINE')
    expect(badges).toHaveLength(4)
  })
})
```

Run:
```bash
npm test
```
Expected: 3 FAIL.

- [ ] **Step 8.2: Create `src/components/ProjectCard.tsx`**

```tsx
// src/components/ProjectCard.tsx
import { motion } from 'framer-motion'
import type { Project } from '../data/projects'
import type { Language } from '../data/translations'

interface ProjectCardProps {
  project: Project
  lang: Language
  onlineBadge: string
}

const LANGUAGE_COLORS: Record<string, string> = {
  Java: '#f89820',
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572a5',
}

export function ProjectCard({ project, lang, onlineBadge }: ProjectCardProps) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={project.name}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(124,58,237,0.15)' }}
      transition={{ duration: 0.2 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 12,
        padding: 20,
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      {/* Top line on hover (CSS workaround via box-shadow on border) */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
        }}>
          {project.emoji}
        </span>

        {/* ONLINE badge */}
        <span style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)',
          padding: '3px 8px', borderRadius: 4,
        }}>
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 5, height: 5, background: 'var(--green-500)', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 6px var(--green-500)' }}
          />
          <span style={{ color: 'var(--green-500)', fontSize: 9, fontWeight: 600 }}>{onlineBadge}</span>
        </span>
      </div>

      {/* External link icon */}
      <span style={{ position: 'absolute', top: 14, right: 14, color: 'rgba(124,58,237,0.3)', fontSize: 13 }}>↗</span>

      <p style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
        {project.name}
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: 11, lineHeight: 1.5, marginBottom: 14 }}>
        {project.desc[lang]}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {project.tags.map(tag => (
          <span
            key={tag}
            style={{
              background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.15)',
              color: 'var(--purple-500)', padding: '2px 8px', borderRadius: 4, fontSize: 9,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Language dot if first tag matches known language */}
      {LANGUAGE_COLORS[project.tags[0]] && (
        <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: LANGUAGE_COLORS[project.tags[0]], display: 'inline-block' }} />
        </div>
      )}
    </motion.a>
  )
}
```

- [ ] **Step 8.3: Create `src/components/Projects.tsx`**

```tsx
// src/components/Projects.tsx
import { motion } from 'framer-motion'
import { PROJECTS } from '../data/projects'
import { useLanguage } from '../contexts/LanguageContext'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  const { lang, t } = useLanguage()

  return (
    <motion.section
      id="projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      style={{ padding: '80px 80px' }}
    >
      <p style={{ color: 'var(--purple-500)', fontSize: 10, letterSpacing: 4, fontWeight: 600, marginBottom: 8 }}>
        {t.projects.label}
      </p>
      <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-1px', color: 'var(--text-primary)', marginBottom: 8 }}>
        {t.projects.title}
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 40 }}>
        {t.projects.subtitle}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {PROJECTS.map(project => (
          <motion.div
            key={project.id}
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4 }}
          >
            <ProjectCard project={project} lang={lang} onlineBadge={t.projects.online} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
```

- [ ] **Step 8.4: Run tests — all must pass**

```bash
npm test
```
Expected: `15 passed`.

- [ ] **Step 8.5: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/Projects.tsx src/components/__tests__/Projects.test.tsx
git commit -m "feat: add ProjectCard and Projects section with animated grid"
```

---

## Task 9: RepoCard + Repos section

**Files:**
- Create: `src/components/RepoCard.tsx`
- Create: `src/components/Repos.tsx`
- Create: `src/components/__tests__/Repos.test.tsx`

- [ ] **Step 9.1: Write failing test**

Create `src/components/__tests__/Repos.test.tsx`:

```tsx
// src/components/__tests__/Repos.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { LanguageProvider } from '../../contexts/LanguageContext'
import { Repos } from '../Repos'

vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...p }: React.HTMLAttributes<HTMLElement>) => <section {...p}>{children}</section>,
    a: ({ children, ...p }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...p}>{children}</a>,
    div: ({ children, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div {...p}>{children}</div>,
  },
}))

const mockRepo = (slug: string) => ({
  name: slug, description: `desc-${slug}`,
  html_url: `https://github.com/ZzPowerTech/${slug}`,
  language: 'TypeScript', stargazers_count: 3,
})

function Wrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

describe('Repos', () => {
  afterEach(() => vi.restoreAllMocks())

  it('shows loading state initially', () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response())
    render(<Repos />, { wrapper: Wrapper })
    expect(screen.getByText(/carregando|loading/i)).toBeInTheDocument()
  })

  it('renders 6 repo cards after load', async () => {
    vi.spyOn(global, 'fetch').mockImplementation((url) => {
      const slug = String(url).split('/').pop()!
      return Promise.resolve(new Response(JSON.stringify(mockRepo(slug)), { status: 200 }))
    })
    render(<Repos />, { wrapper: Wrapper })
    await waitFor(() => expect(screen.queryByText(/carregando|loading/i)).not.toBeInTheDocument())
    expect(screen.getAllByRole('link')).toHaveLength(6)
  })

  it('shows error message on fetch failure', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('fail'))
    render(<Repos />, { wrapper: Wrapper })
    await waitFor(() => expect(screen.getByText(/erro|error/i)).toBeInTheDocument())
  })
})
```

Run:
```bash
npm test
```
Expected: 3 FAIL.

- [ ] **Step 9.2: Create `src/components/RepoCard.tsx`**

```tsx
// src/components/RepoCard.tsx
import { motion } from 'framer-motion'
import type { GitHubRepo } from '../hooks/useGitHubRepos'

const LANG_COLORS: Record<string, string> = {
  Java: '#f89820',
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572a5',
  Kotlin: '#7f52ff',
}

interface RepoCardProps {
  repo: GitHubRepo
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={repo.name}
      whileHover={{ y: -3, borderColor: 'rgba(124,58,237,0.35)' }}
      transition={{ duration: 0.2 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 10, padding: 16,
        display: 'flex', flexDirection: 'column', gap: 8,
        textDecoration: 'none', cursor: 'pointer',
        position: 'relative',
      }}
    >
      <span style={{ position: 'absolute', top: 12, right: 12, color: 'rgba(124,58,237,0.25)', fontSize: 11 }}>↗</span>

      <p style={{ color: 'var(--text-primary)', fontSize: 12, fontWeight: 600, paddingRight: 18 }}>
        {repo.name}
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: 10, lineHeight: 1.5, flex: 1 }}>
        {repo.description ?? '—'}
      </p>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {repo.language && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', display: 'inline-block',
              background: LANG_COLORS[repo.language] ?? '#94a3b8',
            }} />
            <span style={{ color: 'var(--text-secondary)', fontSize: 10 }}>{repo.language}</span>
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>★ {repo.stargazers_count}</span>
        )}
      </div>
    </motion.a>
  )
}
```

- [ ] **Step 9.3: Create `src/components/Repos.tsx`**

```tsx
// src/components/Repos.tsx
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { useGitHubRepos } from '../hooks/useGitHubRepos'
import { RepoCard } from './RepoCard'

export function Repos() {
  const { t } = useLanguage()
  const { repos, loading, error } = useGitHubRepos()

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      style={{ padding: '0 80px 80px' }}
    >
      <p style={{ color: 'var(--purple-500)', fontSize: 10, letterSpacing: 4, fontWeight: 600, marginBottom: 8 }}>
        {t.repos.label}
      </p>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
        {t.repos.title}
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 24 }}>
        {t.repos.subtitle}
      </p>

      {loading && (
        <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>Carregando repositórios...</p>
      )}

      {error && (
        <p style={{ color: '#ef4444', fontSize: 12 }}>Erro ao carregar repositórios: {error}</p>
      )}

      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {repos.map(repo => (
            <motion.div
              key={repo.name}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.35 }}
            >
              <RepoCard repo={repo} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  )
}
```

- [ ] **Step 9.4: Run tests — all must pass**

```bash
npm test
```
Expected: `18 passed`.

- [ ] **Step 9.5: Commit**

```bash
git add src/components/RepoCard.tsx src/components/Repos.tsx src/components/__tests__/Repos.test.tsx
git commit -m "feat: add RepoCard and Repos section with GitHub API integration"
```

---

## Task 10: Footer

**Files:**
- Create: `src/components/Footer.tsx`
- Create: `src/components/__tests__/Footer.test.tsx`

- [ ] **Step 10.1: Write failing test**

Create `src/components/__tests__/Footer.test.tsx`:

```tsx
// src/components/__tests__/Footer.test.tsx
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../../contexts/LanguageContext'
import { Footer } from '../Footer'

function Wrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

describe('Footer', () => {
  it('links to GitHub', () => {
    render(<Footer />, { wrapper: Wrapper })
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/ZzPowerTech')
  })

  it('links to LinkedIn', () => {
    render(<Footer />, { wrapper: Wrapper })
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/murillo-weiss-kist-6aa2a1279/')
  })

  it('shows copyright text', () => {
    render(<Footer />, { wrapper: Wrapper })
    expect(screen.getByText(/murillo w\. kist/i)).toBeInTheDocument()
  })
})
```

Run:
```bash
npm test
```
Expected: 3 FAIL.

- [ ] **Step 10.2: Create `src/components/Footer.tsx`**

```tsx
// src/components/Footer.tsx
import { useLanguage } from '../contexts/LanguageContext'

const GH_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LI_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const linkStyle: React.CSSProperties = {
  color: 'var(--text-muted)',
  fontSize: 11,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer style={{
      padding: '40px 80px',
      borderTop: '1px solid rgba(124,58,237,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <p style={{ color: 'var(--border-subtle)', fontSize: 11 }}>{t.footer.copyright}</p>

      <div style={{ display: 'flex', gap: 16 }}>
        <a href="https://github.com/ZzPowerTech" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={linkStyle}>
          {GH_ICON} GitHub
        </a>
        <a href="https://www.linkedin.com/in/murillo-weiss-kist-6aa2a1279/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={linkStyle}>
          {LI_ICON} LinkedIn
        </a>
      </div>
    </footer>
  )
}
```

- [ ] **Step 10.3: Run tests — all must pass**

```bash
npm test
```
Expected: `21 passed`.

- [ ] **Step 10.4: Commit**

```bash
git add src/components/Footer.tsx src/components/__tests__/Footer.test.tsx
git commit -m "feat: add Footer with GitHub and LinkedIn links"
```

---

## Task 11: App assembly

**Files:**
- Replace: `src/App.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 11.1: Read current `src/main.tsx`**

```bash
type src\main.tsx
```

- [ ] **Step 11.2: Replace `src/App.tsx`**

```tsx
// src/App.tsx
import './App.css'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Repos } from './components/Repos'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Repos />
      </main>
      <Footer />
    </>
  )
}

export default App
```

- [ ] **Step 11.3: Update `src/main.tsx` to wrap with LanguageProvider**

Replace current content with:

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './contexts/LanguageContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
```

- [ ] **Step 11.4: Run full test suite**

```bash
npm test
```
Expected: `21 passed`, 0 failed.

- [ ] **Step 11.5: Run dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:5173` and confirm:
- Header sticky with blur and language toggle
- Hero: name, photo, CV download button, available badge
- Projects: 4 cards with ONLINE badges, clickable
- Repos: loads from GitHub API, 6 cards, clickable
- Footer: GitHub and LinkedIn links
- PT→EN toggle works on all text

- [ ] **Step 11.6: Run build to confirm no TypeScript errors**

```bash
npm run build
```
Expected: `dist/` created, no errors.

- [ ] **Step 11.7: Commit**

```bash
git add src/App.tsx src/main.tsx
git commit -m "feat: assemble full portfolio SPA"
```

---

## Task 12: Vercel deploy + custom domain

**Files:** none — config done via Vercel dashboard.

- [ ] **Step 12.1: Push all commits to GitHub**

```bash
git push origin main
```

- [ ] **Step 12.2: Import project on Vercel**

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import repository `ZzPowerTech/portfolio`
3. Framework preset: **Vite** (auto-detected)
4. Build command: `npm run build` (default)
5. Output directory: `dist` (default)
6. Click **Deploy**

Expected: green deployment, preview URL like `portfolio-xxx.vercel.app`.

- [ ] **Step 12.3: Configure custom domain**

In Vercel project → Settings → Domains:
1. Add domain: `portfolio.weissmurillo.de`
2. Copy the DNS record shown (CNAME pointing to `cname.vercel-dns.com`)
3. In your DNS provider (wherever `weissmurillo.de` is registered), add the CNAME record
4. Wait for DNS propagation (usually < 5 min, up to 24h)

Expected: `portfolio.weissmurillo.de` shows the live portfolio with SSL.

- [ ] **Step 12.4: Verify production**

Open `https://portfolio.weissmurillo.de` and confirm:
- Hero loads with your photo
- CV download works
- All project/repo cards open correct URLs in new tab
- Language toggle works

---

## Self-Review Notes

- **Spec coverage:** All requirements covered — hero, projects, repos, header, footer, PT/EN, Vercel deploy, clickable cards, CV download, hero photo.
- **Framer Motion mocked in all tests** — prevents jsdom animation errors.
- **GitHub API fetches 6 repos in parallel** via `Promise.all` — loading/error/success states all handled and tested.
- **PDF import uses `?url` suffix** — Vite bundles it as a hashed URL, `download` attribute triggers browser save dialog.
- **`noUnusedLocals: true` in tsconfig** — all imports in each file are used; no dead code.
- **`LANGUAGE_COLORS` in ProjectCard** covers Java/TypeScript tags used in PROJECTS data.
