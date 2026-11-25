// src/data/projects.ts
import type { Localized } from './translations'

export type ProjectStatus = 'live' | 'ended' | 'completed'

export interface Project {
  id: string
  name: string
  role?: Localized
  period?: Localized
  desc: Localized
  /** Omitted when there is no public page left to visit. */
  url?: string
  emoji: string
  tags: string[]
  status: ProjectStatus
}

export const CURRENT_PROJECTS: Project[] = [
  {
    id: 'agroconia',
    name: 'AgroConIA',
    role: {
      pt: 'Cofundador e desenvolvedor backend · GWNext',
      en: 'Co-founder and backend developer · GWNext',
    },
    period: { pt: 'Atual', en: 'Current' },
    desc: {
      pt: 'Plataforma da GWNext para a reforma tributária do agro. Calcula o IBS e a CBS de cada produto na nota do produtor rural, avisa o que conferir antes de emitir e envia a nota para o escritório de contabilidade aprovar. Inclui a Ceres, assistente de IA que responde citando o artigo da lei (EC 132/2023 e LC 214/2025).',
      en: "GWNext's platform for Brazil's agribusiness tax reform. It calculates IBS and CBS for each product on the farmer's invoice, flags what to check before issuing it, and routes the invoice to the accounting firm for approval. It includes Ceres, an AI assistant that answers by citing the article of law (EC 132/2023 and LC 214/2025).",
    },
    url: 'https://www.agroconia.com.br/',
    emoji: '🌾',
    tags: ['Backend', 'IA', 'NF-e 4.00', 'IBS/CBS'],
    status: 'live',
  },
]

export const PAST_PROJECTS: Project[] = [
  {
    id: 'austv',
    name: 'AusTV Network',
    role: {
      pt: 'Head de Games / Líder técnico',
      en: 'Head of Games / Tech lead',
    },
    period: { pt: 'jun/2025 – out/2026', en: 'Jun 2025 – Oct 2026' },
    desc: {
      pt: 'Rede de servidores Minecraft com mais de 200 jogadores e economia virtual. Liderei uma equipe de 15 pessoas, criei plugins em Java (Paper/Spigot), APIs REST em NestJS e um painel de vendas orientado a eventos. Encerrada em outubro de 2026.',
      en: 'Minecraft server network with 200+ players and a virtual economy. I led a 15-person team and built Java plugins (Paper/Spigot), NestJS REST APIs and an event-driven sales dashboard. Shut down in October 2026.',
    },
    emoji: '⚡',
    tags: ['Java', 'Paper', 'NestJS', 'PostgreSQL'],
    status: 'ended',
  },
  {
    id: 'austv-store',
    name: 'AusTV Store',
    desc: {
      pt: 'Loja de itens e ranks da AusTV, com integração de pagamentos, painel administrativo e ranking mensal de apoiadores publicado no Discord. Encerrada junto com a rede.',
      en: "AusTV's item and rank store, with payment integration, an admin dashboard and a monthly supporter ranking posted to Discord. Shut down with the network.",
    },
    emoji: '🛒',
    tags: ['Next.js', 'NestJS', 'PostgreSQL'],
    status: 'ended',
  },
  {
    id: 'agropainel',
    name: 'AgroPainel — Hackathon Show Rural 2026',
    role: { pt: 'Equipe SupersonicTeam', en: 'SupersonicTeam member' },
    period: { pt: '2026', en: '2026' },
    desc: {
      pt: 'Painel financeiro e fiscal para produtores rurais, com fluxo de caixa, cálculo de impostos da reforma tributária, emissão de notas e revisão com o contador. Feito no Hackathon Show Rural Coopavel 2026.',
      en: 'Financial and tax dashboard for farmers, with cash flow, tax-reform calculations, invoicing and accountant review. Built at the Show Rural Coopavel 2026 hackathon.',
    },
    url: 'https://github.com/SupersonicTeam/HackThon-2026',
    emoji: '🏆',
    tags: ['TypeScript', 'IA', 'Hackathon'],
    status: 'completed',
  },
  {
    id: 'intercom',
    name: 'Intercom Sul 2026 — FAG',
    role: { pt: 'Desenvolvedor backend', en: 'Backend developer' },
    period: { pt: '2026', en: '2026' },
    desc: {
      pt: 'API do portal do Intercom Sul 2026, congresso acadêmico de Comunicação sediado no Centro Universitário FAG, em Toledo-PR: conteúdo, programação e inscrições.',
      en: 'API for the Intercom Sul 2026 portal, an academic Communication conference hosted at Centro Universitário FAG in Toledo, Brazil: content, schedule and registrations.',
    },
    url: 'https://github.com/ZzPowerTech/Intercom-BackEnd-',
    emoji: '🎓',
    tags: ['NestJS', 'TypeScript', 'React'],
    status: 'completed',
  },
]
