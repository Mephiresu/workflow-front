import { Board } from './board'

export interface Project {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  boards: Board[]
}
