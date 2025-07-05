import { makeEnrollment } from 'test/factories/make-enrollment'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryEnrollmentsRepository } from 'test/repositories/in-memory-enrollments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { GetEnrollmentsUseCase } from './get-enrollments'

let inMemoryEnrollmentsRepository: InMemoryEnrollmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: GetEnrollmentsUseCase

describe('Get Enrollments', () => {
  beforeEach(() => {
    inMemoryEnrollmentsRepository = new InMemoryEnrollmentsRepository()
    sut = new GetEnrollmentsUseCase(inMemoryEnrollmentsRepository)
  })

  it('should be able to get a enrollment by student id', async () => {
    const student = makeStudent()

    inMemoryStudentsRepository.items.push(student)

    const newEnrollment = makeEnrollment()

    await inMemoryEnrollmentsRepository.create(newEnrollment)

    const result = await sut.execute({
      studentId: student.id.toString(),
    })

  // expect(result.isRight()).toBe(true)
  })
})
