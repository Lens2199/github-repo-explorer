import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { isLoggedIn, logout, email } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="w-full border-b px-6 py-4 flex items-center justify-between"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <span className="text-2xl">🐙</span>
        <span className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>
          Repo Explorer
        </span>
      </div>

      {/* Auth buttons */}
      <div className="flex items-center gap-3">
  {isLoggedIn ? (
    <>
      <button
        onClick={() => navigate('/favorites')}
        className="px-4 py-2 rounded-md text-sm font-medium"
        style={{ color: 'var(--color-muted)' }}>
        Favorites
      </button>
      <span className="text-sm" style={{ color: 'var(--color-muted)' }}>{email}</span>
      <button
        onClick={logout}
        className="px-4 py-2 rounded-md text-sm font-medium"
        style={{ color: 'var(--color-muted)' }}>
        Logout
      </button>
    </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-md text-sm font-medium"
              style={{ color: 'var(--color-muted)' }}>
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-4 py-2 rounded-md text-sm font-medium"
              style={{ backgroundColor: 'var(--color-primary)', color: '#0d1117' }}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  )
}