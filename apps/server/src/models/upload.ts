import { Upload, File } from '@prisma/client'
import { FileType } from '../utils/types'
import prisma from '../lib/prisma'

interface UploadMetadata {
  yourEmail: string
  emailTo: string
  numberFiles: number
}

const uploadModel = {
  async create(
    title: string,
    message: string,
    uploaderId: number,
    downloaderId: number,
    expiresAt: Date
  ): Promise<Upload> {
    const uploadFile = await prisma.upload.create({
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
      },
    })

    return uploadFile
  },

  async update(uploadId: number, files: FileType[]): Promise<Upload> {
    const updateUpload = await prisma.upload.update({
      where: {
        id: uploadId,
      },
      data: {
        files: {
          createMany: {
            data: files,
          },
        },
      },
    })
    return updateUpload
  },

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

  async findById(uplaodId: number): Promise<Upload> {
    return await prisma.upload.findUniqueOrThrow({
      where: {
        id: uplaodId,
      },
    })
  },

  async getMetadata(uploadId: number): Promise<UploadMetadata> {
    const uploadData = await prisma.upload.findUniqueOrThrow({
      where: { id: uploadId },
      select: {
        uploader: {
          select: {
            email: true,
          },
        },
        downloader: {
          select: {
            email: true,
          },
        },
        _count: {
          select: {
            files: true,
          },
        },
      },
    })
    return {
      yourEmail: uploadData.uploader.email,
      emailTo: uploadData.downloader.email,
      numberFiles: uploadData._count.files,
    }
  },
}

export default uploadModel
