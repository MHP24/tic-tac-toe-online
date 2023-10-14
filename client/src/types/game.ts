export type TGameStatus = 'Creating' | 'Queuing' | 'Started' | 'Finished'

export type TGamePlayer = {
  player: 'P1' | 'P2'
  data: {
    wins: number
    username: string
    isPlaying: boolean
  }
}

export type TGameContext = {
  room?: string
  turnTime?: number
  totalRounds?: number
  currentRound: number
  status: TGameStatus
  players: TGamePlayer[]
}

export type TGameProvider = {
  createGame: (totalRounds: number, turnTime: number, username: string) => void
} & TGameContext

export type TGameState = & TGameContext
