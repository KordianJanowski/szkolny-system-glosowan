export type BVoting = [
  voting_id: BigInt,
  options: string[],
  title: string,
  content: string,
  expiration_time: BigInt
]

export type BVote = [
  voting_id: BigInt,
  vote_option: BigInt,
]