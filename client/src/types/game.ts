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
  player?: 'P1' | 'P2'
  sessionId?: string
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

export type TGameFormattedConfig = {
  roomId: string
  totalRounds: number
  turnTime: number
  player?: 'P1' | 'P2'
  sessionId?: string
}

export type TGameContext = {
  createGame: (data: TGameSetupConfig) => void
  joinGame: (roomId: string) => void
} & TGameProvider

export type TGameState = & TGameProvider
