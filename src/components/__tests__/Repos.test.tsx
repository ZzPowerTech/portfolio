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
