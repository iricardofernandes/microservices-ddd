import { UniqueEntityID } from '@/core/unique-entity-id'
import { Purchase } from '@/domain/enterprise/entities/purchase'
import { purchases } from '../schema'

export class DrizzlePurchaseMapper {
  static toDomain(raw: typeof purchases.$inferSelect): Purchase {
    return Purchase.create(
      {
        customerId: raw.customerId,
        productId: raw.productId,
        status: raw.status,
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPersistence(purchase: Purchase) {
    return {
      id: purchase.id.toString(),
      customerId: purchase.customerId,
      productId: purchase.productId,
      status: purchase.status,
      createdAt: purchase.createdAt,
      updatedAt: purchase.updatedAt ?? undefined,
    }
  }
}
