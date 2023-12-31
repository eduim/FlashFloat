import { Request, Response } from 'express'
import usersModel from '../models/users'
import uploadModel from '../models/upload'
import expiresAtDate from '../lib/expires'
import generateRandomId from '../lib/randomId'
import s3 from '../lib/s3'
import { FileType } from '../utils/types'
import { notifyDownloader, notifyUploader } from '../lib/email'

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

      const uploader = await usersModel.create(yourEmail)
      const downloader = await usersModel.create(emailTo)

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

      await notifyDownloader(
        upload.id.toString(),
        yourEmail,
        emailTo,
        title,
        message
      )
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
    console.log('here')
    try {
      const { uploadId } = req.params
      if (!uploadId) {
        throw new Error('Enter a upload ID')
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
  async uploadMetadata(req: Request, res: Response) {
    try {
      const uploadId = parseInt(req.params.uploadId)
      const upload = await uploadModel.findById(uploadId)
      const files = await uploadModel.findMany(uploadId)
      const totalSize = files!.reduce((size, file) => size + file.size, 0)
      const uploadData = await uploadModel.getMetadata(uploadId)

      // missing yourEmail, emailTo, numberFiles

      res.json({
        ...upload,
        ...uploadData,
        totalSize,
      })
    } catch (e) {
      const error = e as Error
      res.status(400).json({
        error: error.message,
      })
    }
  },
}

export default uploadController
