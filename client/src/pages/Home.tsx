import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Button, Input, Modal } from '../components/ui'
import { useModal } from '../hooks'
import { regex } from '../utils'
import { useNavigate } from 'react-router-dom'

type Inputs = {
  time: number
  rounds: number
}

export const Home = () => {
  const { open, ...rest } = useModal()
  const [option, setOption] = useState<'join' | 'create'>('create')

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
  const navigate = useNavigate()

  const selectOption = (option: 'join' | 'create') => {
    setOption(option)
    open()
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    navigate(`/lobby?rounds=${data.rounds}&time=${data.time}`)
  }

  return (
    <>
      <Modal {...rest}>
        {
          <div className='w-md text-center'>
            <form className='flex flex-col items-center gap-7 py-5 max-w-md m-auto'
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              {
                option === 'join'
                  ? <>
                    <h3 className='text-3xl font-primary text-shadow-red'>Enter room code</h3>
                    <Input
                      placeholder='Room code'
                      type='text'
                      key='input-room-code'
                    />
                  </>
                  : <>
                    <h3 className='text-3xl font-primary text-shadow-red mb-3'>Room configuration</h3>
                    <Input
                      placeholder='Seconds'
                      type='number'
                      key='input-segs-config'
                      label='Time per run'
                      hasError={Boolean(errors?.time)}
                      {...register('time', { required: true, pattern: regex.numbersOnly })}
                    />
                    <Input
                      placeholder='Count'
                      type='number'
                      key='input-rounds-config'
                      label='Total rounds'
                      hasError={Boolean(errors?.rounds)}
                      {...register('rounds', { required: true, pattern: regex.numbersOnly })}
                    />
                    <Button color='blue' label='Create' height={3} onClick={() => {}}/>
                  </>
              }
            </form>
          </div>
        }
      </Modal>

      <section className='flex flex-col gap-16 justify-center h-screen
        bg-bg bg-fixed bg-center bg-cover p-10'>
        <h1 className='font-primary text-6xl md:text-7xl lg:text-8xl
          text-center text-shadow-blue italic'>
          Tic tac toe <br/><span className='text-shadow-red'>Online</span>
        </h1>
        <h2 className='font-primary text-center text-2xl md:text-3xl'>Matches active now: 10</h2>

        <div className='flex flex-col items-center gap-10'>
          <Button label='Join game' color='red' onClick={() => { selectOption('join') }}/>
          <Button label='Create new game' color='blue' onClick={() => { selectOption('create') }}/>
        </div>
      </section>
    </>
  )
}
