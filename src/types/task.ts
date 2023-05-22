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
