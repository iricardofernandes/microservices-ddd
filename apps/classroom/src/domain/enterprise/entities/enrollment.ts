import { Entity } from '@/core/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface EnrollmentProps {
  studentId: string
  courseId: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Enrollment extends Entity<EnrollmentProps> {
  get studentId() {
    return this.props.studentId
  }

  get courseId() {
    return this.props.courseId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<EnrollmentProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const enrollment = new Enrollment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return enrollment
  }
}
