import { CustomersRepository } from '@/domain/application/repositories/customers-repository'
import { ProductsRepository } from '@/domain/application/repositories/products-repository'
import { PurchasesRepository } from '@/domain/application/repositories/purchases-repository'
import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { DrizzleService } from './drizzle/drizzle.service'
import { DrizzleProductsRepository } from './drizzle/repositories/drizzle-products-repository'
import { DrizzlePurchasesRepository } from './drizzle/repositories/drizzle-purchases-repository'
import { DrizzleCustomersRepository } from './drizzle/repositories/drizzle.customers.repository'

@Module({
  imports: [EnvModule],
  providers: [
    DrizzleService,
    {
      provide: ProductsRepository,
      useClass: DrizzleProductsRepository,
    },
    {
      provide: CustomersRepository,
      useClass: DrizzleCustomersRepository,
    },
    {
      provide: PurchasesRepository,
      useClass: DrizzlePurchasesRepository,
    },
  ],
  exports: [DrizzleService, ProductsRepository, CustomersRepository],
})
export class DatabaseModule {}
