// src/components/Hero.tsx
import { motion } from 'framer-motion'
import heroImg from '../assets/hero.png'
import cvUrl from '../assets/curriculum/Curriculo_Murilo_Weiss_Kist_Ultra_Profissional.pdf?url'
import { useLanguage } from '../contexts/LanguageContext'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

export function Hero() {
  const { t } = useLanguage()

  return (
    <section
      style={{
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.04,
        backgroundImage: 'linear-gradient(var(--purple-500) 1px, transparent 1px), linear-gradient(90deg, var(--purple-500) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 600px 500px at 80% 50%, rgba(124,58,237,0.1) 0%, transparent 70%), radial-gradient(ellipse 300px 300px at 20% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)',
      }} />

      {/* Left: content */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, maxWidth: 520 }}>
        <motion.div {...fadeUp(0.1)}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
            color: 'var(--purple-500)', fontSize: 10, letterSpacing: 3,
            padding: '5px 12px', borderRadius: 20, marginBottom: 20,
          }}>
            <span style={{ width: 5, height: 5, background: 'var(--purple-500)', borderRadius: '50%', display: 'inline-block' }} />
            {t.hero.tag}
          </span>
        </motion.div>

        <motion.h1 {...fadeUp(0.2)} style={{ fontSize: 52, fontWeight: 900, letterSpacing: '-2px', lineHeight: 1, color: 'var(--text-primary)', marginBottom: 6 }}>
          Murillo<br />
          <span style={{ color: 'var(--purple-500)' }}>W. Kist</span>
        </motion.h1>

        <motion.p {...fadeUp(0.3)} style={{ fontSize: 16, color: 'var(--text-muted)', fontWeight: 400 }}>
          {t.hero.role}
        </motion.p>

        <motion.div {...fadeUp(0.35)} style={{ width: 40, height: 2, background: 'var(--purple-600)', margin: '16px 0' }} />

        <motion.p {...fadeUp(0.4)} style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, marginBottom: 28, maxWidth: 400 }}>
          {t.hero.desc}
        </motion.p>

        <motion.div {...fadeUp(0.5)} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a
            href={cvUrl}
            download
            style={{
              background: 'linear-gradient(135deg, var(--purple-600), var(--purple-500))',
              color: '#fff', padding: '11px 24px', borderRadius: 8,
              fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: '0 0 20px rgba(124,58,237,0.25)',
            }}
          >
            {t.hero.downloadCV}
          </a>
          <a
            href="#projects"
            style={{
              border: '1px solid rgba(124,58,237,0.25)',
              color: 'var(--purple-500)', padding: '11px 24px', borderRadius: 8,
              fontSize: 12, display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            {t.hero.viewProjects}
          </a>
        </motion.div>
      </div>

      {/* Right: photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ position: 'relative', zIndex: 1, flexShrink: 0, marginLeft: 60 }}
      >
        {/* Pulsing glow */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: -24,
            background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        <div style={{
          width: 210, height: 210, borderRadius: 24,
          border: '2px solid rgba(124,58,237,0.4)',
          overflow: 'hidden', position: 'relative',
          boxShadow: '0 0 50px rgba(124,58,237,0.18)',
        }}>
          <img
            src={heroImg}
            alt="Murillo W. Kist"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
          {/* Subtle purple overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(124,58,237,0.05), transparent 60%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Available badge */}
        <div style={{
          position: 'absolute', bottom: -12, right: -12,
          background: 'var(--bg-card)', border: '1px solid rgba(124,58,237,0.25)',
          borderRadius: 10, padding: '7px 12px',
          display: 'flex', alignItems: 'center', gap: 6,
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }}>
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 6, height: 6, background: 'var(--green-500)', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px var(--green-500)' }}
          />
          <span style={{ color: 'var(--text-secondary)', fontSize: 9 }}>{t.hero.available}</span>
        </div>
      </motion.div>
    </section>
  )
}
