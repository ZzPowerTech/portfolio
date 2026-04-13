// src/data/repos.ts
export const REPO_SLUGS = [
  'questExtra---plugin',
  'Intercom-BackEnd-',
  'api-discord-top-donators',
  'centralCartAPIPlugin',
  'estacionamento-vision',
  'portfolio',
] as const

export type RepoSlug = (typeof REPO_SLUGS)[number]
