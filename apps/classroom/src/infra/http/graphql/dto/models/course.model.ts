import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CourseModel {
  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field()
  slug: string

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
