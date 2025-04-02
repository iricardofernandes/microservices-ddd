import { Enrollment } from '@/domain/enterprise/entities/enrollment'

export abstract class EnrollmentsRepository {
  abstract findByAuthUserID(authUserId: string): Promise<Enrollment | null>
  abstract create(enrollment: Enrollment): Promise<void>
}
