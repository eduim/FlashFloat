import { File } from '@prisma/client'

import prisma from '../lib/prisma'

const downloadModel = {
  async findMany(uploadId: number): Promise<File[] | null> {
    const result = await prisma.file.findMany({
      where: {
        uploadId: uploadId,
      },
    })
    if (!result) {
      throw new Error('No record found')
    }
    return result
  },
}

export default downloadModel
