import { Task } from './task'

export interface Stage {
  readonly id: number
  readonly name: string
  readonly createdAt: string
  readonly updatedAt: string
  tasks?: Task[]
}
