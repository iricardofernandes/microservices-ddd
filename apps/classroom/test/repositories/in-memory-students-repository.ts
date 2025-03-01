import { StudentsRepository } from '@/domain/application/repositories/students-repository'
import { Student } from '@/domain/enterprise/entities/student'

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Student[] = []

  async findByAuthUserID(authUserId: string) {
    const student = this.items.find(item => item.authUserId === authUserId)

    if (!student) {
      return null
    }

    return student
  }

  async create(student: Student) {
    this.items.push(student)
  }
}
