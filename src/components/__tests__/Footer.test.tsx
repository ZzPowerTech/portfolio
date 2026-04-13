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
