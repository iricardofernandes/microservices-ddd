import { EnrollmentsRepository } from '@/domain/application/repositories/enrollments-repository'
import { Enrollment } from '@/domain/enterprise/entities/enrollment'
import { Injectable } from '@nestjs/common'
import { DrizzleService } from '../drizzle.service'
import { DrizzleEnrollmentMapper } from '../mappers/drizzle-enrollment-mapper'
import { enrollments } from '../schema'

@Injectable()
export class DrizzleEnrollmentsRepository implements EnrollmentsRepository {
  constructor(private drizzle: DrizzleService) {}

  async create(enrollment: Enrollment): Promise<void> {
    const data = DrizzleEnrollmentMapper.toPersistence(enrollment)

    await this.drizzle.db.insert(enrollments).values(data)
  }
}
