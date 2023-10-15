import { type TGameSetupConfig, type TGame, type TPlayer } from '../../types'

const games = new Map<string, TGame>()

export const create = (id: string, data: TGameSetupConfig): void => {
  const config: TGame = {
    ...data,
    totalRounds: data.totalRounds,
    turnTime: data.turnTime,
    players: []
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
