// src/components/Hero.tsx
import './hero.css'
import avatar from '../assets/hero-avatar.webp'
import cvUrl from '../assets/curriculum/Curriculo_Murilo_Weiss_Kist_Ultra_Profissional.pdf?url'
import { useLanguage } from '../contexts/LanguageContext'
import { ApiConsole } from './ApiConsole'

// Connector geometry (px): 84px cable, 40px node ring (r = 19.5 on the border), 40px cable out.
const WAVE_PATHS = [
  'M22,0 V84.5 A19.5,19.5 0 0 0 22,123.5 V164',
  'M22,0 V84.5 A19.5,19.5 0 0 1 22,123.5 V164',
]

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
          <svg className="hero-wave" viewBox="-30 0 104 164" aria-hidden="true" focusable="false">
            <defs>
              <filter id="hero-wave-glow" filterUnits="userSpaceOnUse" x="-30" y="-30" width="104" height="224">
                <feGaussianBlur stdDeviation="3" />
              </filter>
              <filter id="hero-wave-haze" filterUnits="userSpaceOnUse" x="-30" y="-30" width="104" height="224">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>
            {/* One path per side: down the cable, around half of the node's ring, down again. */}
            {WAVE_PATHS.map(d => (
              <g key={d}>
                <path className="hero-wave-haze" d={d} pathLength={100} filter="url(#hero-wave-haze)" />
                <path className="hero-wave-glow" d={d} pathLength={100} filter="url(#hero-wave-glow)" />
                <path className="hero-wave-core" d={d} pathLength={100} />
              </g>
            ))}
          </svg>
        </a>
      </div>
    </section>
  )
}
