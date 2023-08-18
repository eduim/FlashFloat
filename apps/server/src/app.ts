import express from 'express'
import { PORT } from './lib/constants'
import {Request, Response} from 'express'
const app = express()

app.get('/', (req: Request, res: Response) => {
  console.log(req.body)
  res.send('Express + TypeScript Server')
})

const startServer = async () => {
  const server = await app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  })
  process.on('SIGTERM', () => {
    server.close()
  })

  return server
}

export default startServer
