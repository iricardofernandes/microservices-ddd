import { Either, left, right } from '@/core/either'
import { Course } from '@/domain/enterprise/entities/course'
import { Slug } from '@/domain/enterprise/entities/value-objects/slug'
import { Injectable } from '@nestjs/common'
import { CoursesRepository } from '../repositories/courses-repository'
import { CourseAlreadyExistsError } from './errors/course-already-existis'

interface CreateCourseUseCaseRequest {
  title: string
}

type CreateCourseUseCaseResponse = Either<
  CourseAlreadyExistsError,
  {
    course: Course
  }
>

@Injectable()
export class CreateCourseUseCase {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute({
    title,
  }: CreateCourseUseCaseRequest): Promise<CreateCourseUseCaseResponse> {
    const slug = Slug.createFromText(title).toString()
    const courseWithSameSlug = await this.coursesRepository.findBySlug(slug)

    if (courseWithSameSlug) {
      return left(new CourseAlreadyExistsError(slug))
    }

    const course = Course.create({
      title,
    })

    await this.coursesRepository.create(course)

    return right({ course })
  }
}
