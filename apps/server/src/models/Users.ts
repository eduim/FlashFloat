import prisma from '../lib/prisma'
import { User } from '@prisma/client'
import { Role } from '../utils/types'

async function create(email: string, role: Role): Promise<User> {
  const newUser = await prisma.user.create({
    data: {
      email,
      role,
    },
  })
  return newUser
}

export default create
