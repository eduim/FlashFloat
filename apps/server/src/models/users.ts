import prisma from '../lib/prisma'
import { User } from '@prisma/client'

const usersModel = {
  async create(email: string): Promise<User> {
    const result = await prisma.user.upsert({
      where: {
        email,
      },
      update: {},
      create: {
        email,
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
