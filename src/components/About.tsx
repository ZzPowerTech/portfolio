// src/components/About.tsx
import { useLanguage } from '../contexts/LanguageContext'
import type { TimelineItem } from '../data/translations'
import { SectionLabel } from './SectionLabel'

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="timeline">
      {items.map(item => (
        <li key={`${item.org}-${item.title}`}>
          <p className="timeline-title">{item.title}</p>
          <p className="timeline-meta">
            {item.org} · <span>{item.period}</span>
          </p>
          {item.detail && <p className="timeline-detail">{item.detail}</p>}
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
      <div className="container">
        <SectionLabel path={a.label} />
        <h2 id="about-title" className="section-title">{a.title}</h2>

        <div className="about-layout">
          <div>
            <div className="about-text">
              {a.paragraphs.map(p => <p key={p.slice(0, 32)}>{p}</p>)}
            </div>

            <h3 className="about-h3" style={{ marginTop: 36 }}>{a.skillsTitle}</h3>
            <dl className="skill-groups" style={{ marginTop: 0 }}>
              {a.skillGroups.map(group => (
                <div key={group.label} className="skill-group">
                  <dt>{group.label}</dt>
                  <dd>
                    <ul>
                      {group.items.map(skill => <li key={skill} className="pill-tag">{skill}</li>)}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="about-facts">
            <div>
              <h3 className="about-h3">{a.experienceTitle}</h3>
              <Timeline items={a.experience} />
            </div>
            <div>
              <h3 className="about-h3">{a.educationTitle}</h3>
              <Timeline items={a.education} />
            </div>
            <div>
              <h3 className="about-h3">{a.achievementsTitle}</h3>
              <ul className="achievements">
                {a.achievements.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
