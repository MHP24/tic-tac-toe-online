import { type FC, type PropsWithChildren, useReducer, useEffect } from 'react'
import { type TGameFormattedConfig, type TGameSetupConfig, type TGameState } from '../../types'
import { GameContext, gameReducer } from '.'
import { useSocket } from '../../hooks'
import { generateId } from '../../utils'

const INITIAL_STATE: TGameState = {
  currentRound: 0,
  player: undefined,
  sessionId: undefined,
  players: [],
  room: undefined,
  status: 'Creating',
  totalRounds: undefined,
  turnTime: undefined
}

export const GameContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)
  const { on, emit, status, socket } = useSocket(import.meta.env.VITE_SERVER_URL)

  useEffect(() => {
    if (status === 'online') {
      dispatch({ type: '[Session] - Update ID', payload: `${socket?.id}` })

      // on<TGameFormattedConfig>('[Game] - Setup', createGame)
      on<TGameFormattedConfig>('[Game] - Joined', addPlayer)
      // on start
    }
  }, [status])

  // Request for a game as host
  const setupGame = ({ totalRounds, turnTime }: TGameSetupConfig) => {
    const roomId = generateId()
    emit('[Game] - Setup', {
      roomId,
      totalRounds,
      turnTime
    })
    return roomId
  }

  const joinGame = (roomId: string) => {
    emit('[Game] - Join', roomId)
  }

  const createGame = (data: TGameSetupConfig) => {
    const roomId = setupGame(data)
    joinGame(roomId)
    dispatch({ type: '[Game] - Create' })
  }

  const addPlayer = (data: TGameFormattedConfig) => {
    const { player, sessionId, players } = data
    dispatch({
      type: '[Game] - Add player',
      payload: {
        player: player as 'P1' | 'P2',
        sessionId: sessionId!,
        players: players!
      }
    })
  }

  const startGame = (data: any) => {

    // dispatch({type: '[Game] - Start', payload: })
  }

  return (
    <GameContext.Provider value={{ ...state, createGame, joinGame }}>
      {children}
    </GameContext.Provider>
  )
}
