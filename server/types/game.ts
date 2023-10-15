export type TPlayer = 'P1' | 'P2'

export type TGamePlayer = {
  player: TPlayer
  data: {
    wins: number
    isPlaying: boolean
  }
}

export type TGame = {
  totalRounds: number
  turnTime: number
  currentRound?: number
  turn?: 'P1' | 'P2'
  players: TGamePlayer[]
}

export type TGameSetupConfig = {
  totalRounds: number
  turnTime: number
}
