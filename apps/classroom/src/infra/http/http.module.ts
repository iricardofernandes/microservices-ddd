import { CreateCourseUseCase } from '@/domain/application/use-cases/create-course'
import { CreateStudentUseCase } from '@/domain/application/use-cases/create-student'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { CreateCourseResolver } from './graphql/resolvers/create-course.resolver'
import { CreateStudentResolver } from './graphql/resolvers/create-student.resolver'
import { HealthCheckResolver } from './graphql/resolvers/test.resolver'

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
    HealthCheckResolver,
    CreateStudentResolver,
    CreateStudentUseCase,
    CreateCourseResolver,
    CreateCourseUseCase,
  ],
})
export class HttpModule {}
