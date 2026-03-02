import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import RepoCard from '../components/RepoCard'
import type { Repo } from '../types'

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (username: string) => {
    setIsLoading(true)
    setError(null)
    setRepos([])

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`)
      
      if (!response.ok) {
        throw new Error('User not found')
      }

      const data: Repo[] = await response.json()
      setRepos(data)
     } catch {
      setError('User not found or API limit reached. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16">
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      {/* Error message */}
      {error && (
        <p className="text-center text-sm mb-6" style={{ color: '#f85149' }}>
          {error}
        </p>
      )}

      {/* Repo grid */}
      {repos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  )
}