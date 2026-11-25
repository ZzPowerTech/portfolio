// src/data/repos.ts
import type { Localized } from './translations'

export interface Repo {
  name: string
  url: string
  language: string
  desc: Localized
}

const GH = 'https://github.com/ZzPowerTech'

/** Curated, static list: rendered into the HTML at build time, no API call. */
export const REPOS: Repo[] = [
  {
    name: 'CommandOverride',
    url: `${GH}/CommandOverride`,
    language: 'Java',
    desc: {
      pt: 'Plugin Paper que resolve conflitos de alias entre plugins por configuração YAML, sem alterar plugins de terceiros.',
      en: 'Paper plugin that resolves command-alias conflicts between plugins through YAML config, without touching third-party plugins.',
    },
  },
  {
    name: 'EngSearch',
    url: `${GH}/EngSearch`,
    language: 'Python',
    desc: {
      pt: 'Robô de prospecção para venda de elevadores: encontra construtoras, inicia contato por WhatsApp e agenda reuniões.',
      en: 'Prospecting bot for elevator sales: finds construction companies, starts WhatsApp contact and schedules meetings.',
    },
  },
  {
    name: 'estacionamento-vision',
    url: `${GH}/estacionamento-vision`,
    language: 'Python',
    desc: {
      pt: 'Detecção de vagas de estacionamento em tempo real com YOLO + CNN, usando a câmera do celular.',
      en: 'Real-time parking spot detection with YOLO + CNN, using a phone camera.',
    },
  },
  {
    name: 'api-discord-top-donators',
    url: `${GH}/api-discord-top-donators`,
    language: 'TypeScript',
    desc: {
      pt: 'API NestJS que gera o ranking mensal de apoiadores com imagens e publica no Discord por webhook.',
      en: 'NestJS API that builds a monthly supporter ranking with images and posts it to Discord via webhook.',
    },
  },
  {
    name: 'centralCartAPIPlugin',
    url: `${GH}/centralCartAPIPlugin`,
    language: 'Java',
    desc: {
      pt: 'Plugin Minecraft que consome a API da CentralCart e exibe os maiores apoiadores do mês, com NPCs e recompensas.',
      en: 'Minecraft plugin that consumes the CentralCart API to show top monthly supporters, with NPCs and rewards.',
    },
  },
  {
    name: 'Intercom-BackEnd-',
    url: `${GH}/Intercom-BackEnd-`,
    language: 'TypeScript',
    desc: {
      pt: 'Backend NestJS do portal do Intercom Sul 2026 (FAG Toledo).',
      en: 'NestJS backend for the Intercom Sul 2026 portal (FAG Toledo).',
    },
  },
]
