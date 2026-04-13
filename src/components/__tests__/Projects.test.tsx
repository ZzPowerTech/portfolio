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
