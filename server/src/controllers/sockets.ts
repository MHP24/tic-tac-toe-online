import { type Socket } from 'socket.io'
import { validateGameProp } from '../utils'
import { games } from '.'

export const initializeConnection = async (socket: Socket): Promise<void> => {
  socket.on('[Game] - Setup', ({ roomId, totalRounds, turnTime }) => {
    totalRounds = validateGameProp(totalRounds, 3)
    turnTime = validateGameProp(turnTime, 30)
    games.create(roomId, { totalRounds, turnTime })

    socket.emit('[Game] - Setup', {
      roomId,
      totalRounds,
      turnTime
    })

    console.log(`Creating room: ${roomId} for P1`)
  })

  // sockets.set(socket.id, socket)
}
