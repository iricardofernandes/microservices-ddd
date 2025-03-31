import { UniqueEntityID } from '@/core/unique-entity-id'
import { Purchase, PurchaseProps } from '@/domain/enterprise/entities/purchase'
import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { purchases } from '@/infra/database/drizzle/schema'
import { Injectable } from '@nestjs/common'

export function makePurchase(
  override: Partial<PurchaseProps> = {},
  id?: UniqueEntityID
) {
  const purchase = Purchase.create(
    {
      customerId: new UniqueEntityID().toString(),
      productId: new UniqueEntityID().toString(),
      status: 'APPROVED',
      ...override,
    },
    id
  )

  return purchase
}

@Injectable()
export class PurchaseFactory {
  constructor(private drizzle: DrizzleService) {}

  async makeDrizzlePurchase(
    data: Partial<PurchaseProps> = {}
  ): Promise<Purchase> {
    const purchase = makePurchase(data)

    await this.drizzle.db.insert(purchases).values({
      id: purchase.id.toString(),
      customerId: purchase.customerId,
      productId: purchase.productId,
      status: purchase.status,
      createdAt: new Date(),
    })

    return purchase
  }
}
