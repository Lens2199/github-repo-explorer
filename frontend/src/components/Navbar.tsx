export default function Navbar() {
  return (
    <nav className="w-full border-b px-6 py-4 flex items-center justify-between"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">🐙</span>
        <span className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>
          Repo Explorer
        </span>
      </div>

      {/* Auth buttons */}
      <div className="flex items-center gap-3">
        <button
          className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
          style={{ color: 'var(--color-muted)' }}>
          Login
        </button>
        <button
          className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
          style={{ backgroundColor: 'var(--color-primary)', color: '#0d1117' }}>
          Sign Up
        </button>
      </div>
    </nav>
  )
}