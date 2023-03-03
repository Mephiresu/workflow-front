import { Me } from './me'

export interface TokenResponse {
  readonly token: string
  readonly me: Me
}
