import { Request, Response } from 'express'
import prisma from '../lib/prisma'
import { stringify } from 'querystring'

const uploadController = {
  async upload(req: Request, res: Response) {
    req.file
    console.log(req.file)
    if (req.file) {
      const file = await prisma.file.create({
        data: {
          fileName: req.file?.filename,
          size: req.file?.size,
          typeOfFile: req.file?.mimetype,
          path: 'path',
        },
      })

      const { title, message, uploader, downloader } = req.body
      const upload = await prisma.upload.create({
        data: {
          title,
          message,
          uploader,
          downloader,
          connect: {
            files: file,
          },
        },
      })
    }
    // files of the form

    // information inside the form

    // uploader email
    // downloader email
    // title
    // message

    // const files = files.map()

    //const {uploaderId} =  model.user(uploaderEmail)

    //const {downloaderId} =  model.user(downloaderEmail)

    //upload.create(  title: string,
    // message: string,
    // files: Partial<File>[],
    // uploaderId: number,
    // downloaderId: number)

    // const files = getFileInfo(body)
    // saving to s3

    // const uploadsPromises = downloadUrls.map((dwurl) => {
    //   return await fileModel.create()
    // })

    // const files = Promise.all(uploadsPromises) as File[]

    res.status(200).json({ message: 'all ok' })
  },
  download(req: Request, _: Response) {
    console.log(req)
  },
}

export default uploadController
