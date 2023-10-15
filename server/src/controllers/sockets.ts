import { type Socket } from 'socket.io'
import { validateGameProp } from '../utils'
import { games } from '.'
import { io } from '..'

export const initializeConnection = async (socket: Socket): Promise<void> => {
  socket.on('[Game] - Setup', ({ roomId, totalRounds, turnTime }) => {
    totalRounds = validateGameProp(totalRounds, 3)
    turnTime = validateGameProp(turnTime, 30)
    games.create(roomId, { totalRounds, turnTime })

    console.log(`Creating room: ${roomId} for P1`)
  })

  socket.on('[Game] - Join', async (roomId) => {
    const player = games.addPlayer(roomId)
    if (player) {
      await socket.join(roomId)
      io.to(roomId).emit('[Game] - Joined', {
        sessionId: socket.id,
        player,
        players: games.get(roomId)?.players
      })

      player === 'P2' && (
        io.to(roomId).emit('[Game] - Start', { ...games.get(roomId), room: roomId })
      )
      console.log(`Player ${socket.id} joined in room: ${roomId}`)
      return
    }

    // TODO: Handle players > 2
    console.log('Unable to join')
  })
}
