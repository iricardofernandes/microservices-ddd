import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { DrizzleService } from './drizzle/drizzle.service'
import { DrizzleUsersRepository } from './drizzle/repositories/drizzle-users-repository'

@Module({
  imports: [EnvModule],
  providers: [
    DrizzleService,
    {
      provide: UsersRepository,
      useClass: DrizzleUsersRepository,
    },
  ],
  exports: [DrizzleService, UsersRepository],
})
export class DatabaseModule {}
