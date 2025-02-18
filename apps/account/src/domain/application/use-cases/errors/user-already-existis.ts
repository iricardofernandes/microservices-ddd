import { UseCaseError } from '@ms/core'

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User "${identifier}" already exists.`)
  }
}
