// src/data/translations.ts
export type Language = 'pt' | 'en'

export type Localized = Record<Language, string>

export interface TimelineItem {
  title: string
  org: string
  period: string
  detail: string
}

export interface SkillGroup {
  label: string
  items: string[]
}

/** Illustrative invoice shown next to AgroConIA (fictitious data, as on its landing page). */
export interface InvoiceMock {
  caption: string
  title: string
  draft: string
  items: { name: string; rule: string; flag?: boolean }[]
  check: string
  action: string
}

export interface Translations {
  nav: { about: string; projects: string; repos: string; contact: string }
  hero: {
    continue: string
    pill: string
    headline: string
    sub: string
    downloadCV: string
    viewProjects: string
    console: {
      label: string
      collection: string
      endpoints: string
      send: string
      preview: string
    }
  }
  about: {
    label: string
    title: string
    paragraphs: string[]
    experienceTitle: string
    experience: TimelineItem[]
    educationTitle: string
    education: TimelineItem[]
    achievementsTitle: string
    achievements: string[]
    skillsTitle: string
    skillGroups: SkillGroup[]
  }
  projects: {
    label: string
    title: string
    subtitle: string
    pastTitle: string
    pastSubtitle: string
    status: { live: string; ended: string; completed: string }
    visit: string
    invoice: InvoiceMock
  }
  repos: {
    label: string
    title: string
    subtitle: string
  }
  footer: {
    label: string
    title: string
    sub: string
    resume: string
    apiNote: string
    copyright: string
  }
}

const STACK = {
  backend: ['Java', 'Spring Boot', 'NestJS', 'Node.js', 'APIs REST', 'Paper/Spigot'],
  frontend: ['TypeScript', 'JavaScript', 'React', 'Next.js'],
  data: ['PostgreSQL', 'MySQL', 'Docker', 'Git'],
  ai: ['LLMs', 'Python', 'YOLO'],
}

export const translations: Record<Language, Translations> = {
  pt: {
    nav: { about: 'Sobre', projects: 'Projetos', repos: 'Código', contact: 'Contato' },
    hero: {
      continue: 'Continuar para Sobre',
      pill: 'cofundador da GWNext',
      headline: 'Construo backends para regras que não podem errar.',
      sub: 'Engenheiro de software com Java, Spring Boot, JavaScript, TypeScript e IA. Hoje desenvolvo a AgroConIA, que calcula o IBS e a CBS na nota do produtor rural.',
      downloadCV: 'Baixar currículo',
      viewProjects: 'Ver projetos',
      console: {
        label: 'API pública com os dados de Murillo Weiss Kist',
        collection: 'murillo-api · coleção pública',
        endpoints: 'Endpoints',
        send: 'Enviar',
        preview: 'Pré-visualização',
      },
    },
    about: {
      label: '/v1/perfil',
      title: 'Quem é Murillo Weiss Kist',
      paragraphs: [
        'Murillo Weiss Kist é engenheiro de software backend do Paraná, Brasil. Trabalha com Java, Spring Boot, JavaScript, TypeScript, NestJS e PostgreSQL, e aplica IA em produtos com regras de negócio rígidas.',
        'Hoje é cofundador da GWNext e desenvolve o backend da AgroConIA, que prepara produtores rurais e escritórios de contabilidade para a reforma tributária (IBS e CBS). De junho de 2025 a outubro de 2026 foi Head de Games e líder técnico da AusTV Network, onde liderou 15 pessoas e criou plugins Java, APIs NestJS e ferramentas internas.',
      ],
      experienceTitle: 'Experiência',
      experience: [
        {
          title: 'Cofundador e desenvolvedor backend',
          org: 'GWNext · AgroConIA',
          period: 'Atual',
          detail: 'Backend da plataforma de IBS/CBS para o agro, com conferência antes da emissão, fluxo de aprovação pelo contador e a assistente de IA Ceres.',
        },
        {
          title: 'Head de Games / Líder técnico',
          org: 'AusTV Network',
          period: 'jun/2025 – out/2026',
          detail: 'Equipe de 15 pessoas (desenvolvimento, comunidade e mídia), plugins Java, APIs REST em NestJS, automação de processos e roadmap técnico. Projeto encerrado em out/2026.',
        },
      ],
      educationTitle: 'Formação',
      education: [
        {
          title: 'Bacharelado em Engenharia de Software',
          org: 'Centro Universitário FAG',
          period: '2023 – 2026',
          detail: '',
        },
      ],
      achievementsTitle: 'Conquistas',
      achievements: [
        '1º lugar no Inovathon 2023 (FAG Cascavel)',
        'Top 5 no Hackathon Show Rural Coopavel 2025',
        'Hackathon Show Rural Coopavel 2026: AgroPainel, solução com IA para a reforma tributária',
      ],
      skillsTitle: 'Tecnologias',
      skillGroups: [
        { label: 'Backend', items: STACK.backend },
        { label: 'Frontend', items: STACK.frontend },
        { label: 'Dados e infra', items: STACK.data },
        { label: 'IA', items: STACK.ai },
      ],
    },
    projects: {
      label: '/v1/projetos',
      title: 'Projeto atual',
      subtitle: 'O que estou construindo agora',
      pastTitle: 'Projetos anteriores',
      pastSubtitle: 'Trabalhos encerrados ou concluídos',
      status: { live: 'No ar', ended: 'Encerrado', completed: 'Concluído' },
      visit: 'Abrir',
      invoice: {
        caption: 'Ilustração com dados fictícios',
        title: 'Nota de venda nº 1.024',
        draft: 'NF-e 4.00 · rascunho',
        items: [
          { name: 'Soja em grão', rule: 'Redução de 60%' },
          { name: 'Leite UHT integral', rule: 'Alíquota zero' },
          { name: 'Frete até o armazém', rule: 'Parece serviço: confira', flag: true },
        ],
        check: '1 ponto para conferir antes de emitir',
        action: 'Enviar para o escritório aprovar',
      },
    },
    repos: {
      label: '/v1/repositorios',
      title: 'Repositórios públicos',
      subtitle: 'Seleção do meu GitHub',
    },
    footer: {
      label: '/v1/contato',
      title: 'Vamos conversar',
      sub: 'Backend, regras fiscais, IA aplicada ou uma ideia que precisa sair do papel. O caminho mais rápido é o LinkedIn.',
      resume: 'Baixar currículo',
      apiNote: 'Este site também responde em JSON:',
      copyright: '© 2026 Murillo Weiss Kist',
    },
  },
  en: {
    nav: { about: 'About', projects: 'Projects', repos: 'Code', contact: 'Contact' },
    hero: {
      continue: 'Continue to About',
      pill: 'co-founder of GWNext',
      headline: 'I build backends for rules that cannot be wrong.',
      sub: "Software engineer working with Java, Spring Boot, JavaScript, TypeScript and AI. I am building AgroConIA, which calculates IBS and CBS taxes on Brazilian farmers' invoices.",
      downloadCV: 'Download resume',
      viewProjects: 'View projects',
      console: {
        label: "Public API with Murillo Weiss Kist's data",
        collection: 'murillo-api · public collection',
        endpoints: 'Endpoints',
        send: 'Send',
        preview: 'Preview',
      },
    },
    about: {
      label: '/v1/profile',
      title: 'Who is Murillo Weiss Kist',
      paragraphs: [
        'Murillo Weiss Kist is a backend software engineer from Paraná, Brazil. He works with Java, Spring Boot, JavaScript, TypeScript, NestJS and PostgreSQL, and applies AI to products with strict business rules.',
        'He is co-founder of GWNext and builds the backend of AgroConIA, which prepares farmers and accounting firms for Brazil\'s tax reform (IBS and CBS). From June 2025 to October 2026 he was Head of Games and tech lead at AusTV Network, leading 15 people and building Java plugins, NestJS APIs and internal tools.',
      ],
      experienceTitle: 'Experience',
      experience: [
        {
          title: 'Co-founder and backend developer',
          org: 'GWNext · AgroConIA',
          period: 'Current',
          detail: 'Backend of the IBS/CBS platform for agribusiness, with pre-issuance checks, accountant approval flow and the Ceres AI assistant.',
        },
        {
          title: 'Head of Games / Tech lead',
          org: 'AusTV Network',
          period: 'Jun 2025 – Oct 2026',
          detail: '15-person team (development, community and media), Java plugins, NestJS REST APIs, process automation and technical roadmap. Shut down in Oct 2026.',
        },
      ],
      educationTitle: 'Education',
      education: [
        {
          title: 'B.Sc. in Software Engineering',
          org: 'Centro Universitário FAG',
          period: '2023 – 2026',
          detail: '',
        },
      ],
      achievementsTitle: 'Achievements',
      achievements: [
        '1st place, Inovathon 2023 (FAG Cascavel)',
        'Top 5, Show Rural Coopavel Hackathon 2025',
        'Show Rural Coopavel Hackathon 2026: AgroPainel, an AI solution for the tax reform',
      ],
      skillsTitle: 'Technologies',
      skillGroups: [
        { label: 'Backend', items: STACK.backend },
        { label: 'Frontend', items: STACK.frontend },
        { label: 'Data and infra', items: STACK.data },
        { label: 'AI', items: STACK.ai },
      ],
    },
    projects: {
      label: '/v1/projects',
      title: 'Current project',
      subtitle: 'What I am building now',
      pastTitle: 'Past projects',
      pastSubtitle: 'Finished or shut-down work',
      status: { live: 'Live', ended: 'Shut down', completed: 'Completed' },
      visit: 'Open',
      invoice: {
        caption: 'Illustration with fictitious data',
        title: 'Sales invoice #1,024',
        draft: 'NF-e 4.00 · draft',
        items: [
          { name: 'Soybeans', rule: '60% reduction' },
          { name: 'UHT whole milk', rule: 'Zero rate' },
          { name: 'Freight to warehouse', rule: 'Looks like a service: check', flag: true },
        ],
        check: '1 item to check before issuing',
        action: 'Send to the accountant for approval',
      },
    },
    repos: {
      label: '/v1/repositories',
      title: 'Public repositories',
      subtitle: 'A selection from my GitHub',
    },
    footer: {
      label: '/v1/contact',
      title: "Let's talk",
      sub: 'Backend, tax rules, applied AI or an idea that needs to ship. LinkedIn is the fastest way to reach me.',
      resume: 'Download resume',
      apiNote: 'This site also answers in JSON:',
      copyright: '© 2026 Murillo Weiss Kist',
    },
  },
}
