import { Either, right } from '@/core/either'
import { Enrollment } from '@/domain/enterprise/entities/enrollment'
import { Injectable } from '@nestjs/common'
import { EnrollmentsRepository } from '../repositories/enrollments-repository'

interface CreateEnrollmentUseCaseRequest {
  studentId: string
  courseId: string
}

type CreateEnrollmentUseCaseResponse = Either<
  null,
  {
    enrollment: Enrollment
  }
>

@Injectable()
export class CreateEnrollmentUseCase {
  constructor(private enrollmentsRepository: EnrollmentsRepository) {}

  async execute({
    studentId,
    courseId,
  }: CreateEnrollmentUseCaseRequest): Promise<CreateEnrollmentUseCaseResponse> {
    const enrollment = Enrollment.create({
      studentId,
      courseId,
    })

    await this.enrollmentsRepository.create(enrollment)

    return right({ enrollment })
  }
}
