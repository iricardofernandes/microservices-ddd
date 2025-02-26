import { CreateCourseUseCase } from '@/domain/application/use-cases/create-course'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { CreateCourseInput } from '../dto/input/create-course.input'
import { CourseModel } from '../dto/models/course.model'

@Resolver()
export class CreateCourseResolver {
  constructor(private createCourseUseCase: CreateCourseUseCase) {}

  @Mutation(() => CourseModel)
  async createCourse(
    @Args('data') data: CreateCourseInput
  ): Promise<CourseModel> {
    const result = await this.createCourseUseCase.execute(data)

    if (result.isLeft()) {
      throw new GraphQLError('Course with same slug already exists')
    }

    const { course } = result.value

    return {
      id: course.id.toString(),
      title: course.title,
      slug: course.slug.toString(),
      createdAt: course.createdAt,
      updatedAt: course.updatedAt ?? undefined,
    }
  }
}
