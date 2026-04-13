// src/contexts/__tests__/LanguageContext.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider, useLanguage } from '../LanguageContext'

function Consumer() {
  const { lang, t, toggle } = useLanguage()
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="tag">{t.hero.tag}</span>
      <button onClick={toggle}>toggle</button>
    </div>
  )
}

describe('LanguageContext', () => {
  it('defaults to Portuguese', () => {
    render(<LanguageProvider><Consumer /></LanguageProvider>)
    expect(screen.getByTestId('lang')).toHaveTextContent('pt')
    expect(screen.getByTestId('tag')).toHaveTextContent('DESENVOLVEDOR')
  })

  it('toggles to English on click', async () => {
    render(<LanguageProvider><Consumer /></LanguageProvider>)
    await userEvent.click(screen.getByRole('button', { name: /toggle/i }))
    expect(screen.getByTestId('lang')).toHaveTextContent('en')
    expect(screen.getByTestId('tag')).toHaveTextContent('DEVELOPER')
  })

  it('throws when used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Consumer />)).toThrow('useLanguage must be used within LanguageProvider')
    spy.mockRestore()
  })
})
