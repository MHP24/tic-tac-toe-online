import { useEffect } from 'react'
import { useGame, useQuery } from '../hooks'

export const Lobby = () => {
  const { setupGame } = useGame()
  const query = useQuery()

  useEffect(() => {
    const totalRounds = query.get('rounds') ?? 3
    const turnTime = query.get('time') ?? 30
    setupGame({
      totalRounds,
      turnTime
    })
  }, [])

  return (
    <section className='h-screen bg-bg bg-fixed bg-center bg-cover p-10'>
      <h1>Lobby</h1>
      <h2>Waiting for <br/>Rival</h2>
      <p>Loading...</p>
      <button>Share game</button>
    </section>

  )
}
