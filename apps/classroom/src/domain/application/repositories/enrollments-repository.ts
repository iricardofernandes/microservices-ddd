import { Enrollment } from '@/domain/enterprise/entities/enrollment'

export abstract class EnrollmentsRepository {
  abstract create(enrollment: Enrollment): Promise<void>
}
