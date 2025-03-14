import { Purchase } from '@/domain/enterprise/entities/purchase'

export abstract class PurchasesRepository {
  abstract create(purchase: Purchase): Promise<void>
}
