// src/components/ProjectCard.tsx
import type { Project, ProjectStatus } from '../data/projects'
import type { InvoiceMock, Language } from '../data/translations'

export function StatusTag({ status, label }: { status: ProjectStatus; label: string }) {
  return <span className={`status status-${status}`}>{label}</span>
}

function Invoice({ data }: { data: InvoiceMock }) {
  return (
    <figure className="invoice">
      <div className="invoice-card" aria-hidden="true">
        <div className="invoice-head">
          <strong>{data.title}</strong>
          <span>{data.draft}</span>
        </div>
        <ul className="invoice-items">
          {data.items.map(item => (
            <li key={item.name} className={item.flag ? 'is-flagged' : undefined}>
              <span>{item.name}</span>
              <span className="invoice-rule">{item.rule}</span>
            </li>
          ))}
        </ul>
        <p className="invoice-check">{data.check}</p>
        <p className="invoice-action">{data.action}</p>
      </div>
      <figcaption>{data.caption}</figcaption>
    </figure>
  )
}

interface FeaturedProjectProps {
  project: Project
  lang: Language
  statusLabel: string
  visitLabel: string
  invoice: InvoiceMock
}

/** The current project, shown as a wide panel with an illustration of the product. */
export function FeaturedProject({ project, lang, statusLabel, visitLabel, invoice }: FeaturedProjectProps) {
  const host = project.url ? new URL(project.url).hostname.replace(/^www\./, '') : null

  return (
    <article className="feature" aria-labelledby={`project-${project.id}`}>
      <div>
        <StatusTag status={project.status} label={statusLabel} />
        <h3 id={`project-${project.id}`} className="feature-name">{project.name}</h3>
        {project.role && <p className="feature-role">{project.role[lang]}</p>}
        <p className="feature-desc">{project.desc[lang]}</p>
        <ul className="feature-tags">
          {project.tags.map(tag => <li key={tag} className="pill-tag">{tag}</li>)}
        </ul>
        {project.url && host && (
          <a className="feature-link" href={project.url} target="_blank" rel="noopener noreferrer">
            {visitLabel} {host} <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
      <Invoice data={invoice} />
    </article>
  )
}

interface ProjectRowProps {
  project: Project
  lang: Language
  statusLabel: string
}

/** A past project as a list row: name and role, description, period and status. */
export function ProjectRow({ project, lang, statusLabel }: ProjectRowProps) {
  return (
    <li className="project-row">
      <div>
        <h4>
          {project.url ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              {project.name} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            project.name
          )}
        </h4>
        {project.role && <p className="project-row-role">{project.role[lang]}</p>}
      </div>
      <p className="project-row-desc">{project.desc[lang]}</p>
      <div className="project-row-side">
        <StatusTag status={project.status} label={statusLabel} />
        {project.period && <span className="project-row-period">{project.period[lang]}</span>}
      </div>
    </li>
  )
}
