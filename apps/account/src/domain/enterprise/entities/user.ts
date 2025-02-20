import { Entity } from '@/core/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface UserProps {
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt?: Date | null
}

export class User extends Entity<UserProps> {
  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get name() {
    return this.props.name
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set password(password: string) {
    this.props.password = password
    this.touch()
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID) {
    const user = new User(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id
    )

    return user
  }
}
