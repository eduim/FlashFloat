import express from 'express'
import router from './router'
// import { PORT } from './lib/constants'
// import { Request, Response } from 'express'
const app = express()

// app.get('/', (req: Request, res: Response) => {
//   console.log(req.body)
//   res.send('Express + TypeScript Server')
// })
app.use(express.json())

app.use(router)

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
