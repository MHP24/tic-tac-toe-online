import { type Socket } from 'socket.io'
import { games, players } from '.'
import { type TGameTurn, type TGameSetupConfig } from '../../types'
import { validateGameProp } from '../utils'
import { io } from '..'

/* Listeners */

type TSetup = {
  roomId: string
} & TGameSetupConfig

export const onGameSetup = ({ roomId, totalRounds, turnTime }: TSetup): void => {
  totalRounds = validateGameProp(totalRounds, 3)
  turnTime = validateGameProp(turnTime, 30)
  games.create(roomId, { totalRounds, turnTime })

  console.log(`Creating room: ${roomId}`)
}

export const onJoin = async (roomId: string, socket: Socket): Promise<void> => {
  const player = games.addPlayer(roomId, socket.id)
  if (!player) return

  players.addPlayer(socket.id, roomId)

  await socket.join(roomId)
  io.to(roomId).emit('[Game] - Joined', {
    sessionId: socket.id,
    player,
    players: games.get(roomId)?.players
  })

  console.log(`Player ${socket.id} joined in room: ${roomId}`)

  if (player === 'P2') {
    io.to(roomId).emit('[Game] - Start', {
      ...games.get(roomId), room: roomId
    })
    emitMatchCount()
    emitNextTurn(roomId)
  }
}

export const onTurn = async (data: TGameTurn): Promise<void> => {
  const { roomId, player, selection } = data

  const { turn = null } = games.get(roomId) ?? {}
  if (turn !== player) return

  const table = games.receiveTurn(data)
  if (!table) return

  const tableStatus = games.checkWinner(roomId, selection)
  const game = games.get(roomId)

  if (!tableStatus || !game) return

  const { hasWinner, isFull } = tableStatus
  const playerWinsUpdated = hasWinner ? games.addWin(roomId, player) : null

  if (!isFull && !hasWinner && table) {
    emitNextTurn(roomId); return
  }

  const { currentRound, totalRounds } = game as (
    { currentRound: number, totalRounds: number }
  )

  if (currentRound + 1 <= totalRounds) {
    emitNextTurn(roomId)
    io.to(roomId).emit('[Game] - Next round', {
      winner: isFull && !hasWinner ? null : player,
      table: games.resetTable(roomId),
      round: games.passRound(roomId),
      players: playerWinsUpdated
    })
    return
  }

  const finalData = games.get(roomId)!
  games.drop(roomId)

  io.to(roomId).emit('[Game] - Finished', {
    players: finalData.players,
    table: finalData.table
  })
}

export const onDisconnect = (socket: Socket): void => {
  const roomId = players.getRoom(socket.id)
  if (!roomId) return

  const room = games.get(roomId)
  if (!room) return

  room.players.forEach(({ id }) => { players.drop(id!) })
  games.drop(roomId)
  io.to(roomId).emit('[Game] - Player disconnect', { status: 'Closed' })
  emitMatchCount()
}

/* Emitters */
export const emitNextTurn = (roomId: string): void => {
  io.to(roomId).emit('[Game] - Turn', games.handleNextTurn(roomId))
}

export const emitMatchCount = (socket: Socket | null = null): void => {
  (socket ?? io).emit('[Game] - Game count', games.getCount())
}
