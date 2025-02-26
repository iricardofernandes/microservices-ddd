import { Entity } from '@/core/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Slug } from './value-objects/slug'

export interface CourseProps {
  title: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date | null
}

export class Course extends Entity<CourseProps> {
  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  get slug() {
    return this.props.slug
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

  static create(
    props: Optional<CourseProps, 'slug' | 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const course = new Course(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return course
  }
}
