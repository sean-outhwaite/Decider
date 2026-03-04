import firestore from '@react-native-firebase/firestore'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type Suggestion = { id: string; title: string; submittedBy: string }

type SuggestionsContextType = {
  suggestions: Suggestion[]
  addSuggestion: (title: string, submittedBy: string) => void
  removeSuggestion: (id: string) => void
}

const SuggestionsContext = createContext<SuggestionsContextType | undefined>(
  undefined,
)

const suggestionsRef = firestore().collection('suggestions')

export function SuggestionsProvider({ children }: { children: ReactNode }) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  useEffect(() => {
    const unsubscribe = suggestionsRef.onSnapshot((snapshot) => {
      if (snapshot) {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setSuggestions(data as Suggestion[])
      } else {
        console.error('Snapshot is null')
        setSuggestions([])
      }
    })
    return unsubscribe
  }, [])

  const addSuggestion = async (title: string, submittedBy: string) => {
    await suggestionsRef.add({ title, submittedBy })
  }

  const removeSuggestion = async (id: string) => {
    await suggestionsRef.doc(id).delete()
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
