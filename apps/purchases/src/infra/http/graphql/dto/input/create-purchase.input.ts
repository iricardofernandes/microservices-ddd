import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateProductInput {
  @Field()
  customerId: string
  productId: string
  status: string
}
