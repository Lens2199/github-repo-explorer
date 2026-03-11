import { useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem('email')
  )

  const login = (token: string, email: string) => {
    localStorage.setItem('token', token)
    localStorage.setItem('email', email)
    setToken(token)
    setEmail(email)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    setToken(null)
    setEmail(null)
  }

  return (
    <AuthContext.Provider value={{ token, email, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}