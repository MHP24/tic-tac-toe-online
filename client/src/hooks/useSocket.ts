import { useEffect, useState } from 'react'
import { io, type Socket } from 'socket.io-client'
import { type TSocketStatus } from '../types'

type TUseSocket = {
  socket?: Socket
  status: TSocketStatus
}

export const useSocket = (url: string) => {
  const [socketState, setSocketState] = useState<TUseSocket>({
    socket: undefined,
    status: 'offline'
  })

  const { socket, status } = socketState

  useEffect(() => {
    setSocketState({
      ...socketState,
      status: 'loading'
    })

    const socketConnection = io(url)

    socketConnection.on('connect', () => {
      setSocketState({
        ...socketState,
        socket: socketConnection,
        status: 'online'
      })
    })

    return () => {
      socketConnection.disconnect()
    }
  }, [])

  const on = (event: string, callback: (data: unknown) => void) => {
    socket?.on(event, callback)
  }

  const emit = (event: string, data: unknown) => {
    socket?.emit(event, data)
  }

  return {
    on,
    emit,
    socket,
    status
  }
}
