import { AuthenticateUserUseCase } from '@/domain/application/use-cases/authenticate-user'
import { RegisterUserUseCase } from '@/domain/application/use-cases/register-user'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateUserResolver } from './graphql/resolvers/authenticate-user.resolver'
import { RegisterUserResolver } from './graphql/resolvers/register-user.resolver'

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
  ],
  providers: [
    RegisterUserResolver,
    RegisterUserUseCase,
    AuthenticateUserResolver,
    AuthenticateUserUseCase,
  ],
})
export class HttpModule {}
