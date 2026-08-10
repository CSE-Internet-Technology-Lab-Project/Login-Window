import { createContext, useContext, useEffect, useState } from 'react'
import { getMe, loginUser, registerUser } from '@/lib/api'

const AuthContext = createContext(null)
const TOKEN_KEY = 'authToken'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function bootstrap() {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const data = await getMe(token)
        if (!cancelled) {
          setUser(data.user)
        }
      } catch {
        localStorage.removeItem(TOKEN_KEY)
        if (!cancelled) {
          setToken(null)
          setUser(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    bootstrap()
    return () => {
      cancelled = true
    }
  }, [token])

  const login = async ({ email, password }) => {
    const data = await loginUser({ email, password })
    localStorage.setItem(TOKEN_KEY, data.token)
    setToken(data.token)
    setUser(data.user)
    return data
  }

  const register = async ({ username, email, password }) => {
    await registerUser({ username, email, password })
    return login({ email, password })
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(user && token),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
