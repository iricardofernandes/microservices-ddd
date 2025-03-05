import { Entity } from '@/core/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface CustomerProps {
  authUserId: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Customer extends Entity<CustomerProps> {
  get authUserId() {
    return this.props.authUserId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<CustomerProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const customer = new Customer(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id
    )

    return customer
  }
}
