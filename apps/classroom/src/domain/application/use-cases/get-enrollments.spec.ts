import { InMemoryEnrollmentsRepository } from 'test/repositories/in-memory-enrollments-repository'
import { GetEnrollmentsUseCase } from './get-enrollments'

let inMemoryEnrollmentsRepository: InMemoryEnrollmentsRepository
let sut: GetEnrollmentsUseCase

describe('Get Enrollments', () => {
  beforeEach(() => {
    inMemoryEnrollmentsRepository = new InMemoryEnrollmentsRepository()
    sut = new GetEnrollmentsUseCase(inMemoryEnrollmentsRepository)
  })

  it('should be able to get a enrollment by slug', async () => {
    const student = makeStudent({ name: 'John Doe' })

    inMemoryStudentsRepository.items.push(student)

    const newEnrollment = makeEnrollment({
      authorId: student.id,
      slug: Slug.create('example-enrollment'),
    })

    await inMemoryEnrollmentsRepository.create(newEnrollment)

    const attachment = makeAttachment({
      title: 'Some attachment',
    })

    inMemoryAttachmentsRepository.items.push(attachment)

    inMemoryEnrollmentAttachmentsRepository.items.push(
      makeEnrollmentAttachment({
        attachmentId: attachment.id,
        enrollmentId: newEnrollment.id,
      })
    )

    const result = await sut.execute({
      slug: 'example-enrollment',
    })

    expect(result.value).toMatchObject({
      enrollment: expect.objectContaining({
        title: newEnrollment.title,
        author: 'John Doe',
        attachments: [
          expect.objectContaining({
            title: 'Some attachment',
          }),
        ],
      }),
    })
  })
})
