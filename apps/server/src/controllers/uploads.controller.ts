import { Request, Response } from 'express'
import usersModel from '../models/users'
import uploadModel from '../models/upload'
import expiresAtDate from '../lib/expires'
import generateRandomId from '../lib/randomId'
import s3 from '../lib/s3'
import { FileType } from '../utils/types'
import { notifyDownloader, notifyUploader } from '../contact/email'

import archiver from 'archiver'

const uploadController = {
  async upload(req: Request, res: Response) {
    try {
      const { emailTo, yourEmail, title, message } = req.body
      const fileUpload = req.files

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

      if (!uploader) {
        uploader = await usersModel.create(yourEmail, 'UPLOADER')
      }
      if (!downloader) {
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

      const rawFiles = fileUpload as Express.Multer.File[]
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

      await notifyDownloader(yourEmail, emailTo, title, message)
      await notifyUploader(yourEmail, emailTo, 'File sent')

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
  async download(req: Request, res: Response) {
    try {
      const { uploadId } = req.params
      if (!uploadId) {
        throw new Error('Enter a file ID')
      }

      const files = await uploadModel.findMany(parseInt(uploadId))

      if (!files || files.length === 0) {
        throw new Error('File not found')
      }

      const zip = archiver('zip')
      zip.pipe(res)

      for (const file of files) {
        const fileBuffer = await s3.download(file.path)

        if (fileBuffer) {
          zip.append(fileBuffer, {
            name: file.fileName,
          })
        } else {
          throw new Error('Error downloading file')
        }
      }
      zip.finalize()
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message })
      }
    }
  },
}

export default uploadController
