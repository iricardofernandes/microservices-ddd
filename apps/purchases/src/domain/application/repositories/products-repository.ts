import { Product } from '@/domain/enterprise/entities/product'

export abstract class ProductsRepository {
  abstract findBySlug(slug: string): Promise<Product | null>
  abstract create(product: Product): Promise<void>
}
