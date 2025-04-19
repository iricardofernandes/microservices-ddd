import { CreateCustomerUseCase } from '@/domain/application/use-cases/create-customer'
import { CreateProductUseCase } from '@/domain/application/use-cases/create-product'
import { CreatePurchaseUseCase } from '@/domain/application/use-cases/create-purchase'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { CreateCustomerResolver } from './graphql/resolvers/create-customer.resolver'
import { CreateProductResolver } from './graphql/resolvers/create-product.resolver'
import { CreatePurchaseResolver } from './graphql/resolvers/create-purchase.resolver'

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
    CreateCustomerResolver,
    CreateCustomerUseCase,
    CreateProductResolver,
    CreateProductUseCase,
    CreatePurchaseResolver,
    CreatePurchaseUseCase,
  ],
})
export class HttpModule {}
