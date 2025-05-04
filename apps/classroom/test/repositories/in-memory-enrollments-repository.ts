import { EnrollmentsRepository } from '@/domain/application/repositories/enrollments-repository'
import { Enrollment } from '@/domain/enterprise/entities/enrollment'

export class InMemoryEnrollmentsRepository implements EnrollmentsRepository {
  public items: Enrollment[] = []

  async getEnrollmentsByStudentId(studentId: string) {
    const enrollments = this.items.filter(
      item => item.studentId.toString() === studentId
    )

    return enrollments
  }

  async create(enrollment: Enrollment) {
    this.items.push(enrollment)
  }
}
