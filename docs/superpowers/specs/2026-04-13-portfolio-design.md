# Portfolio — Design Spec

**Data:** 2026-04-13  
**Autor:** Murillo W. Kist  
**Status:** Aprovado

---

## Visão Geral

Portfólio pessoal de Murillo W. Kist, desenvolvedor Java & IA em início de carreira.  
**Público-alvo:** empresas de tecnologia que buscam desenvolvedor com conhecimento sólido em IA e Java.  
**Objetivo:** apresentar currículo, projetos online e repositórios GitHub de forma profissional e acessível.  
**URL de produção:** `portfolio.weissmurillo.de` (via Vercel)

---

## Stack Técnica

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Framework | React 19 + Vite 8 | Já configurado no projeto; SPA estática, deploy direto na Vercel |
| Linguagem | TypeScript | Tipagem segura, padrão do projeto |
| Animações | Framer Motion | Melhor biblioteca de animações para React; portfólios premium |
| Dados GitHub | GitHub REST API (ao vivo) | Stars, linguagem e descrição em tempo real |
| Deploy | Vercel | CI/CD automático via push no GitHub |
| Domínio | `portfolio.weissmurillo.de` | Configurado como custom domain na Vercel |

---

## Design System

### Paleta de Cores

| Token | Valor | Uso |
|-------|-------|-----|
| `bg-base` | `#030712` | Fundo principal |
| `bg-card` | `#0f172a` | Cards e superfícies |
| `bg-card-hover` | `#111827` | Estado hover dos cards |
| `purple-600` | `#7c3aed` | Acento principal, bordas, botões |
| `purple-500` | `#a855f7` | Texto de destaque, ícones, tags |
| `text-primary` | `#f8fafc` | Títulos |
| `text-secondary` | `#94a3b8` | Parágrafos |
| `text-muted` | `#64748b` | Subtítulos, descrições |
| `green-500` | `#22c55e` | Badge "ONLINE", dot ao vivo |
| `border-subtle` | `#1e293b` | Bordas padrão dos cards |
| `border-purple` | `#7c3aed40` | Bordas hover dos cards |

### Tipografia

- Família: `Inter`, system-ui, sans-serif
- Títulos hero: 52px, weight 900, letter-spacing -2px
- Section titles: 32px, weight 800
- Body: 13-14px, weight 400

### Animações (Framer Motion)

| Componente | Animação |
|-----------|----------|
| Hero completo | Fade-in + slide-up sequencial (stagger 0.1s por elemento) |
| Foto hero | Glow pulsante (scale 1→1.06, opacity 0.6→1, 3s loop) |
| Cards de projetos | Entrada com stagger no scroll (viewport trigger) |
| Hover dos cards | `translateY(-4px)` + box-shadow roxa + borda iluminada |
| Dot ONLINE | Blink 2s loop (opacity 1→0.4) |
| Ícone ↗ | `translate(2px, -2px)` no hover do card |
| Header | Sticky com backdrop-blur ao scroll |

---

## Estrutura de Páginas

### SPA de página única com seções:

```
Header (sticky)
└── Logo "MW." | Links: Projetos · GitHub · LinkedIn | Seletor PT|EN

Hero (100vh)
└── [Esquerda] Tag · Nome · Role · Divider · Descrição · Botões CV + Ver Projetos
└── [Direita]  Foto (hero.png) com glow roxo + badge "● Aberto a oportunidades"

Seção: Projetos em produção
└── Grid 3 colunas, 4 cards (linha 3+1) clicáveis → abre URL em nova aba

Seção: Repositórios públicos
└── Grid 3×2 de repo-cards clicáveis → abre GitHub em nova aba

Footer
└── Copyright · Links GitHub e LinkedIn
```

---

## Internacionalização (i18n)

- **Idiomas:** Português (padrão) e Inglês
- **Implementação:** contexto React simples (`LanguageContext`) — sem biblioteca externa (portfólio pequeno, i18next seria overengineering)
- **Seletor:** botão `PT | EN` no header, troca globalmente via contexto React
- **Escopo:** todos os textos de UI (tag, descrições, botões, labels de seção, footer)
- **Dados dinâmicos** (nome, URLs, tags de tech) não são traduzidos

---

## Componentes

### `<Header>`
- Sticky, backdrop-blur `rgba(3,7,18,0.85)`, borda inferior `#7c3aed20`
- Logo "MW." em roxo
- Links: Projetos (scroll suave) · GitHub (externo) · LinkedIn (externo)
- Seletor de idioma `PT | EN`

### `<Hero>`
- Layout split: conteúdo à esquerda, foto à direita
- Fundo: grid de pontos roxos (opacity 4%) + radial-gradient roxo à direita
- **Foto:** `src/assets/hero.png`, `object-fit: cover`, `object-position: center top`
  - Border-radius 24px, borda `#7c3aed60`, glow `0 0 50px #7c3aed30`
  - Overlay roxo sutil `linear-gradient(135deg, #7c3aed08, transparent 60%)`
  - Glow pulsante via Framer Motion
- **Badge:** `● Aberto a oportunidades` — dot verde pulsante, canto inferior direito da foto
- **Botão CV:** `href` para `/assets/curriculum/Curriculo_Murilo_Weiss_Kist_Ultra_Profissional.pdf` com `download` attribute

### `<ProjectCard>` — projetos online
- Elemento `<a target="_blank" rel="noopener">` com `href` para URL do projeto
- Badge `● ONLINE` com dot animado verde
- Ícone ↗ no canto superior direito (aparece no hover)
- Linha de gradiente no topo (aparece no hover)
- Tags de tecnologia em roxo sutil

### `<RepoCard>` — repositórios GitHub
- Elemento `<a target="_blank" rel="noopener">` com `href` para URL do repo
- Dados buscados via `GET https://api.github.com/repos/ZzPowerTech/{repo}`
- Campos exibidos: `name`, `description`, `language`, `stargazers_count`
- Indicador de linguagem com cor padrão GitHub (Java=laranja, TypeScript=azul, Python=azul-escuro)
- Ícone ↗ no hover

### `<Footer>`
- Copyright `© 2026 Murillo W. Kist · portfolio.weissmurillo.de`
- Links GitHub e LinkedIn com ícones SVG

---

## Dados dos Projetos (hardcoded)

### Projetos Online

| Nome | URL | Ícone | Tags |
|------|-----|-------|------|
| AusTv Network | `https://austv.net` | ⚡ | Java, Spigot, MySQL |
| AusTv Store | `https://loja.austv.net` | 🛒 | Next.js, NestJS, PostgreSQL |
| Intercom 2026 — FAG | `https://intercom2026.fag.edu.br/` | 🎓 | React, NestJS |
| Landing Page — Samuel | `https://samuel-frontend.vercel.app/` | 🌐 | React, Vercel |

### Repositórios GitHub (buscados via API)

| Repo | URL |
|------|-----|
| questExtra---plugin | `https://github.com/ZzPowerTech/questExtra---plugin` |
| Intercom-BackEnd- | `https://github.com/ZzPowerTech/Intercom-BackEnd-` |
| api-discord-top-donators | `https://github.com/ZzPowerTech/api-discord-top-donators` |
| centralCartAPIPlugin | `https://github.com/ZzPowerTech/centralCartAPIPlugin` |
| estacionamento-vision | `https://github.com/ZzPowerTech/estacionamento-vision` |
| portfolio | `https://github.com/ZzPowerTech/portfolio` |

---

## Dados Pessoais

| Campo | Valor |
|-------|-------|
| Nome | Murillo W. Kist |
| Role (PT) | Desenvolvedor Java & Entusiasta de IA |
| Role (EN) | Java Developer & AI Enthusiast |
| LinkedIn | `https://www.linkedin.com/in/murillo-weiss-kist-6aa2a1279/` |
| GitHub | `https://github.com/ZzPowerTech` |
| Currículo | `src/assets/curriculum/Curriculo_Murilo_Weiss_Kist_Ultra_Profissional.pdf` |
| Foto | `src/assets/hero.png` |
| Domínio | `portfolio.weissmurillo.de` |

---

## Deploy

- **Plataforma:** Vercel (free tier)
- **Trigger:** push na branch `main` do GitHub
- **Custom domain:** `portfolio.weissmurillo.de` configurado no painel Vercel
- **Build command:** `npm run build` (já configurado no `package.json`)
- **Output directory:** `dist`
- **`.gitignore`:** adicionar `.superpowers/` antes do primeiro commit

---

## Fora de Escopo

- Formulário de contato
- Blog / artigos
- Página de detalhes por projeto
- Analytics
- Dark/light mode toggle (apenas dark)
- SEO avançado (meta tags básicas são suficientes)
