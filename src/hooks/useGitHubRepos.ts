// src/hooks/useGitHubRepos.ts
import { useEffect, useState } from 'react'
import { REPO_SLUGS } from '../data/repos'

export interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
}

interface UseGitHubReposResult {
  repos: GitHubRepo[]
  loading: boolean
  error: string | null
}

const OWNER = 'ZzPowerTech'

export function useGitHubRepos(): UseGitHubReposResult {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const promises = REPO_SLUGS.map(slug =>
      fetch(`https://api.github.com/repos/${OWNER}/${slug}`).then(r => {
        if (!r.ok) throw new Error(`Failed to fetch ${slug}: ${r.status}`)
        return r.json() as Promise<GitHubRepo>
      }),
    )

    Promise.all(promises)
      .then(data => {
        setRepos(data)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { repos, loading, error }
}
