// src/components/ProjectCard.tsx
import { motion } from 'framer-motion'
import type { Project, ProjectStatus } from '../data/projects'
import type { Language } from '../data/translations'

interface ProjectCardProps {
  project: Project
  lang: Language
  statusLabel: string
  featured?: boolean
}

const STATUS_COLOR: Record<ProjectStatus, string> = {
  live: 'var(--green-500)',
  ended: 'var(--text-muted)',
  completed: 'var(--purple-500)',
}

function StatusBadge({ status, label }: { status: ProjectStatus; label: string }) {
  const color = STATUS_COLOR[status]
  return (
    <span style={{
      display: 'flex', alignItems: 'center', gap: 4,
      border: `1px solid ${color}`, padding: '3px 8px', borderRadius: 4,
      opacity: status === 'ended' ? 0.8 : 1,
    }}>
      {status === 'live' ? (
        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 5, height: 5, background: color, borderRadius: '50%', display: 'inline-block', boxShadow: `0 0 6px ${color}` }}
        />
      ) : (
        <span style={{ width: 5, height: 5, background: color, borderRadius: '50%', display: 'inline-block' }} />
      )}
      <span style={{ color, fontSize: 9, fontWeight: 600 }}>{label}</span>
    </span>
  )
}

export function ProjectCard({ project, lang, statusLabel, featured = false }: ProjectCardProps) {
  const content = (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12, gap: 8 }}>
        <span aria-hidden="true" style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
        }}>
          {project.emoji}
        </span>
        <StatusBadge status={project.status} label={statusLabel} />
      </div>

      <h3 style={{ color: 'var(--text-primary)', fontSize: featured ? 20 : 14, fontWeight: 700, marginBottom: 2 }}>
        {project.name}
        {project.url && <span aria-hidden="true" style={{ color: 'rgba(168,85,247,0.6)', fontSize: 13, marginLeft: 6 }}>↗</span>}
      </h3>
      {(project.role || project.period) && (
        <p style={{ color: 'var(--purple-500)', fontSize: 11, marginBottom: 8 }}>
          {[project.role?.[lang], project.period?.[lang]].filter(Boolean).join(' · ')}
        </p>
      )}
      <p style={{ color: 'var(--text-secondary)', fontSize: featured ? 13 : 12, lineHeight: 1.6, marginBottom: 14 }}>
        {project.desc[lang]}
      </p>

      <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {project.tags.map(tag => (
          <li
            key={tag}
            style={{
              background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.15)',
              color: 'var(--purple-500)', padding: '2px 8px', borderRadius: 4, fontSize: 10,
            }}
          >
            {tag}
          </li>
        ))}
      </ul>
    </>
  )

  const style: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: `1px solid ${featured ? 'rgba(124,58,237,0.35)' : 'var(--border-subtle)'}`,
    borderRadius: 12,
    padding: featured ? 28 : 20,
    display: 'block',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    textDecoration: 'none',
  }

  if (!project.url) {
    return <article style={style}>{content}</article>
  }

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(124,58,237,0.15)' }}
      transition={{ duration: 0.2 }}
      style={{ ...style, cursor: 'pointer' }}
    >
      {content}
    </motion.a>
  )
}
