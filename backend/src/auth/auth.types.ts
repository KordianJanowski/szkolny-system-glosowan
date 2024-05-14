import { Role } from "src/roles/role.enum"

export interface Payload {
  sub: number
  login: string
  roles: Role[]
}