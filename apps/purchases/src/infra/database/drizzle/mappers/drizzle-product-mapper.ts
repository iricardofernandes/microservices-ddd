import { UniqueEntityID } from '@/core/unique-entity-id'
import { Product } from '@/domain/enterprise/entities/product'
import { Slug } from '@/domain/enterprise/entities/value-objects/slug'
import { products } from '../schema'

export class DrizzleProductMapper {
  static toDomain(raw: typeof products.$inferSelect): Product {
    return Product.create(
      {
        title: raw.title,
        slug: Slug.create(raw.slug),
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPersistence(product: Product) {
    return {
      id: product.id.toString(),
      title: product.title,
      slug: product.slug.value,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt ?? undefined,
    }
  }
}
