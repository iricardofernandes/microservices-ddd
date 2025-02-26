import { UniqueEntityID } from '@/core/unique-entity-id'
import { Course } from '@/domain/enterprise/entities/course'
import { Slug } from '@/domain/enterprise/entities/value-objects/slug'
import { courses } from '../schema'

export class DrizzleCourseMapper {
  static toDomain(raw: typeof courses.$inferSelect): Course {
    return Course.create(
      {
        title: raw.title,
        slug: Slug.create(raw.slug),
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPersistence(course: Course) {
    return {
      id: course.id.toString(),
      title: course.title,
      slug: course.slug.value,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt ?? undefined,
    }
  }
}
