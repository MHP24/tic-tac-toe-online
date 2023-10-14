import { Server, type Socket } from 'socket.io'
import { createServer } from 'node:http'
import { app } from './app'
import { serverConfig } from './config'

const { port } = serverConfig

const server = createServer(app)

server.listen(port, () => { console.log(`[Server] listening on port ${port}`) })

export const io = new Server(server, {
  cors: {}
})
console.log('[io] Started')

io.on('connection', (socket: Socket) => {
  console.log({ socket })
})
