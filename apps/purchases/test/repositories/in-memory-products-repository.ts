import { ProductsRepository } from '@/domain/application/repositories/products-repository'
import type { Product } from '@/domain/enterprise/entities/product'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async findBySlug(slug: string) {
    const product = this.items.find(item => item.slug.value === slug)

    if (!product) {
      return null
    }

    return product
  }

  async create(product: Product) {
    this.items.push(product)
  }
}
