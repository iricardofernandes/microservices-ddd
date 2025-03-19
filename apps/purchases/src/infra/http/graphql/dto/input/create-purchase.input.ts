import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreatePurchaseInput {
  @Field()
  customerId: string
  purchaseId: string
  status: string
}
