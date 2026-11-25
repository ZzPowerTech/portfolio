// src/data/translations.ts
export type Language = 'pt' | 'en'

export type Localized = Record<Language, string>

export interface TimelineItem {
  title: string
  org: string
  period: string
  detail: string
}

export interface Translations {
  nav: { about: string; projects: string; repos: string }
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
    skills: string[]
  }
  projects: {
    label: string
    title: string
    subtitle: string
    pastTitle: string
    pastSubtitle: string
    status: { live: string; ended: string; completed: string }
    visit: string
  }
  repos: {
    label: string
    title: string
    subtitle: string
  }
  footer: { copyright: string }
}

const SKILLS = [
  'Java',
  'Spring Boot',
  'TypeScript',
  'JavaScript',
  'NestJS',
  'Node.js',
  'React',
  'Next.js',
  'PostgreSQL',
  'MySQL',
  'Python',
  'APIs REST',
  'Docker',
  'Git',
  'Paper/Spigot',
]

export const translations: Record<Language, Translations> = {
  pt: {
    nav: { about: 'Sobre', projects: 'Projetos', repos: 'Código' },
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
      skills: SKILLS,
    },
    projects: {
      label: '/v1/projetos',
      title: 'Projeto atual',
      subtitle: 'O que estou construindo agora',
      pastTitle: 'Projetos anteriores',
      pastSubtitle: 'Trabalhos encerrados ou concluídos',
      status: { live: 'NO AR', ended: 'ENCERRADO', completed: 'CONCLUÍDO' },
      visit: 'Abrir',
    },
    repos: {
      label: '/v1/repositorios',
      title: 'Repositórios públicos',
      subtitle: 'Seleção do meu GitHub',
    },
    footer: { copyright: '© 2026 Murillo Weiss Kist · portfolio.weissmurillo.de' },
  },
  en: {
    nav: { about: 'About', projects: 'Projects', repos: 'Code' },
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
      skills: SKILLS,
    },
    projects: {
      label: '/v1/projects',
      title: 'Current project',
      subtitle: 'What I am building now',
      pastTitle: 'Past projects',
      pastSubtitle: 'Finished or shut-down work',
      status: { live: 'LIVE', ended: 'SHUT DOWN', completed: 'COMPLETED' },
      visit: 'Open',
    },
    repos: {
      label: '/v1/repositories',
      title: 'Public repositories',
      subtitle: 'A selection from my GitHub',
    },
    footer: { copyright: '© 2026 Murillo Weiss Kist · portfolio.weissmurillo.de' },
  },
}
