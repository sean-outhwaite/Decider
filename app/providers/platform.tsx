import React, { createContext, ReactNode, useContext } from 'react'
import { Platform } from 'react-native'

type PlatformContextType = {
  platform: string
}

const PlatformContext = createContext<PlatformContextType | undefined>(
  undefined,
)

export function PlatformProvider({ children }: { children: ReactNode }) {
  const value = {
    platform: Platform.OS,
  }

  return (
    <PlatformContext.Provider value={value}>
      {children}
    </PlatformContext.Provider>
  )
}

export function usePlatform() {
  const context = useContext(PlatformContext)
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider')
  }
  return context
}
