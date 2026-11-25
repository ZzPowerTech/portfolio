// src/components/__tests__/Repos.test.tsx
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../../contexts/LanguageContext'
import { REPOS } from '../../data/repos'
import { Repos } from '../Repos'

vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...p }: React.HTMLAttributes<HTMLElement>) => <section {...p}>{children}</section>,
    a: ({ children, ...p }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...p}>{children}</a>,
    div: ({ children, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div {...p}>{children}</div>,
  },
}))

function Wrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

describe('Repos', () => {
  afterEach(() => vi.restoreAllMocks())

  it('renders the curated repositories without calling the GitHub API', () => {
    const fetchSpy = vi.spyOn(global, 'fetch')
    render(<Repos />, { wrapper: Wrapper })
    expect(screen.getAllByRole('link')).toHaveLength(REPOS.length)
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('gives every repository a real description', () => {
    render(<Repos />, { wrapper: Wrapper })
    expect(screen.queryByText('—')).not.toBeInTheDocument()
    for (const repo of REPOS) {
      expect(repo.desc.pt.length).toBeGreaterThan(20)
      expect(repo.desc.en.length).toBeGreaterThan(20)
    }
  })
})
