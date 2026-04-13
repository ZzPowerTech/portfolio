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
