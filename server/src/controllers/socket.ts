import { type Socket } from 'socket.io'

export const initializeConnection = (socket: Socket): void => {
  console.log({ socket })
}
