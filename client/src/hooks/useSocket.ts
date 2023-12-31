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

  const on = <T>(event: string, callback: (data: T) => void) => {
    socket?.on(event, callback)
  }

  const emit = <T>(event: string, data: T) => {
    socket?.emit(event, data)
  }

  const connect = () => {
    socket?.connect()
  }

  const disconnect = () => {
    if (socket) {
      socket.disconnect()
      setSocketState({
        ...socketState,
        socket: undefined,
        status: 'offline'
      })
    }
  }

  return {
    on,
    emit,
    socket,
    status,
    connect,
    disconnect
  }
}
