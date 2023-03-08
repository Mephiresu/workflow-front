import { Instance } from './instance'

export interface CreateInstanceResponse {
  readonly instance: Instance
  readonly administrator: {
    readonly username: string
    readonly fullName: string
    readonly email: string
    readonly password: string
    readonly createdAt: string
    readonly updatedAt: string
  }
}
