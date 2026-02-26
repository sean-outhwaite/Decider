import * as SQLite from 'expo-sqlite'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type Confirmed = { id: number; title: string }

type ConfirmedContextType = {
  confirmed: Confirmed[]
  addConfirmed: (title: string) => void
  removeConfirmed: (id: number) => void
}

const ConfirmedContext = createContext<ConfirmedContextType | undefined>(
  undefined,
)

const db = SQLite.openDatabaseSync('confirmed.db')

export function ConfirmedProvider({ children }: { children: ReactNode }) {
  const [confirmed, setConfirmed] = useState<Confirmed[]>([])

  useEffect(() => {
    // Create table if it doesn't exist
    db.execSync(
      'CREATE TABLE IF NOT EXISTS confirmed (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT);',
    )
    loadConfirmed()
  }, [])

  const loadConfirmed = () => {
    const result = db.getAllSync<Confirmed>('SELECT * FROM confirmed;')
    setConfirmed(result)
  }

  const addConfirmed = (title: string) => {
    db.runSync('INSERT INTO confirmed (title) VALUES (?);', [title])
    loadConfirmed() // Reload after insert
  }

  const removeConfirmed = (id: number) => {
    db.runSync('DELETE FROM confirmed WHERE id = ?;', [id])
    loadConfirmed() // Reload after delete
  }

  return (
    <ConfirmedContext.Provider
      value={{ confirmed, addConfirmed, removeConfirmed }}
    >
      {children}
    </ConfirmedContext.Provider>
  )
}

export function useConfirmed() {
  const context = useContext(ConfirmedContext)
  if (!context) {
    throw new Error('useConfirmed must be used within a ConfirmedProvider')
  }
  return context
}
