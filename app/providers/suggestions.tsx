import * as SQLite from 'expo-sqlite'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type Suggestion = { id: number; title: string; submittedBy: string }

type SuggestionsContextType = {
  suggestions: Suggestion[]
  addSuggestion: (title: string, submittedBy: string) => void
  removeSuggestion: (id: number, user: string) => void
}

const SuggestionsContext = createContext<SuggestionsContextType | undefined>(
  undefined,
)

const db = SQLite.openDatabaseSync('suggestions.db')

export function SuggestionsProvider({ children }: { children: ReactNode }) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  useEffect(() => {
    db.execSync(
      'CREATE TABLE IF NOT EXISTS suggestions (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, submitted_by TEXT);',
    )
    loadSuggestions()
  }, [])

  const loadSuggestions = () => {
    const result = db.getAllSync<Suggestion>(
      'SELECT id, title, submitted_by as submittedBy FROM suggestions;',
    )
    setSuggestions(result)
  }

  const addSuggestion = (title: string, submittedBy: string) => {
    db.runSync('INSERT INTO suggestions (title, submitted_by) VALUES (?, ?);', [
      title,
      submittedBy,
    ])
    loadSuggestions()
  }

  const removeSuggestion = (id: number) => {
    db.runSync('DELETE FROM suggestions WHERE id = ?;', [id])
    loadSuggestions()
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
