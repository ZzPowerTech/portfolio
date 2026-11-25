// src/components/__tests__/Header.test.tsx
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider } from '../../contexts/LanguageContext'
import { Header } from '../Header'

function Wrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

describe('Header', () => {
  it('renders MW. logo linking to the top', () => {
    render(<Header />, { wrapper: Wrapper })
    expect(screen.getByText('MW.')).toHaveAttribute('href', '#top')
  })

  it('links to every section, GitHub and LinkedIn', () => {
    render(<Header />, { wrapper: Wrapper })
    expect(screen.getByRole('link', { name: 'Sobre' })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: 'Projetos' })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: 'Código' })).toHaveAttribute('href', '#repos')
    expect(screen.getByRole('link', { name: 'Contato' })).toHaveAttribute('href', '#contact')
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/ZzPowerTech')
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/murillo-weiss-kist-6aa2a1279/',
    )
  })

  it('opens and closes the mobile menu with all sections', async () => {
    render(<Header />, { wrapper: Wrapper })
    const button = screen.getByRole('button', { name: 'Menu' })
    expect(button).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    const menu = document.getElementById('mobile-menu')!
    expect(menu).toBeVisible()
    expect(menu.querySelectorAll('a')).toHaveLength(4)

    await userEvent.keyboard('{Escape}')
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(menu).not.toBeVisible()
  })

  it('closes the mobile menu after picking a section', async () => {
    render(<Header />, { wrapper: Wrapper })
    await userEvent.click(screen.getByRole('button', { name: 'Menu' }))
    const menu = document.getElementById('mobile-menu')!
    await userEvent.click(within(menu).getByRole('link', { name: 'Contato' }))
    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('language toggle switches PT to EN', async () => {
    render(<Header />, { wrapper: Wrapper })
    const btn = screen.getByRole('button', { name: /switch to english/i })
    await userEvent.click(btn)
    expect(btn).toHaveTextContent('EN | PT')
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })
})
