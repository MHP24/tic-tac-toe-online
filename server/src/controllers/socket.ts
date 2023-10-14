import { type Socket } from 'socket.io'

// const rooms = new Map<string, Socket>()

export const initializeConnection = async (socket: Socket): Promise<void> => {
  await socket.join('some room')
  // sockets.set(socket.id, socket)
}
