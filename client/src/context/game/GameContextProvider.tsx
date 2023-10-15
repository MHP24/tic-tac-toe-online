import { type FC, type PropsWithChildren, useReducer, useEffect } from 'react'
import { type TGameSetupConfig, type TGameState } from '../../types'
import { GameContext, gameReducer } from '.'
import { useSocket } from '../../hooks'
import { generateId } from '../../utils'

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
  const { on, emit } = useSocket(import.meta.env.VITE_SERVER_URL)

  useEffect(() => {
    on('[Room] - Setup', (data) => { console.log({ data }) })
  }, [])

  const setupGame = ({ totalRounds, turnTime }: TGameSetupConfig) => {
    const roomId = generateId()

    emit('[Room] - Setup', {
      roomId,
      totalRounds,
      turnTime
    })

    // dispatch({
    //   type: '[Room] - Create',
    //   payload: {
    //     totalRounds,
    //     turnTime,
    //     room: roomId
    //   }
    // })
  }

  return (
    <GameContext.Provider value={{ ...state, setupGame }}>
      {children}
    </GameContext.Provider>
  )
}
