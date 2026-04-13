// src/data/projects.ts
export interface Project {
  id: string
  name: string
  desc: { pt: string; en: string }
  url: string
  emoji: string
  tags: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 'austv',
    name: 'AusTv Network',
    desc: {
      pt: 'Servidor Minecraft com plugins customizados em Java, gestão de 200+ jogadores e economia virtual.',
      en: 'Minecraft server with custom Java plugins, managing 200+ players and a virtual economy.',
    },
    url: 'https://austv.net',
    emoji: '⚡',
    tags: ['Java', 'Spigot', 'MySQL'],
  },
  {
    id: 'austv-store',
    name: 'AusTv Store',
    desc: {
      pt: 'Loja de itens e ranks com integração de pagamentos e painel administrativo.',
      en: 'Items and rank store with payment integration and admin dashboard.',
    },
    url: 'https://loja.austv.net',
    emoji: '🛒',
    tags: ['Next.js', 'NestJS', 'PostgreSQL'],
  },
  {
    id: 'intercom',
    name: 'Intercom 2026 — FAG',
    desc: {
      pt: 'Site oficial da semana acadêmica da FAG Toledo com programação e inscrições.',
      en: 'Official site for FAG Toledo academic week with schedule and registrations.',
    },
    url: 'https://intercom2026.fag.edu.br/',
    emoji: '🎓',
    tags: ['React', 'NestJS'],
  },
  {
    id: 'samuel',
    name: 'Landing Page — Samuel',
    desc: {
      pt: 'Landing page profissional desenvolvida sob demanda com foco em conversão.',
      en: 'Professional landing page built on demand with a focus on conversion.',
    },
    url: 'https://samuel-frontend.vercel.app/',
    emoji: '🌐',
    tags: ['React', 'Vercel'],
  },
]
