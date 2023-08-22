import prisma from '../lib/prisma'
import { Role, User } from '@prisma/client'

const usersModel = {
  async create(email: string, role: Role): Promise<User> {
    const result = await prisma.user.create({
      data: {
        email,
        role,
      },
    })
    return result
  },

  async find(email: string): Promise<User | null> {
    const result = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return result
  },
}

export default usersModel
