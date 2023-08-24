import express from 'express'
import uploadController from './controllers/uploads.controller'
import multer from 'multer'
import downloadController from './controllers/downloads.controllers'

const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

router.get('/', (_, res) => {
  return res.status(200).json('hello')
})

router.post('/upload', upload.single('fileUpload'), uploadController.upload)

router.get('/download/:uploadId', downloadController.download)

export default router
