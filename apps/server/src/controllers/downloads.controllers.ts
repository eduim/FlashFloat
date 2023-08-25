import { Request, Response } from 'express'
import downloadModel from '../models/download'
import s3 from '../lib/s3'

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

      for (const file of files) {
        const fileBuffer = await s3.download(file.path)

        if (fileBuffer) {
          res.set('Content-Type', file.typeOfFile)
          res.set(
            'Content-Disposition',
            `attachment; filename = "${file.fileName}"`
          )
          res.send(fileBuffer)
        } else {
          throw new Error('Error downloading file')
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message })
      }
    }
  },
}

export default downloadController
