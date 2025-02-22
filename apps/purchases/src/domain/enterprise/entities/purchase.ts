import { Entity } from '@/core/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface PurchaseProps {
  customerId: UniqueEntityID
  productId: UniqueEntityID
  status: 'PENDING' | 'APPROVED' | 'FAILED'
  createdAt: Date
  updatedAt?: Date | null
}

export class Purchase extends Entity<PurchaseProps> {
  get customerId() {
    return this.props.customerId
  }

  get productId() {
    return this.props.productId
  }

  get status() {
    return this.props.status
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<PurchaseProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const purchase = new Purchase(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id
    )

    return purchase
  }
}
