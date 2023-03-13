export interface Permission {
  name: string
  description: string
  isGlobal: boolean
  group: string
  operation: string
  enabled: boolean
}
