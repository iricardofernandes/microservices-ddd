import { AuthenticateUserUseCase } from '@/domain/application/use-cases/authenticate-user'
import { Public } from '@/infra/auth/public'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { AuthenticateUserInput } from '../dto/input/authenticate-user.input'
import { AuthPayload } from '../dto/models/auth-payload.model'

@Resolver()
@Public()
export class AuthenticateUserResolver {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Mutation(() => AuthPayload)
  async authenticateUser(@Args('data') data: AuthenticateUserInput) {
    const result = await this.authenticateUserUseCase.execute(data)

    if (result.isLeft()) {
      throw new GraphQLError('Invalid credentials')
    }

    const { accessToken } = result.value

    return {
      accessToken,
    }
  }
}
