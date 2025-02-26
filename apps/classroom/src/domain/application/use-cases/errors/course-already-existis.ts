import { UseCaseError } from '@ms/core'

export class CourseAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Course "${identifier}" already exists.`)
  }
}
