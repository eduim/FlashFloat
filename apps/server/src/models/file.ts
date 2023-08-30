import prisma from '../lib/prisma'
import { File } from '@prisma/client'

const fileModel = {
  async findFiles(uploadId: number): Promise<File[] | null> {
    return await prisma.file.findMany({
      where: {
        uploadId,
      },
    })
  },
}

export default fileModel
