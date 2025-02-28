import { CoursesRepository } from '@/domain/application/repositories/courses-repository'
import { StudentsRepository } from '@/domain/application/repositories/students-repository'
import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { DrizzleService } from './drizzle/drizzle.service'
import { DrizzleCoursesRepository } from './drizzle/repositories/drizzle-courses-repository'
import { DrizzleStudentsRepository } from './drizzle/repositories/drizzle-students-repository'

@Module({
  imports: [EnvModule],
  providers: [
    DrizzleService,
    {
      provide: StudentsRepository,
      useClass: DrizzleStudentsRepository,
    },
    {
      provide: CoursesRepository,
      useClass: DrizzleCoursesRepository,
    },
  ],
  exports: [DrizzleService, StudentsRepository, CoursesRepository],
})
export class DatabaseModule {}
