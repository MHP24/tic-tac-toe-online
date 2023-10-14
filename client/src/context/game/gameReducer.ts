import { type TGameState } from '../../types'

export type TAction = {
  type: '[Room] - Create'
  payload: {
    turnTime: number
    totalRounds: number
    username: string
    room: string
  }
}

export const gameReducer = (state: TGameState, action: TAction): TGameState => {
  switch (action.type) {
    case '[Room] - Create':
      const { username, ...rest } = action.payload

      return {
        ...state,
        ...rest,
        status: 'Queuing',
        players: [{
          player: 'P1',
          data: {
            wins: 0,
            username,
            isPlaying: false
          }
        }]
      }

    default:
      return state
  }
}
