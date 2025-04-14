import { UniqueEntityID } from '@/core/unique-entity-id'
import {
  Enrollment,
  EnrollmentProps,
} from '@/domain/enterprise/entities/enrollment'
import { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { enrollments } from '@/infra/database/drizzle/schema'
import { Injectable } from '@nestjs/common'

export function makeEnrollment(
  override: Partial<EnrollmentProps> = {},
  id?: UniqueEntityID
) {
  const enrollment = Enrollment.create(
    {
      studentId: new UniqueEntityID().toString(),
      courseId: new UniqueEntityID().toString(),
      ...override,
    },
    id
  )

  return enrollment
}

@Injectable()
export class EnrollmentFactory {
  constructor(private drizzle: DrizzleService) {}

  async makeDrizzleEnrollment(
    data: Partial<EnrollmentProps> = {}
  ): Promise<Enrollment> {
    const enrollment = makeEnrollment(data)

    await this.drizzle.db.insert(enrollments).values({
      id: enrollment.id.toString(),
      studentId: enrollment.studentId,
      courseId: enrollment.courseId,
      createdAt: new Date(),
    })

    return enrollment
  }
}
