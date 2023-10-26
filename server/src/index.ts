import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { app } from './app'
import { serverConfig } from './config'
import { initializeConnection } from './controllers'

const { port, clientUrl } = serverConfig

const server = createServer(app)
server.listen(port, () => { console.log(`[Server] listening on port ${port}`) })

export const io = new Server(server, {
  cors: {
    origin: [clientUrl]
  }
})
console.log('[io] Started')

io.on('connection', initializeConnection)
