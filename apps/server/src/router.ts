import express from 'express'
import uploadController from './controllers/uploads.controller'
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

router.post('/upload', upload.array('fileUpload'), uploadController.upload)

router.get('/download/:uploadId/metadata', uploadController.uploadMetadata)
router.get('/download/:uploadId', uploadController.download)

export default router
