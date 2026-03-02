import { useState } from 'react'

interface SearchBarProps {
  onSearch: (username: string) => void
  isLoading: boolean
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [username, setUsername] = useState('')

  const handleSubmit = () => {
    if (username.trim() === '') return
    onSearch(username)
  }

  return (
    <div className="flex flex-col items-center gap-4 py-16 px-4">
      <h1 className="text-4xl font-bold" style={{ color: 'var(--color-text)' }}>
        Search GitHub Repos
      </h1>
      <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
        Enter a GitHub username to explore their repositories
      </p>

      <div className="flex gap-2 w-full max-w-lg">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="e.g. torvalds"
          className="flex-1 px-4 py-2 rounded-md text-sm outline-none"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-6 py-2 rounded-md text-sm font-medium transition-opacity disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-primary)', color: '#0d1117' }}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  )
}