import { Request, Response } from 'express'
import usersModel from '../models/users'
import uploadModel from '../models/upload'
import expiresAtDate from '../lib/expires'
import generateRandomId from '../lib/randomId'
import s3 from '../lib/s3'
import { FileType } from '../utils/types'

const uploadController = {
  async upload(req: Request, res: Response) {
    try {
      const { emailTo, yourEmail, title, message } = req.body
      const fileUpload = req.file

      if (!fileUpload) {
        throw new Error('no file uploaded')
      }

      if (!emailTo || !yourEmail || !title || !message) {
        throw new Error('bad request')
      }

      if (
        typeof emailTo !== 'string' ||
        typeof yourEmail !== 'string' ||
        typeof title !== 'string' ||
        typeof message !== 'string'
      ) {
        throw new Error('Bad request.')
      }

      let uploader = await usersModel.find(emailTo)
      let downloader = await usersModel.find(yourEmail)

      if (!uploader || !downloader) {
        uploader = await usersModel.create(yourEmail, 'UPLOADER')
        downloader = await usersModel.create(emailTo, 'DOWNLOADER')
      }

      const expiresAt = expiresAtDate()

      const upload = await uploadModel.create(
        title,
        message,
        uploader.id,
        downloader.id,
        expiresAt
      )

      const rawFiles = [fileUpload]
      const files: FileType[] = []

      for (const file of rawFiles) {
        const randomId = generateRandomId()
        const key = `${upload.id}/${randomId}`
        await s3.upload(key, file.buffer)

        files.push({
          fileName: file?.originalname,
          size: file?.size,
          typeOfFile: file?.mimetype,
          path: key,
        })
      }

      const updateUPload = await uploadModel.update(upload.id, files)

      res.status(201).json({ updateUPload })
    } catch (error) {
      let message = 'Unkown error'
      if (error instanceof Error) message = error.message
      console.log(error)
      res.status(500).json({
        message,
      })
    }
  },
}

export default uploadController
