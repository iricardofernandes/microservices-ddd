import { CoursesRepository } from '@/domain/application/repositories/courses-repository'
import { Course } from '@/domain/enterprise/entities/course'
import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DrizzleService } from '../drizzle.service'
import { DrizzleCourseMapper } from '../mappers/drizzle-course-mapper'
import { courses } from '../schema'

@Injectable()
export class DrizzleCoursesRepository implements CoursesRepository {
  constructor(private drizzle: DrizzleService) {}

  async findBySlug(slug: string): Promise<Course | null> {
    const result = await this.drizzle.db
      .select()
      .from(courses)
      .where(eq(courses.slug, slug))
      .limit(1)

    if (result.length === 0) {
      return null
    }

    return DrizzleCourseMapper.toDomain(result[0])
  }

  async create(course: Course): Promise<void> {
    const data = DrizzleCourseMapper.toPersistence(course)

    await this.drizzle.db.insert(courses).values(data)
  }
}
