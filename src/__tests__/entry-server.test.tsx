// src/__tests__/entry-server.test.tsx
import { apiDocuments, render } from '../entry-server'

describe('prerender entry', () => {
  it('renders the full page content to static HTML', () => {
    const html = render()
    expect(html).toContain('Murillo')
    expect(html).toContain('AgroConIA')
    expect(html).toContain('GWNext')
    expect(html).toContain('Spring Boot')
    expect(html).toContain('CommandOverride')
    expect(html).not.toContain('primeira oportunidade')
  })
  it('publishes every console endpoint plus repositories as JSON documents', () => {
    const paths = apiDocuments().map(d => d.path)
    expect(paths).toEqual(expect.arrayContaining([
      'perfil', 'agora', 'projetos', 'stack', 'contato', 'repositorios',
      'profile', 'now', 'projects', 'contact', 'repositories',
    ]))
    expect(new Set(paths).size).toBe(paths.length)
  })
})
