import { Role } from "../roles/role.enum"

export interface Payload {
  sub: number
  login: string
  roles: Role[]
}