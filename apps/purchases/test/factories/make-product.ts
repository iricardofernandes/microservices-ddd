import { UniqueEntityID } from '@/core/unique-entity-id'
import { Product, ProductProps } from '@/domain/enterprise/entities/product'
import { Slug } from '@/domain/enterprise/entities/value-objects/slug'
import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { products } from '@/infra/database/drizzle/schema'
import { Injectable } from '@nestjs/common'

export function makeProduct(
  override: Partial<ProductProps> = {},
  id?: UniqueEntityID
) {
  const product = Product.create(
    {
      title: 'test',
      slug: Slug.createFromText('test'),
      ...override,
    },
    id
  )

  return product
}

@Injectable()
export class ProductFactory {
  constructor(private drizzle: DrizzleService) {}

  async makeDrizzleProduct(data: Partial<ProductProps> = {}): Promise<Product> {
    const product = makeProduct(data)

    await this.drizzle.db.insert(products).values({
      id: product.id.toString(),
      title: product.title,
      slug: product.slug.toString(),
      createdAt: new Date(),
    })

    return product
  }
}
