import { Request, Response } from 'express'
import usersModel from '../models/users'
import uploadModel from '../models/upload'
import expiresAtDate from '../lib/expires'
// import fs from 'node:fs'
import s3 from '../lib/s3'

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

      const files = [fileUpload].map((file) => {
        return {
          fileName: file?.originalname,
          size: file?.size,
          typeOfFile: file?.mimetype,
          path: file?.path,
          binary: file,
        }
      })

      for (const file of files) {
        const key = `${uploader.id}/${downloader.id}/${upload.id}/${upload.id}`
        console.log(key)
        await s3.upload(key, file.binary.buffer)
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
