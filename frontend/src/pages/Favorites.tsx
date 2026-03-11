import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import api from '../lib/axios'
import { ExternalLink, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Favorite {
  _id: string
  repoId: number
  name: string
  html_url: string
}

export default function Favorites() {
  const { isLoggedIn } = useAuth()
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    const fetchFavorites = async () => {
      try {
        const res = await api.get('/user/favorites')
        setFavorites(res.data)
      } catch {
        console.error('Failed to fetch favorites')
      } finally {
        setIsLoading(false)
      }
    }
    fetchFavorites()
  }, [isLoggedIn, navigate])

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/user/favorites/${id}`)
      setFavorites((prev) => prev.filter((fav) => fav._id !== id))
    } catch {
      console.error('Failed to delete favorite')
    }
  }

  if (isLoading) {
    return (
      <p className="text-center mt-16 text-sm" style={{ color: 'var(--color-muted)' }}>
        Loading favorites...
      </p>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>
        Your Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          No favorites yet — go search for some repos!
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {favorites.map((fav) => (
            <div
              key={fav._id}
              className="flex items-center justify-between p-4 rounded-lg border"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}>
              <span className="font-medium text-sm" style={{ color: 'var(--color-primary)' }}>
                {fav.name}
              </span>
              <div className="flex items-center gap-3">
                <a href={fav.html_url} target="_blank" rel="noreferrer">
                  <ExternalLink size={16} style={{ color: 'var(--color-muted)' }} />
                </a>
                <button onClick={() => handleDelete(fav._id)}>
                  <Trash2 size={16} style={{ color: '#f85149' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}