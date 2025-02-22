import { ProductsRepository } from '@/domain/application/repositories/products-repository'
import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { DrizzleService } from './drizzle/drizzle.service'
import { DrizzleProductsRepository } from './drizzle/repositories/drizzle-products-repository'

@Module({
  imports: [EnvModule],
  providers: [
    DrizzleService,
    {
      provide: ProductsRepository,
      useClass: DrizzleProductsRepository,
    },
  ],
  exports: [DrizzleService, ProductsRepository],
})
export class DatabaseModule {}
