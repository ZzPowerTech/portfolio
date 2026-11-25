// src/components/Hero.tsx
import './hero.css'
import avatar from '../assets/hero-avatar.webp'
import cvUrl from '../assets/curriculum/Curriculo_Murilo_Weiss_Kist_Ultra_Profissional.pdf?url'
import { useLanguage } from '../contexts/LanguageContext'
import { ApiConsole } from './ApiConsole'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <a className="hero-pill" href="#about">
        <img src={avatar} alt="" width={28} height={28} />
        <span><b>Murillo Weiss Kist</b> · {t.hero.pill}</span>
      </a>

      <h1 id="hero-title" className="hero-title">{t.hero.headline}</h1>
      <p className="hero-sub">{t.hero.sub}</p>

      <div className="hero-actions">
        <a className="btn btn-primary" href="#projects">{t.hero.viewProjects}</a>
        <a className="btn btn-ghost" href={cvUrl} download>{t.hero.downloadCV}</a>
      </div>

      <div className="hero-stage">
        <ApiConsole />
      </div>

      <div className="hero-continue">
        <a href="#about" aria-label={t.hero.continue}>
          <span className="hero-continue-line" />
          <span className="hero-continue-dot" />
        </a>
      </div>
    </section>
  )
}
