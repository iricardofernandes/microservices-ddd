import { UniqueEntityID } from '@ms/core'
import { InMemoryEnrollmentsRepository } from 'test/repositories/in-memory-enrollments-repository'
import { CreateEnrollmentUseCase } from './create-enrollment'

let inMemoryEnrollmentsRepository: InMemoryEnrollmentsRepository
let sut: CreateEnrollmentUseCase

describe('Create Enrollment', () => {
  beforeEach(() => {
    inMemoryEnrollmentsRepository = new InMemoryEnrollmentsRepository()

    sut = new CreateEnrollmentUseCase(inMemoryEnrollmentsRepository)
  })

  const studentId = new UniqueEntityID().toString()
  const courseId = new UniqueEntityID().toString()

  it('should be able to create a enrollment', async () => {
    const result = await sut.execute({
      studentId,
      courseId,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      enrollment: inMemoryEnrollmentsRepository.items[0],
    })
    expect(inMemoryEnrollmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          studentId,
          courseId,
        }),
      ])
    )
  })
})
