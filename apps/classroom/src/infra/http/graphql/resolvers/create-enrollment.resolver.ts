import { CreateEnrollmentUseCase } from '@/domain/application/use-cases/create-enrollment'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { CreateEnrollmentInput } from '../dto/input/create-enrollment.input'
import { EnrollmentModel } from '../dto/models/enrollment.model'

@Resolver()
export class CreateEnrollmentResolver {
  constructor(private createEnrollmentUseCase: CreateEnrollmentUseCase) {}

  @Mutation(() => EnrollmentModel)
  async createEnrollment(
    @Args('data') data: CreateEnrollmentInput
  ): Promise<EnrollmentModel> {
    const result = await this.createEnrollmentUseCase.execute(data)

    if (result.isLeft()) {
      throw new GraphQLError('Enrollment with same auth user id already exists')
    }

    const { enrollment } = result.value

    return {
      id: enrollment.id.toString(),
      studentId: enrollment.studentId,
      courseId: enrollment.studentId,
      createdAt: enrollment.createdAt,
      updatedAt: enrollment.updatedAt ?? undefined,
    }
  }
}
