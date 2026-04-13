// src/hooks/__tests__/useGitHubRepos.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { useGitHubRepos } from '../useGitHubRepos'

const mockRepo = (slug: string) => ({
  name: slug,
  description: `Description of ${slug}`,
  html_url: `https://github.com/ZzPowerTech/${slug}`,
  language: 'TypeScript',
  stargazers_count: 0,
})

describe('useGitHubRepos', () => {
  afterEach(() => vi.restoreAllMocks())

  it('starts in loading state', () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response())
    const { result } = renderHook(() => useGitHubRepos())
    expect(result.current.loading).toBe(true)
    expect(result.current.repos).toHaveLength(0)
  })

  it('returns repos on success', async () => {
    vi.spyOn(global, 'fetch').mockImplementation((url) => {
      const slug = String(url).split('/').pop()!
      return Promise.resolve(new Response(JSON.stringify(mockRepo(slug)), { status: 200 }))
    })

    const { result } = renderHook(() => useGitHubRepos())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.repos).toHaveLength(6)
    expect(result.current.error).toBeNull()
  })

  it('sets error on fetch failure', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('network error'))
    const { result } = renderHook(() => useGitHubRepos())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('network error')
    expect(result.current.repos).toHaveLength(0)
  })
})
