import { Enrollment } from '@/domain/enterprise/entities/enrollment'

export abstract class EnrollmentsRepository {
  abstract getEnrollmentsByStudentId(studentId: string): Promise<Enrollment[]>
  abstract create(enrollment: Enrollment): Promise<void>
}
