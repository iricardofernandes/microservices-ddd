import { Entity } from '@/core/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface StudentProps {
  authUserId: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Student extends Entity<StudentProps> {
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
    props: Optional<StudentProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const student = new Student(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return student
  }
}
