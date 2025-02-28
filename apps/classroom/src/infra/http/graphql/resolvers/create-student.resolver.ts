import { CreateStudentUseCase } from '@/domain/application/use-cases/create-student'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { CreateStudentInput } from '../dto/input/create-student.input'
import { StudentModel } from '../dto/models/student.model'

@Resolver()
export class CreateStudentResolver {
  constructor(private createStudentUseCase: CreateStudentUseCase) {}

  @Mutation(() => StudentModel)
  async createStudent(
    @Args('data') data: CreateStudentInput
  ): Promise<StudentModel> {
    const result = await this.createStudentUseCase.execute(data)

    if (result.isLeft()) {
      throw new GraphQLError('Student with same auth user id already exists')
    }

    const { student } = result.value

    return {
      id: student.id.toString(),
      authUserId: student.authUserId,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt ?? undefined,
    }
  }
}
