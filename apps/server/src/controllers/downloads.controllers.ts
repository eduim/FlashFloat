import { Request, Response } from 'express'
import downloadModel from '../models/download'
import s3 from '../lib/s3'
import archiver from 'archiver'

const downloadController = {
  async download(req: Request, res: Response) {
    try {
      const { uploadId } = req.params
      if (!uploadId) {
        throw new Error('Enter a file ID')
      }

      const files = await downloadModel.findMany(parseInt(uploadId))

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

export default downloadController
