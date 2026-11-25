// src/components/Header.tsx
import { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { GH_ICON, LI_ICON, LINKS } from './icons'

export function Header() {
  const { lang, t, toggle } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  const sections = [
    { href: '#about', label: t.nav.about },
    { href: '#projects', label: t.nav.projects },
    { href: '#repos', label: t.nav.repos },
    { href: '#contact', label: t.nav.contact },
  ]

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className="site-header">
      <a href="#top" className="site-logo" aria-label="Murillo Weiss Kist">
        MW.
      </a>

      <nav className="site-nav" aria-label={lang === 'pt' ? 'Navegação principal' : 'Main navigation'}>
        {sections.map(s => (
          <a key={s.href} href={s.href} className="nav-link nav-optional">{s.label}</a>
        ))}
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer me" aria-label="GitHub" className="nav-link nav-icon">
          {GH_ICON}
        </a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer me" aria-label="LinkedIn" className="nav-link nav-icon">
          {LI_ICON}
        </a>
        <button
          type="button"
          className="lang-toggle"
          onClick={toggle}
          aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para português'}
        >
          {lang === 'pt' ? 'PT | EN' : 'EN | PT'}
        </button>
        <button
          type="button"
          className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Menu"
          onClick={() => setMenuOpen(open => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </nav>

      <div id="mobile-menu" className="mobile-menu" hidden={!menuOpen}>
        {sections.map(s => (
          <a key={s.href} href={s.href} onClick={() => setMenuOpen(false)}>
            <span className="api-method" aria-hidden="true">GET</span>
            {s.label}
          </a>
        ))}
      </div>
    </header>
  )
}
