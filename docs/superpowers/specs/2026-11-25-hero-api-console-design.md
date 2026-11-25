# Hero "resposta de API" — design

Data: 2026-11-25 · Aprovado por Murillo (protótipo navegável).

## Objetivo
Trocar a hero padrão (texto à esquerda, foto à direita) por uma hero que mostre, de cara,
que Murillo é engenheiro backend, e que conduza o scroll para as próximas seções.

## Decisões
- Estrutura inspirada em páginas de produto (título central, CTA, janela grande com brilho
  por baixo), sem copiar marca de terceiros.
- Título de posicionamento: "Construo backends para regras que não podem errar."
  Nome e foto ficam numa pílula acima do título.
- Janela de cliente HTTP com 5 endpoints clicáveis (perfil, agora, projetos, stack, contato);
  `/perfil` mostra a foto como pré-visualização de `avatar_url`.
- A URL exibida é real: o build publica os mesmos dados em `/v1/<endpoint>.json`
  (rewrite sem extensão no `vercel.json`, CORS liberado). Fonte única: `src/data/api.ts`.
- Continuidade: linha vertical sai da janela até a próxima seção; os rótulos de seção viram
  requisições (`GET /v1/perfil`, `/v1/projetos`, `/v1/repositorios`) e os títulos ficam
  centralizados no mesmo eixo da hero.
- Tipografia: Schibsted Grotesk (texto) + JetBrains Mono (código).
- Movimento: só a cascata das linhas do JSON ao carregar/trocar endpoint; respeita
  `prefers-reduced-motion`.
- Acessibilidade: endpoints são `tablist` com setas do teclado; resposta é `tabpanel`.
- Celular (< 820px): endpoints em abas roláveis, sem painel de foto.

## Arquivos
`src/components/Hero.tsx`, `ApiConsole.tsx`, `hero.css`, `SectionLabel.tsx`,
`src/data/api.ts`, `src/lib/jsonLines.ts`, `scripts/prerender.mjs`, `vercel.json`.
