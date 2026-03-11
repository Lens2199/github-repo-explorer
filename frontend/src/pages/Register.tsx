import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import api from '../lib/axios'

export default function Register() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await api.post('/auth/register', { email, password })
      login(res.data.token, res.data.email)
    } catch {
      setError('Email already in use or invalid')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md p-8 rounded-lg border"
        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
          Create Account
        </h2>

        {error && (
          <p className="text-sm mb-4" style={{ color: '#f85149' }}>{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-md text-sm outline-none"
            style={{
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-md text-sm outline-none"
            style={{
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
          />
          <button
            onClick={handleRegister}
            disabled={isLoading}
            className="px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
            style={{ backgroundColor: 'var(--color-primary)', color: '#0d1117' }}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  )
}