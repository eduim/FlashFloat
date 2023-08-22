import { Request, Response } from 'express'
import usersModel from '../models/users'
import uploadModel from '../models/upload'
import expiresAtDate from '../lib/expires'

const uploadController = {
  async upload(req: Request, res: Response) {
    try {
      const { emailTo, yourEmail, title, message } = req.body
      const fileUpload = req.file

      if (!fileUpload) {
        throw new Error('no file uploaded')
      }

      let uploader = await usersModel.find(emailTo)
      let downloader = await usersModel.find(yourEmail)

      if (!uploader || !downloader) {
        uploader = await usersModel.create(yourEmail, 'UPLOADER')
        downloader = await usersModel.create(emailTo, 'DOWNLOADER')
      }

      const files = [fileUpload].map((file) => {
        return {
          fileName: file?.filename,
          size: file?.size,
          typeOfFile: file?.mimetype,
          path: file?.path,
        }
      })

      const expiresAt = expiresAtDate()

      const upload = await uploadModel.create(
        title,
        message,
        uploader.id,
        downloader.id,
        expiresAt,
        files
      )

      res.status(201).json({
        upload,
      })
    } catch (error) {
      let message = 'Unkown error'
      if (error instanceof Error) message = error.message
      res.status(500).json({
        message,
      })
    }
  },
}

export default uploadController
