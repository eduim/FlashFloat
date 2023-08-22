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
}

export default usersModel
