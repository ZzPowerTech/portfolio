// src/components/__tests__/Projects.test.tsx
import { render, screen, within } from '@testing-library/react'
import { LanguageProvider } from '../../contexts/LanguageContext'
import { PAST_PROJECTS } from '../../data/projects'
import { Projects } from '../Projects'

function Wrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

describe('Projects', () => {
  it('features AgroConIA with a link to its site and the invoice illustration', () => {
    render(<Projects />, { wrapper: Wrapper })
    const feature = screen.getByRole('article', { name: 'AgroConIA' })
    expect(within(feature).getByText('No ar')).toBeInTheDocument()
    expect(within(feature).getByRole('link', { name: /abrir agroconia\.com\.br/i })).toHaveAttribute(
      'href',
      'https://www.agroconia.com.br/',
    )
    expect(within(feature).getByText('Ilustração com dados fictícios')).toBeInTheDocument()
  })

  it('lists every past project as a row with its status', () => {
    render(<Projects />, { wrapper: Wrapper })
    const rows = within(screen.getByRole('list', { name: 'Projetos anteriores' })).getAllByRole('listitem')
    expect(rows).toHaveLength(PAST_PROJECTS.length)
    expect(screen.getAllByText('Encerrado')).toHaveLength(2)
    expect(screen.getAllByText('Concluído')).toHaveLength(2)
  })

  it('links completed projects to their repositories and leaves shut-down ones unlinked', () => {
    render(<Projects />, { wrapper: Wrapper })
    expect(screen.getByRole('link', { name: /intercom sul 2026/i })).toHaveAttribute(
      'href',
      'https://github.com/ZzPowerTech/Intercom-BackEnd-',
    )
    expect(screen.queryByRole('link', { name: /austv/i })).not.toBeInTheDocument()
  })

  it('no longer uses emojis as project icons', () => {
    const { container } = render(<Projects />, { wrapper: Wrapper })
    // Emoji blocks only: the "↗" link arrow is a plain symbol and is allowed.
    expect(container.textContent).not.toMatch(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u)
  })
})
