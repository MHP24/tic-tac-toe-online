import { type Socket } from 'socket.io'
import { onDisconnect, onGameSetup, onJoin, onTurn } from '.'

export const initializeConnection = async (socket: Socket): Promise<void> => {
  socket.on('[Game] - Setup', onGameSetup)

  socket.on('[Game] - Join', async (data) => { await onJoin(data, socket) })

  socket.on('[Game] - Turn', onTurn)

  socket.on('disconnect', () => { onDisconnect(socket) })
}
