export class ApiError extends Error {
  constructor(
    message: string,
    public readonly code: number,
    public readonly timestamp: string
  ) {
    super(message)
  }
}
