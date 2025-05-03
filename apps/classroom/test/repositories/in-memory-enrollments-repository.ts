import { EnrollmentsRepository } from '@/domain/application/repositories/enrollments-repository'
import { Enrollment } from '@/domain/enterprise/entities/enrollment'

export class InMemoryEnrollmentsRepository implements EnrollmentsRepository {
  public items: Enrollment[] = []

  async getEnrollmentsByStudentId(studentId: string): Promise<Enrollment[]> {
    throw new Error('Method not implemented.')
  }

  async create(enrollment: Enrollment) {
    this.items.push(enrollment)
  }
}
