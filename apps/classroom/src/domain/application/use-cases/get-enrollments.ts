import { Either, right } from '@/core/either'
import { Enrollment } from '@/domain/enterprise/entities/enrollment'
import { Injectable } from '@nestjs/common'
import { EnrollmentsRepository } from '../repositories/enrollments-repository'

interface GetEnrollmentsUseCaseRequest {
  studentId: string
}

type GetEnrollmentsUseCaseResponse = Either<
  null,
  {
    enrollments: Enrollment[]
  }
>

@Injectable()
export class GetEnrollmentsUseCase {
  constructor(private enrollmentsRepository: EnrollmentsRepository) {}

  async execute({
    studentId,
  }: GetEnrollmentsUseCaseRequest): Promise<GetEnrollmentsUseCaseResponse> {
    const enrollments =
      await this.enrollmentsRepository.getEnrollmentsByStudentId(studentId)

    return right({ enrollments })
  }
}
