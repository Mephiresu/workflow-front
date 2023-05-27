import { Project } from './project'
import { Role } from './role'
import { User } from './user'

export interface ProjectUserResponse {
  project: Project
  users: {
    user: User
    role: Role
  }
}
