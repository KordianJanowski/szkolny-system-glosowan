export interface User {
  class: string,
  created_at: string,
  id: number,
  login: string,
  name: string,
  surname: string
  roles: string[],
  votingsIds: number[]
}

export interface UserLogin {
  login: string;
  password: string;
}