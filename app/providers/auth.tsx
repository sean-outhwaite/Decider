import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type AuthContextType = {
  user: FirebaseAuthTypes.User | null
  initializing: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user)
      if (initializing) setInitializing(false)
    })
    return subscriber
  }, [])

  return (
    <AuthContext.Provider value={{ user, initializing }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
