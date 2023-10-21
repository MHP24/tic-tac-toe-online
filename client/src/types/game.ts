import { type TSelection } from '.'

export type TGameStatus = 'Creating' | 'Queuing' | 'Started' | 'Finished'

export type TGamePlayerSide = 'P1' | 'P2'

export type TGamePlayer = {
  player: TGamePlayerSide
  data: {
    wins: number
    isPlaying: boolean
  }
}

export type TGameProvider = {
  room?: string
  player?: TGamePlayerSide
  isTurn?: boolean
  sessionId?: string
  turnTime?: number
  totalRounds?: number
  currentRound: number
  status: TGameStatus
  players: TGamePlayer[]
  table?: TSelection[][]
}

export type TGameSetupConfig = {
  totalRounds: number | string
  turnTime: number | string
}

export type TGameFormattedConfig = {
  roomId: string
  totalRounds: number
  turnTime: number

}

export type TGameAssignment = {
  player: TGamePlayerSide
  sessionId: string
  players: TGamePlayer[]
}

export type TGameStart = {
  room: string
  totalRounds: number
  turnTime: number
}

export type TGameContext = {
  createGame: (data: TGameSetupConfig) => void
  joinGame: (roomId: string) => void
  emitTurn: (i: number, j: number, selection: TSelection) => void
} & TGameProvider

export type TGameState = & TGameProvider

export type TGameTurn = {
  turnTime: number
  player: TGamePlayerSide
  table: TSelection[][]
}

export type TGameRound = {
  winner: TGamePlayerSide | null
  table: TSelection[][]
  round: number
  players: TGamePlayer[] | null
}

export type TGameFinish = {
  players: TGamePlayer[]
  table: TSelection[][]
}
