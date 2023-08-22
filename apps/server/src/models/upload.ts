import { PrismaClient, Upload } from '@prisma/client'

const prismaInstance = new PrismaClient()

const uploadModel = {
  async create(
    title: string,
    message: string,
    uploaderId: number,
    downloaderId: number,
    expiresAt: Date,
    files: any[]
  ): Promise<Upload> {
    const uploadFile = await prismaInstance.upload.create({
      data: {
        title,
        message,
        expiresAt,
        uploader: {
          connect: {
            id: uploaderId,
          },
        },
        downloader: {
          connect: {
            id: downloaderId,
          },
        },
        files: {
          createMany: {
            data: files,
          },
        },
      },
    })

    return uploadFile
  },
}

export default uploadModel
