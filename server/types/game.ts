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
  turn?: TPlayer
  players: TGamePlayer[]
  table: TGameSelection[][]
  tout?: any
}

export type TGameSetupConfig = {
  totalRounds: number
  turnTime: number
}

export type TGameTurn = {
  roomId: string
  i: number
  j: number
  selection: TGameSelection
  player: TPlayer
}
