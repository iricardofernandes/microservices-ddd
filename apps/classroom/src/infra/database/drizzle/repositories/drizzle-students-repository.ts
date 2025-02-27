import { StudentsRepository } from '@/domain/application/repositories/students-repository'
import { Student } from '@/domain/enterprise/entities/student'
import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DrizzleService } from '../drizzle.service'
import { DrizzleStudentMapper } from '../mappers/drizzle-student-mapper'
import { students } from '../schema'

@Injectable()
export class DrizzleStudentsRepository implements StudentsRepository {
  constructor(private drizzle: DrizzleService) {}

  async findByAuthUserID(authUserId: string): Promise<Student | null> {
    const result = await this.drizzle.db
      .select()
      .from(students)
      .where(eq(students.authUserId, authUserId))
      .limit(1)

    if (result.length === 0) {
      return null
    }

    return DrizzleStudentMapper.toDomain(result[0])
  }

  async create(student: Student): Promise<void> {
    const data = DrizzleStudentMapper.toPersistence(student)

    await this.drizzle.db.insert(students).values(data)
  }
}
