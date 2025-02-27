import { UniqueEntityID } from '@/core/unique-entity-id'
import { Student, StudentProps } from '@/domain/enterprise/entities/student'
import { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { students } from '@/infra/database/drizzle/schema'
import { Injectable } from '@nestjs/common'

export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityID
) {
  const student = Student.create(
    {
      authUserId: new UniqueEntityID().toString(),
      ...override,
    },
    id
  )

  return student
}

@Injectable()
export class StudentFactory {
  constructor(private drizzle: DrizzleService) {}

  async makeDrizzleStudent(data: Partial<StudentProps> = {}): Promise<Student> {
    const student = makeStudent(data)

    await this.drizzle.db.insert(students).values({
      id: student.id.toString(),
      authUserId: student.authUserId,
      createdAt: new Date(),
    })

    return student
  }
}
