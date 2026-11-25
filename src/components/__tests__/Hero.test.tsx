// src/components/__tests__/Hero.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider } from '../../contexts/LanguageContext'
import { Hero } from '../Hero'

vi.mock('../../assets/hero-360.webp', () => ({ default: 'hero-360.webp' }))
vi.mock('../../assets/hero-avatar.webp', () => ({ default: 'hero-avatar.webp' }))
vi.mock('../../assets/hero-720.webp', () => ({ default: 'hero-720.webp' }))
vi.mock('../../assets/curriculum/Curriculo_Murilo_Weiss_Kist_Ultra_Profissional.pdf?url', () => ({ default: '/cv.pdf' }))

function Wrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

describe('Hero', () => {
  it('shows the positioning headline and the name', () => {
    render(<Hero />, { wrapper: Wrapper })
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Construo backends para regras que não podem errar.')
    expect(screen.getByText('Murillo Weiss Kist')).toBeInTheDocument()
    expect(screen.queryByText(/primeira oportunidade/i)).not.toBeInTheDocument()
  })

  it('offers the resume download and a path to the next section', () => {
    render(<Hero />, { wrapper: Wrapper })
    expect(screen.getByRole('link', { name: /baixar currículo/i })).toHaveAttribute('download')
    expect(screen.getByRole('link', { name: /continuar para sobre/i })).toHaveAttribute('href', '#about')
  })

  it('starts the API console on /perfil with the photo preview', () => {
    render(<Hero />, { wrapper: Wrapper })
    expect(screen.getByRole('tab', { name: /\/perfil/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('"Murillo Weiss Kist"')
    expect(screen.getByAltText('Murillo Weiss Kist')).toBeInTheDocument()
  })

  it('switches the response when another endpoint is clicked', async () => {
    render(<Hero />, { wrapper: Wrapper })
    await userEvent.click(screen.getByRole('tab', { name: /\/agora/ }))
    expect(screen.getByRole('tabpanel')).toHaveTextContent('"AgroConIA"')
    expect(screen.getByRole('link', { name: /\/v1\/agora/ })).toHaveAttribute('href', 'https://portfolio.weissmurillo.de/v1/agora')
    expect(screen.queryByAltText('Murillo Weiss Kist')).not.toBeInTheDocument()
  })

  it('moves between endpoints with the arrow keys', async () => {
    render(<Hero />, { wrapper: Wrapper })
    screen.getByRole('tab', { name: /\/perfil/ }).focus()
    await userEvent.keyboard('{ArrowDown}')
    const agora = screen.getByRole('tab', { name: /\/agora/ })
    expect(agora).toHaveAttribute('aria-selected', 'true')
    expect(agora).toHaveFocus()
  })
})
