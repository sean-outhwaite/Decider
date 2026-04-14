import {
  collection,
  FirebaseFirestoreTypes,
  getFirestore,
  onSnapshot,
} from '@react-native-firebase/firestore'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { Confirmed } from '../../constants/types'

type ConfirmedContextType = {
  confirmed: Confirmed[]
  addConfirmed: (title: string) => void
  removeConfirmed: (id: string) => void
  restoreConfirmed: (id: string) => void
  archiveConfirmed: (id: string) => void
}

const ConfirmedContext = createContext<ConfirmedContextType | undefined>(
  undefined,
)

const db = getFirestore()
const confirmedRef = collection(db, 'confirmed')

export default function ConfirmedProvider({
  children,
}: {
  children: ReactNode
}) {
  const [confirmed, setConfirmed] = useState<Confirmed[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(confirmedRef, (snapshot) => {
      if (snapshot) {
        const data = snapshot.docs.map(
          (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<Confirmed>) => ({
            id: doc.id,
            ...(doc.data() as Omit<Confirmed, 'id'>),
          }),
        )
        setConfirmed(data as Confirmed[])
      } else {
        console.error('Snapshot is null')
        setConfirmed([])
      }
    })
    return unsubscribe
  }, [])

  const addConfirmed = async (title: string) => {
    await confirmedRef.add({ title })
  }

  const removeConfirmed = async (id: string) => {
    await confirmedRef.doc(id).delete()
  }

  const archiveConfirmed = async (id: string) => {
    await confirmedRef.doc(id).set({ archived: true }, { merge: true })
  }

  const restoreConfirmed = async (id: string) => {
    await confirmedRef.doc(id).set({ archived: false }, { merge: true })
  }

  return (
    <ConfirmedContext.Provider
      value={{
        confirmed,
        addConfirmed,
        removeConfirmed,
        archiveConfirmed,
        restoreConfirmed,
      }}
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
