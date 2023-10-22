import { useForm, type SubmitHandler } from 'react-hook-form'
import { Input, Button } from '../ui'
import { useGame } from '../../hooks'

type Inputs = {
  roomId: string
}

export const JoinGame = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
  const { joinGame } = useGame()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    joinGame(data.roomId)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className='flex flex-col items-center gap-7 py-5 max-w-md m-auto'
    >
      <h3 className='text-3xl font-primary text-shadow-red'>Enter room code</h3>
      <Input
        placeholder='Room code'
        type='text'
        key='input-room-code'
        {...register('roomId', { required: true })}
        hasError={Boolean(errors?.roomId)}
      />
      <div className='w-full max-w-sm m-auto'>
        <Button color='red' label='Join game' text='xl' height={3} onClick={() => {}}/>
      </div>
    </form>
  )
}
