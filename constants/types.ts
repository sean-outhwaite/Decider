export type RootStackParamList = {
  Root: undefined
  NotFound: undefined
  modal: { title: string; screen: string }
}

export type Confirmed = { id: string; title: string; archived?: boolean }

export type Suggestion = {
  id: string
  title: string
  submittedBy: string
  archived?: boolean
  rejectionReason?: string | null
}
