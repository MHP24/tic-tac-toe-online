import { type Socket } from 'socket.io'
import { validateGameProp } from '../utils'
import { games } from '.'
import { io } from '..'
import { type TGameTurn } from '../../types'

export const initializeConnection = async (socket: Socket): Promise<void> => {
  socket.on('[Game] - Setup', ({ roomId, totalRounds, turnTime }) => {
    totalRounds = validateGameProp(totalRounds, 3)
    turnTime = validateGameProp(turnTime, 30)
    games.create(roomId, { totalRounds, turnTime })

    console.log(`Creating room: ${roomId} for P1`)
  })

  socket.on('[Game] - Join', async (roomId: string) => {
    const player = games.addPlayer(roomId)
    if (player) {
      await socket.join(roomId)
      io.to(roomId).emit('[Game] - Joined', {
        sessionId: socket.id,
        player,
        players: games.get(roomId)?.players
      })

      console.log(`Player ${socket.id} joined in room: ${roomId}`)

      if (player === 'P2') {
        io.to(roomId).emit('[Game] - Start', { ...games.get(roomId), room: roomId })
        io.to(roomId).emit('[Game] - Turn', games.handleNextTurn(roomId))
      }
      return
    }

    // TODO: Handle players > 2
    console.log('Unable to join')
  })

  socket.on('[Game] - Turn', async (data: TGameTurn) => {
    const table = games.receiveTurn(data)
    const { roomId } = data

    if (table) {
      // TODO: check if win or emmit turn
      io.to(roomId).emit('[Game] - Turn', games.handleNextTurn(roomId))
    }
  })
}
