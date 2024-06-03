"use client"

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { auth, firestore } from "@/services/firebase"
import { User, onAuthStateChanged, updateProfile } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

import LoadingScreen from "@/components/loading-screen"

type ProfileData = {
  displayName?: string | null
  photoURL?: string | null
}

interface AuthContextInterface {
  user: User | null
  updateUserInfo({ displayName, photoURL }: ProfileData): void
  loading: boolean
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const updateUserInfo = async (data: ProfileData) => {
    if (!user) return
    await updateProfile(user, data)
    await user.reload()
    setUser({ ...user })
  }

  return (
    <AuthContext.Provider value={{ user, loading, updateUserInfo }}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  )
}
