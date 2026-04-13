// src/components/ProjectCard.tsx
import { motion } from 'framer-motion'
import type { Project } from '../data/projects'
import type { Language } from '../data/translations'

interface ProjectCardProps {
  project: Project
  lang: Language
  onlineBadge: string
}

const LANGUAGE_COLORS: Record<string, string> = {
  Java: '#f89820',
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572a5',
}

export function ProjectCard({ project, lang, onlineBadge }: ProjectCardProps) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={project.name}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(124,58,237,0.15)' }}
      transition={{ duration: 0.2 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 12,
        padding: 20,
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
        }}>
          {project.emoji}
        </span>

        {/* ONLINE badge */}
        <span style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)',
          padding: '3px 8px', borderRadius: 4,
        }}>
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 5, height: 5, background: 'var(--green-500)', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 6px var(--green-500)' }}
          />
          <span style={{ color: 'var(--green-500)', fontSize: 9, fontWeight: 600 }}>{onlineBadge}</span>
        </span>
      </div>

      {/* External link icon */}
      <span style={{ position: 'absolute', top: 14, right: 14, color: 'rgba(124,58,237,0.3)', fontSize: 13 }}>↗</span>

      <p style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
        {project.name}
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: 11, lineHeight: 1.5, marginBottom: 14 }}>
        {project.desc[lang]}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {project.tags.map(tag => (
          <span
            key={tag}
            style={{
              background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.15)',
              color: 'var(--purple-500)', padding: '2px 8px', borderRadius: 4, fontSize: 9,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Language dot if first tag matches known language */}
      {LANGUAGE_COLORS[project.tags[0]] && (
        <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: LANGUAGE_COLORS[project.tags[0]], display: 'inline-block' }} />
        </div>
      )}
    </motion.a>
  )
}
