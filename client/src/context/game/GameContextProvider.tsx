import { type FC, type PropsWithChildren, useReducer, useEffect } from 'react'
import { type TGameStart, type TGameAssignment, type TGameSetupConfig, type TGameState } from '../../types'
import { GameContext, gameReducer } from '.'
import { useSocket } from '../../hooks'
import { generateId } from '../../utils'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'online') {
      dispatch({ type: '[Session] - Update ID', payload: `${socket?.id}` })

      on<TGameAssignment>('[Game] - Joined', addPlayer)
      on<TGameStart>('[Game] - Start', startGame)
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

  const addPlayer = (data: TGameAssignment) => {
    const { player, sessionId, players } = data
    dispatch({
      type: '[Game] - Add player',
      payload: {
        player,
        sessionId,
        players
      }
    })
  }

  const startGame = (data: TGameStart) => {
    dispatch({ type: '[Game] - Start', payload: data })
    navigate('/game')
  }

  return (
    <GameContext.Provider value={{ ...state, createGame, joinGame }}>
      {children}
    </GameContext.Provider>
  )
}
