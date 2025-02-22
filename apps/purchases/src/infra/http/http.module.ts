import { CreateProductUseCase } from '@/domain/application/use-cases/create-product'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { CreateProductResolver } from './graphql/resolvers/create-product.resolver'
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
  providers: [HealthCheckResolver, CreateProductResolver, CreateProductUseCase],
})
export class HttpModule {}
