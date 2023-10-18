import { emitNextTurn } from '.'
import { type TGameSetupConfig, type TGame, type TPlayer, type TGameSelection, type TGameTurn } from '../../types'

const games = new Map<string, TGame>()

export const create = (id: string, data: TGameSetupConfig): void => {
  const config: TGame = {
    ...data,
    totalRounds: data.totalRounds,
    turnTime: data.turnTime,
    players: [],
    table: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  }
  games.set(id, config)
}

export const get = (id: string): TGame | undefined => games.get(id)

export const addPlayer = (gameId: string): TPlayer | null => {
  const game = get(gameId)

  if (game && game.players.length < 2) {
    const player = `P${game.players.length + 1}` as TPlayer

    console.log({ player })

    game.players.push({
      player,
      data: {
        wins: 0,
        isPlaying: false
      }
    })

    return player
  }

  return null
}

type Turn = {
  turnTime: number
  player: TPlayer
}

export const passTurn = (roomId: string): Turn => {
  const { turn, turnTime } = get(roomId)!

  const nextTurn: Turn = !turn
    ? { player: 'P1', turnTime }
    : { player: turn === 'P1' ? 'P2' : 'P1', turnTime }

  return nextTurn
}

export const updateTurn = (id: string, nextTurn: TPlayer): void => {
  const game = get(id)
  game && (
    games.set(id, {
      ...game,
      turn: nextTurn,
      players: game.players.map(player => (
        {
          ...player,
          data: {
            ...player.data,
            isPlaying: player.player === nextTurn
          }
        }
      ))
    })
  )
}

export const skipTurn = (roomId: string, time: number): void => {
  const game = get(roomId)
  if (game) {
    games.set(roomId, {
      ...game,
      tout: setTimeout(() => {
        emitNextTurn(roomId)
      }, time * 1000)
    })
  }
}

type TNextTurn = {
  table: TGameSelection[][]
} & Turn

export const handleNextTurn = (roomId: string): TNextTurn => {
  const { player, turnTime } = passTurn(roomId)
  updateTurn(roomId, player)
  skipTurn(roomId, turnTime)

  return { player, turnTime, table: get(roomId)!.table }
}

export const receiveTurn = (
  { roomId, i, j, selection, player }: TGameTurn
): TGameSelection[][] | null => {
  const { turn, table, tout } = get(roomId)!
  clearTimeout(tout)

  if (player !== turn || table[i][j] !== '') return null

  table[i][j] = selection
  return table
}
