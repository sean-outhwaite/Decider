import * as SQLite from 'expo-sqlite'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type Suggestion = { id: number; title: string }

type SuggestionsContextType = {
  suggestions: Suggestion[]
  addSuggestion: (title: string) => void
  removeSuggestion: (id: number) => void
}

const SuggestionsContext = createContext<SuggestionsContextType | undefined>(
  undefined,
)

const db = SQLite.openDatabaseSync('suggestions.db')

export function SuggestionsProvider({ children }: { children: ReactNode }) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  useEffect(() => {
    // Create table if it doesn't exist
    db.execSync(
      'CREATE TABLE IF NOT EXISTS suggestions (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT);',
    )
    loadSuggestions()
  }, [])

  const loadSuggestions = () => {
    const result = db.getAllSync<Suggestion>('SELECT * FROM suggestions;')
    setSuggestions(result)
  }

  const addSuggestion = (title: string) => {
    db.runSync('INSERT INTO suggestions (title) VALUES (?);', [title])
    loadSuggestions() // Reload after insert
  }

  const removeSuggestion = (id: number) => {
    db.runSync('DELETE FROM suggestions WHERE id = ?;', [id])
    loadSuggestions() // Reload after delete
  }

  return (
    <SuggestionsContext.Provider
      value={{ suggestions, addSuggestion, removeSuggestion }}
    >
      {children}
    </SuggestionsContext.Provider>
  )
}

export function useSuggestions() {
  const context = useContext(SuggestionsContext)
  if (!context) {
    throw new Error('useSuggestions must be used within a SuggestionsProvider')
  }
  return context
}
