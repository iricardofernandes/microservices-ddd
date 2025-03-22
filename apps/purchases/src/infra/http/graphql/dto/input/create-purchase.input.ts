import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreatePurchaseInput {
  @Field()
  customerId: string

  @Field()
  productId: string

  @Field()
  status: 'PENDING' | 'APPROVED' | 'FAILED'
}
