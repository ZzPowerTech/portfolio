// src/components/About.tsx
import { useLanguage } from '../contexts/LanguageContext'
import type { TimelineItem } from '../data/translations'
import { SectionLabel } from './SectionLabel'

const subheading: React.CSSProperties = {
  color: 'var(--text-primary)',
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: 0.5,
  marginBottom: 14,
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
      {items.map(item => (
        <li
          key={`${item.org}-${item.title}`}
          style={{ borderLeft: '2px solid rgba(124,58,237,0.35)', paddingLeft: 14 }}
        >
          <p style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 600 }}>{item.title}</p>
          <p style={{ color: 'var(--purple-500)', fontSize: 12 }}>
            {item.org} · <span style={{ color: 'var(--text-muted)' }}>{item.period}</span>
          </p>
          {item.detail && (
            <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.6, marginTop: 4 }}>{item.detail}</p>
          )}
        </li>
      ))}
    </ol>
  )
}

export function About() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <SectionLabel path={a.label} />
      <h2 id="about-title" className="section-title" style={{ marginBottom: 24 }}>{a.title}</h2>

      <div className="about-grid">
        <div>
          {a.paragraphs.map(p => (
            <p key={p.slice(0, 24)} style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75, marginBottom: 16 }}>
              {p}
            </p>
          ))}

          <h3 style={{ ...subheading, marginTop: 24 }}>{a.skillsTitle}</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {a.skills.map(skill => (
              <li
                key={skill}
                style={{
                  background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.18)',
                  color: 'var(--purple-500)', padding: '3px 10px', borderRadius: 4, fontSize: 11,
                }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={subheading}>{a.experienceTitle}</h3>
          <Timeline items={a.experience} />

          <h3 style={subheading}>{a.educationTitle}</h3>
          <Timeline items={a.education} />

          <h3 style={subheading}>{a.achievementsTitle}</h3>
          <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {a.achievements.map(item => (
              <li key={item} style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.6 }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
