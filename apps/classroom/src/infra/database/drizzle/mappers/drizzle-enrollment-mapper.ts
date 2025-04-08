import { UniqueEntityID } from '@/core/unique-entity-id'
import { Enrollment } from '@/domain/enterprise/entities/enrollment'
import { enrollments } from '../schema'

export class DrizzleEnrollmentMapper {
  static toDomain(raw: typeof enrollments.$inferSelect): Enrollment {
    return Enrollment.create(
      {
        studentId: raw.studentId,
        courseId: raw.courseId,
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPersistence(enrollment: Enrollment) {
    return {
      id: enrollment.id.toString(),
      studentId: enrollment.studentId,
      courseId: enrollment.courseId,
      createdAt: enrollment.createdAt,
      updatedAt: enrollment.updatedAt ?? undefined,
    }
  }
}
