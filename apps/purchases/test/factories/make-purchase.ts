import { UniqueEntityID } from '@/core/unique-entity-id'
import { Purchase, PurchaseProps } from '@/domain/enterprise/entities/purchase'

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
