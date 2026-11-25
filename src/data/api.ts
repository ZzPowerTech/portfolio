// src/data/api.ts
// Single source for the hero's API console AND the static JSON files that the build
// publishes under /v1/ (see scripts/prerender.mjs). Keep facts in sync with
// src/data/projects.ts, index.html (JSON-LD) and public/llms.txt.
import type { Language } from './translations'
import hero720 from '../assets/hero-720.webp'

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

export interface Endpoint {
  /** Path segment, e.g. "perfil" -> /v1/perfil */
  path: string
  body: Json
}

export const SITE_URL = 'https://portfolio.weissmurillo.de'
export const API_BASE = `${SITE_URL}/v1`
// public/murillo.webp is the same file as src/assets/hero-720.webp (a test enforces it).
// Vite names that asset after its content hash; reusing the hash as ?v= keeps the public
// URL readable and changes it whenever the photo changes, so no cache serves a stale one.
// (In dev and tests the import has no hash, and the URL has no version.)
const AVATAR_VERSION = /-([\w-]{8})\.webp$/.exec(hero720)?.[1]
export const AVATAR_URL = `${SITE_URL}/murillo.webp${AVATAR_VERSION ? `?v=${AVATAR_VERSION}` : ''}`

const LINKS = {
  github: 'https://github.com/ZzPowerTech',
  linkedin: 'https://www.linkedin.com/in/murillo-weiss-kist-6aa2a1279/',
  agroconia: 'https://www.agroconia.com.br/',
}

export const API_ENDPOINTS: Record<Language, Endpoint[]> = {
  pt: [
    {
      path: 'perfil',
      body: {
        nome: 'Murillo Weiss Kist',
        cargo: 'Engenheiro de Software Backend',
        local: 'Paraná, Brasil',
        empresa: { nome: 'GWNext', papel: 'Cofundador' },
        stack: ['Java', 'Spring Boot', 'TypeScript', 'NestJS', 'PostgreSQL'],
        ia: true,
        avatar_url: AVATAR_URL,
      },
    },
    {
      path: 'agora',
      body: {
        produto: 'AgroConIA',
        site: LINKS.agroconia,
        papel: 'Cofundador e desenvolvedor backend',
        o_que_faz: 'Calcula o IBS e a CBS de cada produto na nota do produtor rural',
        assistente_ia: 'Ceres',
        status: 'no_ar',
      },
    },
    {
      path: 'projetos',
      body: [
        { nome: 'AgroConIA', status: 'no_ar' },
        { nome: 'AusTV Network', periodo: '2025-06/2026-10', status: 'encerrado' },
        { nome: 'AgroPainel', evento: 'Hackathon Show Rural 2026', status: 'concluido' },
        { nome: 'Intercom Sul 2026', status: 'concluido' },
      ],
    },
    {
      path: 'stack',
      body: {
        backend: ['Java', 'Spring Boot', 'NestJS', 'Node.js'],
        frontend: ['React', 'Next.js', 'TypeScript'],
        dados: ['PostgreSQL', 'MySQL'],
        ia: ['LLMs', 'Python', 'YOLO'],
      },
    },
    {
      path: 'contato',
      body: {
        github: LINKS.github,
        linkedin: LINKS.linkedin,
        portfolio: SITE_URL,
      },
    },
  ],
  en: [
    {
      path: 'profile',
      body: {
        name: 'Murillo Weiss Kist',
        role: 'Backend Software Engineer',
        location: 'Paraná, Brazil',
        company: { name: 'GWNext', role: 'Co-founder' },
        stack: ['Java', 'Spring Boot', 'TypeScript', 'NestJS', 'PostgreSQL'],
        ai: true,
        avatar_url: AVATAR_URL,
      },
    },
    {
      path: 'now',
      body: {
        product: 'AgroConIA',
        site: LINKS.agroconia,
        role: 'Co-founder and backend developer',
        what_it_does: "Calculates IBS and CBS taxes for each product on a farmer's invoice",
        ai_assistant: 'Ceres',
        status: 'live',
      },
    },
    {
      path: 'projects',
      body: [
        { name: 'AgroConIA', status: 'live' },
        { name: 'AusTV Network', period: '2025-06/2026-10', status: 'shut_down' },
        { name: 'AgroPainel', event: 'Show Rural Hackathon 2026', status: 'completed' },
        { name: 'Intercom Sul 2026', status: 'completed' },
      ],
    },
    {
      path: 'stack',
      body: {
        backend: ['Java', 'Spring Boot', 'NestJS', 'Node.js'],
        frontend: ['React', 'Next.js', 'TypeScript'],
        data: ['PostgreSQL', 'MySQL'],
        ai: ['LLMs', 'Python', 'YOLO'],
      },
    },
    {
      path: 'contact',
      body: {
        github: LINKS.github,
        linkedin: LINKS.linkedin,
        portfolio: SITE_URL,
      },
    },
  ],
}
