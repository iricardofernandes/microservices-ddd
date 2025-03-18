import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ProductModel {
  @Field(() => ID)
  id: string

  @Field()
  customerId: string

  @Field()
  productId: string

  @Field()
  status: string

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
