import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ProductModel {
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
