import { InMemoryCoursesRepository } from 'test/repositories/in-memory-courses-repository'
import { CreateCourseUseCase } from './create-course'

let inMemoryCoursesRepository: InMemoryCoursesRepository
let sut: CreateCourseUseCase

describe('Create Course', () => {
  beforeEach(() => {
    inMemoryCoursesRepository = new InMemoryCoursesRepository()

    sut = new CreateCourseUseCase(inMemoryCoursesRepository)
  })

  it('should be able to create a course', async () => {
    const result = await sut.execute({
      title: 'Nodejs Course',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      course: inMemoryCoursesRepository.items[0],
    })
    expect(inMemoryCoursesRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Nodejs Course',
          slug: expect.objectContaining({
            value: 'nodejs-course',
          }),
        }),
      ])
    )
  })
})
