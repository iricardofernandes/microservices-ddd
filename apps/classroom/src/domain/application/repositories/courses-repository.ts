import { Course } from '@/domain/enterprise/entities/course'

export abstract class CoursesRepository {
  abstract findBySlug(slug: string): Promise<Course | null>
  abstract create(course: Course): Promise<void>
}
