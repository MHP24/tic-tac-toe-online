import { type TGamePlayer, type TGameState } from '../../types'

export type TAction = {
  type: '[Game] - Create'
} | {
  type: '[Game] - Add player'
  payload: {
    player: 'P1' | 'P2'
    sessionId: string
    players: TGamePlayer[]
  }
} | {
  type: '[Session] - Update ID'
  payload: string
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
        status: 'Queuing'
      }

    case '[Game] - Add player':
      const { player, sessionId, players } = action.payload
      return {
        ...state,
        players,
        status: 'Queuing',
        player: state.sessionId === sessionId ? player : state.player
      }

    default:
      return state
  }
}
