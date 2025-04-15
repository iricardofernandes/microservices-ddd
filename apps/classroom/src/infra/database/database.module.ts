import { CoursesRepository } from '@/domain/application/repositories/courses-repository'
import { EnrollmentsRepository } from '@/domain/application/repositories/enrollments-repository'
import { StudentsRepository } from '@/domain/application/repositories/students-repository'
import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { DrizzleService } from './drizzle/drizzle.service'
import { DrizzleCoursesRepository } from './drizzle/repositories/drizzle-courses-repository'
import { DrizzleEnrollmentsRepository } from './drizzle/repositories/drizzle-enrollments-repository'
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
    {
      provide: EnrollmentsRepository,
      useClass: DrizzleEnrollmentsRepository,
    },
  ],
  exports: [
    DrizzleService,
    StudentsRepository,
    CoursesRepository,
    EnrollmentsRepository,
  ],
})
export class DatabaseModule {}
