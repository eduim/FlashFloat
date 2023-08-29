import { Request, Response } from 'express'
import downloadModel from '../models/download'
import s3 from '../lib/s3'
import JSZip from 'jszip'

const downloadController = {
  async download(req: Request, res: Response) {
    try {
      const { uploadId } = req.params
      if (!uploadId) {
        throw new Error('Enter a file ID')
      }

      const files = await downloadModel.findMany(parseInt(uploadId))

      if (!files || files.length === 0) {
        throw new Error('Files not found')
      }

      const promises = files.map(async (file) => {
        const fileBuffer = await s3.download(file.path)
        if (!fileBuffer) {
          throw new Error('Error downloading file')
        }
        return {
          buffer: fileBuffer,
          type: file.typeOfFile,
          fileName: file.fileName,
        }
      })

      const fileBuffers = await Promise.all(promises)

      if (fileBuffers.length > 0) {
        const zip = new JSZip()
        fileBuffers.forEach((file) => {
          zip.file(file.fileName, file.buffer)
        })

        const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })

        res.set('Content-Type', 'application/zip')
        res.set('Content-Disposition', 'attachment; filename="files.zip"')
        res.send(zipBuffer)
      } else {
        throw new Error('No files available for download')
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message })
      }
    }
  },
}

export default downloadController
