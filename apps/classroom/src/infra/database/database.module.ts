import { CoursesRepository } from '@/domain/application/repositories/courses-repository'
import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { DrizzleService } from './drizzle/drizzle.service'
import { DrizzleCoursesRepository } from './drizzle/repositories/drizzle-courses-repository'

@Module({
  imports: [EnvModule],
  providers: [
    DrizzleService,
    {
      provide: CoursesRepository,
      useClass: DrizzleCoursesRepository,
    },
  ],
  exports: [DrizzleService, CoursesRepository],
})
export class DatabaseModule {}
