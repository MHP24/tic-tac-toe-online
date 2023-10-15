export type TGameStatus = 'Creating' | 'Queuing' | 'Started' | 'Finished'

export type TGamePlayer = {
  player: 'P1' | 'P2'
  data: {
    wins: number
    isPlaying: boolean
  }
}

export type TGameProvider = {
  room?: string
  turnTime?: number
  totalRounds?: number
  currentRound: number
  status: TGameStatus
  players: TGamePlayer[]
}

export type TGameSetupConfig = {
  totalRounds: number | string
  turnTime: number | string
}

export type TGameContext = {
  setupGame: ({
    totalRounds,
    turnTime
  }: TGameSetupConfig) => void
} & TGameProvider

export type TGameState = & TGameProvider
