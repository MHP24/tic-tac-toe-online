import {
  type TGameStart,
  type TGameAssignment,
  type TGameState,
  type TGameTurn,
  type TGameRound,
  type TGameFinish
} from '../../types'

export type TAction = {
  type: '[Game] - Create'
  payload: string
} | {
  type: '[Game] - Add player'
  payload: TGameAssignment
} | {
  type: '[Session] - Update ID'
  payload: string
} | {
  type: '[Game] - Start'
  payload: TGameStart
} | {
  type: '[Game] - Receive turn'
  payload: TGameTurn
} | {
  type: '[Game] - Next round'
  payload: TGameRound
} | {
  type: '[Game] - Finished'
  payload: TGameFinish
}

export const gameReducer = (state: TGameState, action: TAction): TGameState => {
  switch (action.type) {
    case '[Session] - Update ID':
      return {
        ...state,
        sessionId: action.payload
      }

    case '[Game] - Create':
      return {
        ...state,
        status: 'Queuing',
        room: action.payload
      }

    case '[Game] - Add player':
      const { player, sessionId, players } = action.payload
      return {
        ...state,
        players,
        status: 'Queuing',
        player: state.sessionId === sessionId ? player : state.player
      }

    case '[Game] - Start':
      return {
        ...state,
        ...action.payload,
        status: 'Started'
      }

    case '[Game] - Receive turn':
      const { player: turnPlayer, ...rest } = action.payload
      return {
        ...state,
        ...rest,
        isTurn: turnPlayer === state.player,
        players: state.players.map(({ player, data }) => ({
          player,
          data: {
            ...data,
            isPlaying: player === turnPlayer
          }
        }))
      }

    case '[Game] - Next round':
      const { table, round, players: playerWins, winner } = action.payload
      return {
        ...state,
        table,
        currentRound: round,
        players: playerWins ?? state.players,
        isTurn: state.player !== winner
      }

    case '[Game] - Finished':
      return {
        ...state,
        status: 'Finished',
        players: action.payload.players,
        table: action.payload.table
      }

    default:
      return state
  }
}
