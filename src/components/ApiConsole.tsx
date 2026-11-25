// src/components/ApiConsole.tsx
import { useState, type KeyboardEvent } from 'react'
import { API_BASE, API_ENDPOINTS } from '../data/api'
import { useLanguage } from '../contexts/LanguageContext'
import { jsonLines } from '../lib/jsonLines'
import hero360 from '../assets/hero-360.webp'
import hero720 from '../assets/hero-720.webp'

const LINE_DELAY_MS = 35

export function ApiConsole() {
  const { lang, t } = useLanguage()
  const endpoints = API_ENDPOINTS[lang]
  const [selected, setSelected] = useState(0)
  // Bumping the run counter remounts the response so the line cascade replays on "Send".
  const [run, setRun] = useState(0)

  const index = Math.min(selected, endpoints.length - 1)
  const current = endpoints[index]
  const lines = jsonLines(current.body)
  const bytes = new TextEncoder().encode(JSON.stringify(current.body)).length
  const showPreview = index === 0

  const select = (i: number) => {
    setSelected(i)
    setRun(r => r + 1)
  }

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (index + step + endpoints.length) % endpoints.length
    select(next)
    document.getElementById(`api-tab-${endpoints[next].path}`)?.focus()
  }

  return (
    <div className="api-window" role="region" aria-label={t.hero.console.label}>
      <div className="api-titlebar">
        <span className="api-dots" aria-hidden="true"><i /><i /><i /></span>
        {t.hero.console.collection}
      </div>

      <div className="api-body">
        <div className="api-sidebar">
          <p className="api-sidebar-title">{t.hero.console.endpoints}</p>
          <div role="tablist" aria-orientation="vertical" aria-label={t.hero.console.endpoints} className="api-tabs">
            {endpoints.map((ep, i) => (
              <button
                key={ep.path}
                id={`api-tab-${ep.path}`}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-controls="api-response"
                tabIndex={i === index ? 0 : -1}
                className="api-tab"
                onClick={() => select(i)}
                onKeyDown={onTabKey}
              >
                <span className="api-method">GET</span>/{ep.path}
              </button>
            ))}
          </div>
        </div>

        <div className="api-main">
          <div className="api-request">
            <span className="api-method api-method-box">GET</span>
            <a className="api-url" href={`${API_BASE}/${current.path}`} target="_blank" rel="noopener noreferrer">
              {API_BASE}/<b>{current.path}</b>
            </a>
            <button type="button" className="api-send" onClick={() => setRun(r => r + 1)}>
              {t.hero.console.send}
            </button>
          </div>

          <div className="api-meta">
            <span className="api-ok">200 OK</span>
            <span>application/json</span>
            <span>{(bytes / 1024).toFixed(1)} KB</span>
          </div>

          <div
            id="api-response"
            role="tabpanel"
            aria-labelledby={`api-tab-${current.path}`}
            className={`api-response${showPreview ? ' has-preview' : ''}`}
          >
            <pre key={`${lang}-${current.path}-${run}`} className="api-json">
              <code>
                {lines.map((line, i) => (
                  <span
                    key={i}
                    className="api-line"
                    style={{ '--depth': line.depth, animationDelay: `${i * LINE_DELAY_MS}ms` } as React.CSSProperties}
                  >
                    {line.tokens.map((tok, j) => (
                      <span key={j} className={`tok-${tok.kind}`}>{tok.text}</span>
                    ))}
                  </span>
                ))}
              </code>
            </pre>

            {showPreview && (
              <figure className="api-preview">
                <figcaption>{t.hero.console.preview}</figcaption>
                <img
                  src={hero720}
                  srcSet={`${hero360} 360w, ${hero720} 720w`}
                  sizes="200px"
                  width={720}
                  height={960}
                  alt="Murillo Weiss Kist"
                />
                <code>avatar_url</code>
              </figure>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
