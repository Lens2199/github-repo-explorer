import { createContext } from 'react'

interface AuthContextType {
  token: string | null
  email: string | null
  login: (token: string, email: string) => void
  logout: () => void
  isLoggedIn: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)
export type { AuthContextType }