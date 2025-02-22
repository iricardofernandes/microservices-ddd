import { ProductsRepository } from '@/domain/application/repositories/products-repository'
import { Product } from '@/domain/enterprise/entities/product'
import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DrizzleService } from '../drizzle.service'
import { DrizzleProductMapper } from '../mappers/drizzle-product-mapper'
import { products } from '../schema'

@Injectable()
export class DrizzleProductsRepository implements ProductsRepository {
  constructor(private drizzle: DrizzleService) {}

  async findBySlug(slug: string): Promise<Product | null> {
    const result = await this.drizzle.db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1)

    if (result.length === 0) {
      return null
    }

    return DrizzleProductMapper.toDomain(result[0])
  }

  async create(product: Product): Promise<void> {
    const data = DrizzleProductMapper.toPersistence(product)

    await this.drizzle.db.insert(products).values(data)
  }
}
