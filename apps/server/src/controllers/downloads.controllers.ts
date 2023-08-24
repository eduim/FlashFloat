import { Request, Response } from 'express'
import path from 'node:path'
import fs from 'node:fs'
import downloadModel from '../models/download'

const downloadController = {
  async download(req: Request, res: Response) {
    try {
      const { uploadId } = req.body
      if (!uploadId) {
        throw new Error('Enter a file ID')
      }

      const files = await downloadModel.findMany(uploadId)

      if (!files) {
        throw new Error('File not found')
      }

      for (const file of files) {
        const filePath = path.resolve(__dirname, 'uploads', file.path)
        const readStream = fs.createReadStream(filePath)
        readStream.pipe(res)
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message })
      }
    }
  },
}

export default downloadController
