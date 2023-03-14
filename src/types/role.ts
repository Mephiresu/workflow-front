export interface Role {
  readonly name: string
  readonly description: string
  readonly isGlobal: boolean
  readonly isImmutable: boolean
  readonly createdAt: string
  readonly updatedAt: string
}
