// src/components/Hero.tsx
import './hero.css'
import avatar from '../assets/hero-avatar.webp'
import cvUrl from '../assets/curriculum/Curriculo_Murilo_Weiss_Kist_Ultra_Profissional.pdf?url'
import { useLanguage } from '../contexts/LanguageContext'
import { ApiConsole } from './ApiConsole'
import { useRef } from 'react'
import { useHeroLight } from './heroLight/useHeroLight'

export function Hero() {
  const { t } = useLanguage()
  const heroRef = useRef<HTMLElement>(null)
  useHeroLight(heroRef)

  return (
    <section ref={heroRef} id="top" className="hero" aria-labelledby="hero-title">
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
        <div className="hero-horizon" aria-hidden="true" />
        <ApiConsole />
      </div>

      <div className="hero-continue">
        <a href="#about" aria-label={t.hero.continue}>
          <span className="hero-continue-line" />
          <span className="hero-continue-node">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3v10M3.5 8.5 8 13l4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="hero-continue-line hero-continue-line-out" />
          {/* The wave: down the cable, split around the node's ring, down again. See hero.css. */}
          <span className="hero-wave" aria-hidden="true">
            <span className="wave-seg wave-seg-in"><i className="wave-comet" /></span>
            <span className="wave-ring-side"><span className="wave-ring-clip"><i className="wave-ring" /></span></span>
            <span className="wave-ring-side wave-ring-mirror"><span className="wave-ring-clip"><i className="wave-ring" /></span></span>
            <span className="wave-seg wave-seg-out"><i className="wave-comet" /></span>
          </span>
        </a>
      </div>
    </section>
  )
}
