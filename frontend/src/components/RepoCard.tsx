import { useState } from 'react'
import type { Repo } from '../types'
import { Star, Code, ExternalLink, Heart } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import api from '../lib/axios'

interface RepoCardProps {
  repo: Repo
  isSaved: boolean
  onSave: (repoId: number) => void
}

export default function RepoCard({ repo, isSaved, onSave }: RepoCardProps) {
  const { isLoggedIn } = useAuth()
  const [saved, setSaved] = useState(isSaved)

 const handleSave = async () => {
  if (saved) {
    // Unsave
    try {
      const res = await api.get('/user/favorites')
      const fav = res.data.find((f: { repoId: number; _id: string }) => f.repoId === repo.id)
      if (fav) {
        await api.delete(`/user/favorites/${fav._id}`)
        setSaved(false)
        onSave(repo.id)
      }
    } catch {
      console.error('Failed to unsave favorite')
    }
  } else {
    // Save
    try {
      await api.post('/user/favorites', {
        repoId: repo.id,
        name: repo.name,
        html_url: repo.html_url,
      })
      setSaved(true)
      onSave(repo.id)
    } catch {
      console.error('Failed to save favorite')
    }
  }
}

  return (
    <div
      className="p-5 rounded-lg border transition-all hover:scale-[1.02]"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}>

      {/* Repo Name + Link */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-base" style={{ color: 'var(--color-primary)' }}>
          {repo.name}
        </h3>
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          <ExternalLink size={16} style={{ color: 'var(--color-muted)' }} />
        </a>
      </div>

      {/* Description */}
      <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--color-muted)' }}>
        {repo.description ?? 'No description provided'}
      </p>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs" style={{ color: 'var(--color-muted)' }}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Star size={12} />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <Code size={12} />
            {repo.language ?? 'Unknown'}
          </span>
        </div>

        {/* Save button - only show if logged in */}
        {isLoggedIn && (
          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-2 py-1 rounded transition-colors"
            style={{ color: saved ? '#f85149' : 'var(--color-muted)' }}>
            <Heart size={12} fill={saved ? '#f85149' : 'none'} />
            {saved ? 'Saved!' : 'Save'}
          </button>
        )}
      </div>
    </div>
  )
}