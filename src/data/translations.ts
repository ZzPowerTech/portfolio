// src/data/translations.ts
export type Language = 'pt' | 'en'

export interface Translations {
  nav: { projects: string }
  hero: {
    tag: string
    role: string
    desc: string
    downloadCV: string
    viewProjects: string
    available: string
  }
  projects: {
    label: string
    title: string
    subtitle: string
    online: string
  }
  repos: {
    label: string
    title: string
    subtitle: string
  }
  footer: { copyright: string }
}

export const translations: Record<Language, Translations> = {
  pt: {
    nav: { projects: 'Projetos' },
    hero: {
      tag: 'DESENVOLVEDOR · IA & JAVA',
      role: 'Java Developer & AI Enthusiast',
      desc: 'Desenvolvedor apaixonado por Inteligência Artificial e Java, com experiência real em produção liderando o AusTv Network. Em busca da primeira oportunidade formal na área de tecnologia.',
      downloadCV: '↓ Baixar Currículo',
      viewProjects: 'Ver Projetos ↓',
      available: 'Aberto a oportunidades',
    },
    projects: {
      label: 'PORTFÓLIO',
      title: 'Projetos em produção',
      subtitle: 'Sistemas ativos — clique para visitar',
      online: 'ONLINE',
    },
    repos: {
      label: 'OPEN SOURCE',
      title: 'Repositórios públicos',
      subtitle: 'Clique para abrir no GitHub · dados ao vivo via API',
    },
    footer: { copyright: '© 2026 Murillo W. Kist · portfolio.weissmurillo.de' },
  },
  en: {
    nav: { projects: 'Projects' },
    hero: {
      tag: 'DEVELOPER · AI & JAVA',
      role: 'Java Developer & AI Enthusiast',
      desc: 'Developer passionate about Artificial Intelligence and Java, with real production experience leading AusTv Network. Looking for the first formal opportunity in tech.',
      downloadCV: '↓ Download Resume',
      viewProjects: 'View Projects ↓',
      available: 'Open to opportunities',
    },
    projects: {
      label: 'PORTFOLIO',
      title: 'Live projects',
      subtitle: 'Active systems — click to visit',
      online: 'LIVE',
    },
    repos: {
      label: 'OPEN SOURCE',
      title: 'Public repositories',
      subtitle: 'Click to open on GitHub · live data from API',
    },
    footer: { copyright: '© 2026 Murillo W. Kist · portfolio.weissmurillo.de' },
  },
}
