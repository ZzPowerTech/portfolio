// src/components/__tests__/Projects.test.tsx
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../../contexts/LanguageContext'
import { Projects } from '../Projects'

vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...p }: React.HTMLAttributes<HTMLElement>) => <section {...p}>{children}</section>,
    a: ({ children, ...p }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...p}>{children}</a>,
    div: ({ children, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div {...p}>{children}</div>,
    span: ({ children, ...p }: React.HTMLAttributes<HTMLSpanElement>) => <span {...p}>{children}</span>,
  },
}))

function Wrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

describe('Projects', () => {
  it('features AgroConIA as the live project linking to its site', () => {
    render(<Projects />, { wrapper: Wrapper })
    const link = screen.getByRole('link', { name: /agroconia/i })
    expect(link).toHaveAttribute('href', 'https://www.agroconia.com.br/')
    expect(link).toHaveAttribute('target', '_blank')
    expect(screen.getAllByText('NO AR')).toHaveLength(1)
  })

  it('marks AusTV Network and AusTV Store as shut down, without links', () => {
    render(<Projects />, { wrapper: Wrapper })
    expect(screen.getByText('AusTV Network')).toBeInTheDocument()
    expect(screen.getByText('AusTV Store')).toBeInTheDocument()
    expect(screen.getAllByText('ENCERRADO')).toHaveLength(2)
    expect(screen.queryByRole('link', { name: /austv/i })).not.toBeInTheDocument()
  })

  it('lists completed past projects with repository links', () => {
    render(<Projects />, { wrapper: Wrapper })
    expect(screen.getByRole('link', { name: /intercom sul 2026/i })).toHaveAttribute(
      'href',
      'https://github.com/ZzPowerTech/Intercom-BackEnd-',
    )
    expect(screen.getAllByText('CONCLUÍDO')).toHaveLength(2)
  })
})
