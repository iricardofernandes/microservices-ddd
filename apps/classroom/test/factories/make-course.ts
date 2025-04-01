import { UniqueEntityID } from '@/core/unique-entity-id'
import { Course, CourseProps } from '@/domain/enterprise/entities/course'
import { Slug } from '@/domain/enterprise/entities/value-objects/slug'
import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { courses } from '@/infra/database/drizzle/schema'
import { Injectable } from '@nestjs/common'

export function makeCourse(
  override: Partial<CourseProps> = {},
  id?: UniqueEntityID
) {
  const course = Course.create(
    {
      title: 'test',
      slug: Slug.createFromText('test'),
      ...override,
    },
    id
  )

  return course
}

@Injectable()
export class CourseFactory {
  constructor(private drizzle: DrizzleService) {}

  async makeDrizzleCourse(data: Partial<CourseProps> = {}): Promise<Course> {
    const course = makeCourse(data)

    await this.drizzle.db.insert(courses).values({
      id: course.id.toString(),
      title: course.title,
      slug: course.slug.toString(),
      createdAt: new Date(),
    })

    return course
  }
}
