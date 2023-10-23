import { type FC, type PropsWithChildren, useReducer, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  type TGameStart,
  type TGameAssignment,
  type TGameSetupConfig,
  type TGameState,
  type TGameTurn,
  type TSelection,
  type TGameRound,
  type TGameFinish,
  type TGameClose,
  type TGameTurnEmit,
  type TGameFormattedConfig
} from '../../types'
import { GameContext, gameReducer } from '.'
import { useSocket } from '../../hooks'
import { generateId } from '../../utils'

const INITIAL_STATE: TGameState = {
  currentGames: 0,
  currentRound: 0,
  player: undefined,
  isTurn: false,
  sessionId: undefined,
  players: [],
  room: undefined,
  status: 'Creating',
  totalRounds: undefined,
  turnTime: undefined,
  table: undefined
}

export const GameContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)
  const {
    on, emit, status, socket, connect, disconnect
  } = useSocket(import.meta.env.VITE_SERVER_URL)
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'online') {
      dispatch({ type: '[Session] - Update ID', payload: `${socket?.id}` })

      on<TGameAssignment>('[Game] - Joined', addPlayer)
      on<TGameStart>('[Game] - Start', startGame)
      on<TGameTurn>('[Game] - Turn', receiveTurn)
      on<TGameRound>('[Game] - Next round', nextRound)
      on<TGameFinish>('[Game] - Finished', finishGame)
      on<TGameClose>('[Game] - Player disconnect', closeGame)
    }
  }, [status])

  const setupGame = ({ totalRounds, turnTime }: TGameSetupConfig) => {
    const roomId = generateId()
    emit<TGameFormattedConfig>('[Game] - Setup', {
      roomId,
      totalRounds: Number(totalRounds),
      turnTime: Number(turnTime)
    })
    return roomId
  }

  const joinGame = (roomId: string) => {
    emit<string>('[Game] - Join', roomId)
  }

  const createGame = (data: TGameSetupConfig) => {
    const roomId = setupGame(data)
    joinGame(roomId)
    dispatch({ type: '[Game] - Create', payload: roomId })
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

  const receiveTurn = (data: TGameTurn) => {
    data && (
      dispatch({ type: '[Game] - Receive turn', payload: data })
    )
  }

  const emitTurn = (i: number, j: number, selection: TSelection) => {
    emit<TGameTurnEmit>('[Game] - Turn', {
      i,
      j,
      selection,
      roomId: state.room!,
      player: state.player!
    })
  }

  const nextRound = (data: TGameRound) => {
    dispatch({ type: '[Game] - Next round', payload: data })
  }

  const finishGame = (data: TGameFinish) => {
    dispatch({ type: '[Game] - Finished', payload: data })
  }

  const closeGame = (data: TGameClose) => {
    dispatch({
      type: '[Game] - Close',
      payload: {
        initialState: INITIAL_STATE,
        status: data.status
      }
    })

    disconnect()
    connect()
    navigate('/?reason=closed')
  }

  return (
    <GameContext.Provider
      value={{
        ...state,
        createGame,
        joinGame,
        emitTurn
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
