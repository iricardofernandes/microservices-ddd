import { UseCaseError } from '@ms/core'

export class CustomerAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Customer "${identifier}" already exists.`)
  }
}
