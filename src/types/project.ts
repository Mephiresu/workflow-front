import { Board } from './board'
import { Role } from './role'
import { User } from './user'

export interface ProjectUsers {
  readonly user: User
  readonly role: Role
}

export interface Project {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  boards: Board[]
  users: ProjectUsers[]
}
