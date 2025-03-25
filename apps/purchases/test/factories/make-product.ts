import { UniqueEntityID } from '@/core/unique-entity-id'
import { Product, ProductProps } from '@/domain/enterprise/entities/product'
import { Slug } from '@/domain/enterprise/entities/value-objects/slug'

export function makeProduct(
  override: Partial<ProductProps> = {},
  id?: UniqueEntityID
) {
  const product = Product.create(
    {
      title: 'test',
      slug: new Slug('test'),
      ...override,
    },
    id
  )

  return product
}
