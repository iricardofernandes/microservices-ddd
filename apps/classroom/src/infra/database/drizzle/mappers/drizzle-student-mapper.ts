import { UniqueEntityID } from '@/core/unique-entity-id'
import { Student } from '@/domain/enterprise/entities/student'
import { students } from '../schema'

export class DrizzleStudentMapper {
  static toDomain(raw: typeof students.$inferSelect): Student {
    return Student.create(
      {
        authUserId: raw.authUserId,
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPersistence(student: Student) {
    return {
      id: student.id.toString(),
      authUserId: student.authUserId,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt ?? undefined,
    }
  }
}
