"use client"

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { auth } from "@/services/firebase"
import { User, onAuthStateChanged } from "firebase/auth"

interface AuthContextInterface {
  user: User | null
}

export const AuthContext = createContext<AuthContextInterface | undefined>(
  undefined
)

export const useAuthContext = (): AuthContextInterface => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading Spinner Here...</div> : children}
    </AuthContext.Provider>
  )
}
