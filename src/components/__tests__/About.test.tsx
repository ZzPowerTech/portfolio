// src/components/__tests__/About.test.tsx
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../../contexts/LanguageContext'
import { About } from '../About'

function Wrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

describe('About', () => {
  it('states current and past roles with dates', () => {
    render(<About />, { wrapper: Wrapper })
    expect(screen.getByRole('heading', { name: /quem é murillo weiss kist/i })).toBeInTheDocument()
    expect(screen.getByText(/GWNext · AgroConIA/)).toBeInTheDocument()
    expect(screen.getAllByText('jun/2025 – out/2026').length).toBeGreaterThan(0)
  })

  it('lists Spring Boot among technologies', () => {
    render(<About />, { wrapper: Wrapper })
    expect(screen.getByText('Spring Boot')).toBeInTheDocument()
  })
})
