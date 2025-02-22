import { UseCaseError } from '@ms/core'

export class ProductAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Product "${identifier}" already exists.`)
  }
}
