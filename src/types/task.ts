import { Stage } from './stage'
import { User } from './user'

export interface Task {
  readonly id: number
  readonly number: number
  readonly index: number
  readonly title: string
  readonly description: string
  readonly stageId: number
  readonly createdAt: string
  readonly updatedAt: string
}

export interface FullTask {
  readonly id: number
  readonly number: number
  readonly index: number
  readonly title: string
  description: string
  readonly stage: Stage
  assignees: User[]
  readonly createdAt: string
  readonly updatedAt: string
}
