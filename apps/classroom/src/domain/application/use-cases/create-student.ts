import { Either, left, right } from '@/core/either'
import { Student } from '@/domain/enterprise/entities/student'
import { Injectable } from '@nestjs/common'
import { StudentsRepository } from '../repositories/students-repository'
import { StudentAlreadyExistsError } from './errors/student-already-existis'

interface CreateStudentUseCaseRequest {
  authUserId: string
}

type CreateStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>

@Injectable()
export class CreateStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute({
    authUserId,
  }: CreateStudentUseCaseRequest): Promise<CreateStudentUseCaseResponse> {
    const studentWithAuthUserId =
      await this.studentsRepository.findByAuthUserID(authUserId)

    if (studentWithAuthUserId) {
      return left(new StudentAlreadyExistsError(authUserId))
    }

    const student = Student.create({
      authUserId,
    })

    await this.studentsRepository.create(student)

    return right({ student })
  }
}
