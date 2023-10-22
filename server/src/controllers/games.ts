import { emitNextTurn } from '.'
import {
  type TGameSetupConfig,
  type TGame,
  type TPlayer,
  type TGameSelection,
  type TGameTurn,
  type TGamePlayer
} from '../../types'

const games = new Map<string, TGame>()

export const create = (id: string, data: TGameSetupConfig): void => {
  const config: TGame = {
    ...data,
    totalRounds: data.totalRounds,
    turnTime: data.turnTime,
    currentRound: 1,
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

export const addPlayer = (gameId: string, playerId: string): TPlayer | null => {
  const game = get(gameId)

  if (game && game.players.length < 2) {
    const player = `P${game.players.length + 1}` as TPlayer

    game.players.push({
      player,
      id: playerId,
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
  if (player !== turn || table[i][j] !== '') return null

  clearTimeout(tout)

  table[i][j] = selection
  return table
}

// check if table is full

type TableStatus = {
  hasWinner: boolean
  isFull: boolean
}

export const checkWinner = (roomId: string, piece: TGameSelection): null | TableStatus => {
  const table = get(roomId)?.table
  if (!table) return null

  const winPiece = piece.repeat(3)

  const rectWon = table.some((row, i) => (
    row.join('') === winPiece ||
    table[0][i] + table[1][i] + table[2][i] === winPiece
  ))

  const diagLeftWon = table
    .map((_, i) => table[i][i]).join('') === winPiece
  const diagRightWon = table
    .map((_, i) => table[i].at((i + 1) * -1)).join('') === winPiece

  return {
    hasWinner: rectWon || diagLeftWon || diagRightWon,
    isFull: table.flat().every(slot => slot !== '')
  }
}

export const resetTable = (roomId: string): TGameSelection[][] => {
  const emptyTable: TGameSelection[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]

  games.set(roomId, {
    ...get(roomId)!,
    table: emptyTable
  })

  return emptyTable
}

export const passRound = (roomId: string): number => {
  const { currentRound, ...rest } = get(roomId)!
  games.set(roomId, {
    ...rest,
    currentRound: currentRound! + 1
  })

  return currentRound! + 1
}

export const addWin = (roomId: string, winner: TPlayer): TGamePlayer[] | null => {
  const game = get(roomId)
  if (game) {
    const { players, ...rest } = game

    const playersUpdated = players.map(({ player, data }) => (
      {
        player,
        data: {
          ...data,
          wins: player === winner ? data.wins + 1 : data.wins,
          isPlaying: player !== winner
        }
      }
    ))

    games.set(roomId, {
      ...rest,
      players: playersUpdated
    })

    return playersUpdated
  }

  return null
}

export const drop = (roomId: string): void => {
  games.delete(roomId)
}
