export interface Voting {
  id?: number
  title: string
  content: string
  options: string[]
  expiration_time: number
  created_at?: string
  votes?: string[]
  is_visible_before_voting_end?: boolean
}