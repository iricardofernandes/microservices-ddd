import { UniqueEntityID } from '@/core/unique-entity-id'
import { Course, CourseProps } from '@/domain/enterprise/entities/course'
import { Slug } from '@/domain/enterprise/entities/value-objects/slug'

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
