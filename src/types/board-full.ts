import { Stage } from './stage'
import { Task } from './task'

export interface BoardFull {
  readonly id: number
  readonly name: string
  readonly createdAt: string
  readonly updatedAt: string
  readonly stages: Stage[]
  readonly tasks: Task[]
}
