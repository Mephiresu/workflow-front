import { Stage } from './stage'

export interface BoardFull {
  readonly id: number
  readonly name: string
  readonly createdAt: string
  readonly updatedAt: string
  readonly stages: Stage[]
}
