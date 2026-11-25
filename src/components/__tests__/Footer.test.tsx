// src/components/__tests__/Footer.test.tsx
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../../contexts/LanguageContext'
import { Footer } from '../Footer'

vi.mock('../../assets/curriculum/Curriculo_Murilo_Weiss_Kist_Ultra_Profissional.pdf?url', () => ({ default: '/cv.pdf' }))

function Wrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

describe('Footer', () => {
  it('closes the page with a contact call to action', () => {
    render(<Footer />, { wrapper: Wrapper })
    expect(screen.getByRole('heading', { name: 'Vamos conversar' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/murillo-weiss-kist-6aa2a1279/',
    )
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/ZzPowerTech')
    expect(screen.getByRole('link', { name: /baixar currículo/i })).toHaveAttribute('download')
  })

  it('points to the JSON profile and shows the copyright', () => {
    render(<Footer />, { wrapper: Wrapper })
    expect(screen.getByRole('link', { name: '/v1/perfil' })).toHaveAttribute(
      'href',
      'https://portfolio.weissmurillo.de/v1/perfil',
    )
    expect(screen.getByText(/© 2026 murillo weiss kist/i)).toBeInTheDocument()
  })
})
