import { useEffect } from 'react'
import { useGame, useQuery } from '../hooks'
import { Button, Loader, Toast } from '../components/ui'
import { useToast } from '../hooks/useToast'

export const Lobby = () => {
  const { createGame, room } = useGame()
  const { isVisible, showToast } = useToast(1000)
  const query = useQuery()

  useEffect(() => {
    const totalRounds = query.get('rounds') ?? 3
    const turnTime = query.get('time') ?? 30

    createGame({
      totalRounds,
      turnTime
    })
  }, [])

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    showToast()
  }

  return (
    <section className='h-screen p-10 text-center
      flex flex-col gap-10 items-center justify-evenly
      max-w-5xl m-auto'>

      <Toast text='Lobby ID Copied to clipboard ✔️' isVisible={isVisible}/>

      <div className='flex flex-col gap-6'>
        <h1 className='text-5xl md:text-6xl lg:text-7xl font-primary text-shadow-red'>Lobby</h1>
        <h2 className='text-5xl md:text-6xl lg:text-7xl font-primary text-shadow-blue'>Waiting for Rival</h2>
      </div>
      <Loader/>
      {
        Boolean(room) && (
          <Button color='blue' label='Share room' onClick={async () => { await copyToClipboard(room!) }}/>
        )
      }
    </section>

  )
}
