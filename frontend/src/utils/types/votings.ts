export interface Voting {
  id?: number
  title: string
  content: string
  options: string[]
  expiration_time: number
  created_at?: string
  votes?: string[]
}