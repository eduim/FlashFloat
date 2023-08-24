import { Request, Response } from 'express'
import path from 'path'
import downloadModel from '../models/download'

const downloadController = {
  async download(req: Request, _: Response) {
    const { uploadId } = req.body
    if (!uploadId) {
      throw new Error('Enter a file ID')
    }

    const downloadFile = await downloadModel.findFirst(uploadId)

    if (!downloadFile) {
      throw new Error('File not found')
    }

    const filePath = path.resolve(__dirname, 'uploads', downloadFile.path)

    console.log(filePath)
  },
}

export default downloadController
