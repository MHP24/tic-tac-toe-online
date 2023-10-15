import { type TGameState } from '../../types'

export type TAction = {
  type: '[Room] - Create'
  payload: {
    turnTime: number
    totalRounds: number
    room: string
  }
}

export const gameReducer = (state: TGameState, action: TAction): TGameState => {
  switch (action.type) {
    case '[Room] - Create':
      return {
        ...state,
        ...action.payload,
        status: 'Queuing',
        players: [{
          player: 'P1',
          data: {
            wins: 0,
            isPlaying: false
          }
        }]
      }

    default:
      return state
  }
}
