import { useState } from 'react'
import { Button, Modal } from '../components/ui'
import { useGame, useModal, useQuery } from '../hooks'
import { Configuration, JoinGame, Leave } from '../components/modals'

export const Home = () => {
  const { open, ...rest } = useModal()
  const [option, setOption] = useState<'join' | 'create'>('create')

  const { currentGames } = useGame()
  const query = useQuery()

  const selectOption = (option: 'join' | 'create') => {
    setOption(option)
    open()
  }

  return (
    <>
      <Modal {...rest}>
        {
          <div className='w-md text-center'>
            {
              option === 'join'
                ? <JoinGame/>
                : <Configuration/>
            }
          </div>
        }
      </Modal>

      <Leave reason={query.get('reason') ?? ''}/>

      <section className='flex flex-col gap-16 justify-center h-screen p-10'>
        <h1 className='font-primary text-6xl md:text-7xl lg:text-8xl
          text-center text-shadow-blue italic'>
          Tic tac toe <br/><span className='text-shadow-red'>Online</span>
        </h1>
        <h2 className='font-primary text-center text-2xl md:text-3xl'>Matches active now: {currentGames}</h2>
        <div className='flex flex-col items-center gap-10'>
          <Button label='Join game' color='red' onClick={() => { selectOption('join') }}/>
          <Button label='Create new game' color='blue' onClick={() => { selectOption('create') }}/>
        </div>
      </section>
    </>
  )
}
