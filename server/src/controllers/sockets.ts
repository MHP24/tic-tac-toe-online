import { type Socket } from 'socket.io'
import { validateGameProp } from '../utils'
import { games } from '.'
import { io } from '..'

export const initializeConnection = async (socket: Socket): Promise<void> => {
  socket.on('[Game] - Setup', ({ roomId, totalRounds, turnTime }) => {
    totalRounds = validateGameProp(totalRounds, 3)
    turnTime = validateGameProp(turnTime, 30)
    games.create(roomId, { totalRounds, turnTime })

    // socket.emit('[Game] - Setup', {
    //   roomId,
    //   totalRounds,
    //   turnTime
    // })

    console.log(`Creating room: ${roomId} for P1`)
  })

  socket.on('[Game] - Join', async (roomId) => {
    const player = games.addPlayer(roomId)
    // if (player) {
    //   await socket.join(roomId)
    //   io.to(roomId).emit('[Game] - Joined', {
    //     sessionId: socket.id,
    //     roomId,
    //     player,
    //     ...rest
    //   })
    //   io.to(roomId).emit('[Game] - Start', player === 'P2')
    //   return
    // }

    if (player) {
      await socket.join(roomId)
      io.to(roomId).emit('[Game] - Joined', {
        session: socket.id,
        player
      })

      // if player === 'P2' emit start and send entire config
      // io.to(roomId).emit('[Game] - Start', player === 'P2')
      console.log(`Player ${socket.id} joined in room: ${roomId}`)
      return
    }

    // TODO: Handle players > 2
    console.log('Unable to join')
  })
}
