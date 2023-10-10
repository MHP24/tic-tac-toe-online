import { useState } from 'react'
import { Button, Input, Modal } from '../components/ui'
import { useModal } from '../hooks'

export const Home = () => {
  const { open, ...rest } = useModal()
  const [option, setOption] = useState<'join' | 'create'>('create')

  const selectOption = (option: 'join' | 'create') => {
    setOption(option)
    open()
  }

  return (
    <>
      <Modal {...rest}>
        {
          option === 'join'
            ? <div className='w-full'>
              <form className='flex flex-col items-center gap-7 py-5 max-w-md m-auto'>
                <h3 className='text-3xl font-primary text-shadow-red'>Enter room code</h3>
                <Input placeholder='Room code' type='text' key='input-room-code'/>
              </form>
            </div>
            : <div className='w-full text-center'>
              <form className='flex flex-col items-center gap-7 py-5 max-w-md m-auto'>
                <h3 className='text-3xl font-primary text-shadow-red'>Room configuration</h3>

                <div className='grid grid-cols-2 gap-3 items-cneter'>
                  <label className='font-primary text-left'>
                    {'Time per turn  (default 30s)'}
                  </label>
                  <Input placeholder='segs' type='number' key='input-segs-config'/>
                </div>

                <div className='grid grid-cols-2 gap-3 items-center'>
                  <label className='font-primary text-left'>
                    {'Rounds (default 3)'}
                  </label>
                  <Input placeholder='rounds' type='number' key='input-rounds-config'/>
                </div>

                <div className='w-60 mt-3'>
                  <Button color='blue' label='Create' height={2} onClick={() => {}}/>
                </div>

              </form>
            </div>
        }
      </Modal>

      <section className='flex flex-col gap-16 justify-center h-screen bg-bg bg-fixed bg-center bg-cover p-10'>
        <h1 className='font-primary text-6xl md:text-7xl lg:text-8xl text-center text-shadow-blue italic'>Tic tac toe
          <br/><span className='text-shadow-red'>Online</span></h1>
        <h2 className='font-primary text-center text-2xl md:text-3xl'>Matches active now: 10</h2>
        <div className='flex flex-col items-center gap-10'>
          <Button label='Join game' color='red' onClick={() => { selectOption('join') }}/>
          <Button label='Create new game' color='blue' onClick={() => { selectOption('create') }}/>
        </div>
      </section>
    </>
  )
}
