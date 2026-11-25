// src/components/Footer.tsx
import cvUrl from '../assets/curriculum/Curriculo_Murilo_Weiss_Kist_Ultra_Profissional.pdf?url'
import { useLanguage } from '../contexts/LanguageContext'
import { API_BASE } from '../data/api'
import { GH_ICON, LI_ICON, LINKS } from './icons'
import { SectionLabel } from './SectionLabel'

/** Closing block: the last "request" of the page leads to contact. */
export function Footer() {
  const { lang, t } = useLanguage()
  const f = t.footer
  const profilePath = lang === 'pt' ? 'perfil' : 'profile'

  return (
    <footer id="contact" className="site-footer" aria-labelledby="contact-title">
      <div className="container contact">
        <SectionLabel path={f.label} />
        <h2 id="contact-title" className="section-title">{f.title}</h2>
        <p className="section-subtitle">{f.sub}</p>

        <div className="contact-actions">
          <a className="btn btn-primary" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer me">
            {LI_ICON} LinkedIn
          </a>
          <a className="btn btn-ghost" href={LINKS.github} target="_blank" rel="noopener noreferrer me">
            {GH_ICON} GitHub
          </a>
          <a className="btn btn-ghost" href={cvUrl} download>
            {f.resume}
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>{f.copyright}</p>
        <p>
          {f.apiNote}{' '}
          <a href={`${API_BASE}/${profilePath}`} target="_blank" rel="noopener noreferrer">
            /v1/{profilePath}
          </a>
        </p>
      </div>
    </footer>
  )
}
