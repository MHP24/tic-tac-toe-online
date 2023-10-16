export type TPlayer = 'P1' | 'P2'

export type TGamePlayer = {
  player: TPlayer
  data: {
    wins: number
    isPlaying: boolean
  }
}

export type TGameSelection = 'X' | 'O' | ''

export type TGame = {
  totalRounds: number
  turnTime: number
  currentRound?: number
  turn?: 'P1' | 'P2'
  players: TGamePlayer[]
  table: TGameSelection[][]
}

export type TGameSetupConfig = {
  totalRounds: number
  turnTime: number
}
