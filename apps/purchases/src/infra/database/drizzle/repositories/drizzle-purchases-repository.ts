import { PurchasesRepository } from '@/domain/application/repositories/purchases-repository'
import { Purchase } from '@/domain/enterprise/entities/purchase'
import { Injectable } from '@nestjs/common'
import { DrizzleService } from '../drizzle.service'
import { DrizzlePurchaseMapper } from '../mappers/drizzle-purchase-mapper'
import { purchases } from '../schema'

@Injectable()
export class DrizzlePurchasesRepository implements PurchasesRepository {
  constructor(private drizzle: DrizzleService) {}

  async create(purchase: Purchase): Promise<void> {
    const data = DrizzlePurchaseMapper.toPersistence(purchase)

    await this.drizzle.db.insert(purchases).values(data)
  }
}
