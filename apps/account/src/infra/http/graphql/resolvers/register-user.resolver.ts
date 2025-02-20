import { RegisterUserUseCase } from '@/domain/application/use-cases/register-user'
import { Public } from '@/infra/auth/public'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { RegisterUserInput } from '../dto/input/register-user.input'
import { UserModel } from '../dto/models/user.model'

@Resolver()
@Public()
export class RegisterUserResolver {
  constructor(private registerUserRepository: RegisterUserUseCase) {}

  @Mutation(() => UserModel)
  async registerUser(
    @Args('data') data: RegisterUserInput
  ): Promise<UserModel> {
    const result = await this.registerUserRepository.execute(data)

    if (result.isLeft()) {
      throw new GraphQLError(`User with email ${data.email} already exists`)
    }

    const { user } = result.value

    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? undefined,
    }
  }
}
