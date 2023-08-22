import express from 'express'
import router from './router'
import cors from 'cors'
import { PORT } from './lib/constants'

const app = express()

app.use(cors())
app.use(express.json())

app.use(router)

const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log(`🚀Server running and listening on http://localhost:${PORT}`)
  })
  process.on('SIGTERM', () => {
    server.close()
  })

  return server
}

export default startServer
