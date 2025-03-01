import { UniqueEntityID } from '@ms/core'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { CreateStudentUseCase } from './create-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: CreateStudentUseCase

describe('Create Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()

    sut = new CreateStudentUseCase(inMemoryStudentsRepository)
  })

  const authUserId = new UniqueEntityID().toString()

  it('should be able to create a student', async () => {
    const result = await sut.execute({
      authUserId,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0],
    })
    expect(inMemoryStudentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          authUserId: authUserId,
        }),
      ])
    )
  })
})
