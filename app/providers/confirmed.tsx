import React, { createContext, ReactNode, useContext, useState } from 'react'

type Confirmed = { key: string }

type ConfirmedContextType = {
  confirmed: Confirmed[]
  setConfirmed: React.Dispatch<React.SetStateAction<Confirmed[]>>
}

const ConfirmedContext = createContext<ConfirmedContextType | undefined>(
  undefined,
)

export function ConfirmedProvider({ children }: { children: ReactNode }) {
  const [confirmed, setConfirmed] = useState<Confirmed[]>([
    { key: 'Confirmed 1' },
    { key: 'Confirmed 2' },
    { key: 'Confirmed 3' },
  ])

  return (
    <ConfirmedContext.Provider value={{ confirmed, setConfirmed }}>
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
