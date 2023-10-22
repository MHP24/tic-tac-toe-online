const players = new Map<string, string>()

export const addPlayer = (playerId: string, roomId: string): void => {
  players.set(playerId, roomId)
}

export const drop = (playerId: string): void => {
  players.delete(playerId)
}

export const getRoom = (playerId: string): string | undefined => {
  return players.get(playerId)
}
