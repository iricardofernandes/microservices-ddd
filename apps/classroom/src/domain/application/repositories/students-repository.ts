import { Student } from '@/domain/enterprise/entities/student'

export abstract class StudentsRepository {
  abstract findByAuthUserID(authUserId: string): Promise<Student | null>
  abstract create(student: Student): Promise<void>
}
