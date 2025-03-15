import { PurchasesRepository } from '@/domain/application/repositories/purchases-repository'
import { Purchase } from '@/domain/enterprise/entities/purchase'

export class InMemoryPurchasesRepository implements PurchasesRepository {
  public items: Purchase[] = []

  async create(purchase: Purchase) {
    this.items.push(purchase)
  }
}
