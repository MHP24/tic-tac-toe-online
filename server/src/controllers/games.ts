import { type TGameSetupConfig, type TGame } from '../../types'

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

// export const addPlayer = () => {

// }
