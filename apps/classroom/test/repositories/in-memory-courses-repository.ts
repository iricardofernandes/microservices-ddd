import { CoursesRepository } from '@/domain/application/repositories/courses-repository'
import { Course } from '@/domain/enterprise/entities/course'

export class InMemoryCoursesRepository implements CoursesRepository {
  public items: Course[] = []

  async findBySlug(slug: string) {
    const course = this.items.find(item => item.slug.value === slug)

    if (!course) {
      return null
    }

    return course
  }

  async create(course: Course) {
    this.items.push(course)
  }
}
