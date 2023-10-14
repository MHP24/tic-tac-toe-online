import { type FC, type PropsWithChildren, useReducer } from 'react'
import { type TGameState } from '../../types'
import { GameContext, gameReducer } from '.'

const INITIAL_STATE: TGameState = {
  currentRound: 0,
  players: [],
  room: undefined,
  status: 'Creating',
  totalRounds: undefined,
  turnTime: undefined
}

export const GameContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)

  const createGame = (totalRounds: number, turnTime: number, username: string) => {
    dispatch({
      type: '[Room] - Create',
      payload: {
        totalRounds,
        turnTime,
        username,
        room: 'asd'
      }
    })
  }

  return (
    <GameContext.Provider value={{ ...state, createGame }}>
      {children}
    </GameContext.Provider>
  )
}
