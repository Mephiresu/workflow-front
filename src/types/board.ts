import { Stage } from './stage'
import { Task } from './task'

export interface Board {
  readonly id: number
  readonly name: string
  readonly isDefault: boolean
  readonly createdAt: string
  readonly updatedAt: string
}

export interface BoardFull {
  readonly id: number
  readonly name: string
  readonly createdAt: string
  readonly updatedAt: string
  readonly stages: Stage[]
  readonly tasks: Task[]
}
