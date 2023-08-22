import express from 'express'
import multer from 'multer'
import morgan from 'morgan'
//import router from './router'
// import { PORT } from './lib/constants'
// import { Request, Response } from 'express'
const app = express()
app.use(morgan('tiny'))

const upload = multer({
  dest: 'files/',
})

app.post('/uploads', upload.any(), (req, res) => {
  //send the file to local storage for saving and get a link back
  //add the link to the rest of the body of the request
  //sent the rest of the body plus link to be stored in the postgress db
  console.log(req.body)
  console.log(req.file)
  res.status(201).json('You file upload has been successful')
})

const startServer = () => {
  const PORT = process.env.PORT ?? 8080
  const server = app.listen(PORT, () => {
    console.log(`🚀Server running and listening on http://localhost:${PORT}`)
  })
  process.on('SIGTERM', () => {
    server.close()
  })

  return server
}

export default startServer
