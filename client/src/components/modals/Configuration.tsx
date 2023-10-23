import { type SubmitHandler, useForm } from 'react-hook-form'
import { regex } from '../../utils'
import { Input, Button } from '../ui'
import { useNavigate } from 'react-router-dom'

type Inputs = {
  time: number
  rounds: number
}

export const Configuration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    navigate(`/lobby?rounds=${data.rounds}&time=${data.time}`)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className='flex flex-col items-center gap-7 py-5 max-w-md m-auto'
    >
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
      <div className='w-full max-w-sm m-auto'>
        <Button color='blue' label='Create' height={3} text='xl' onClick={() => {}}/>
      </div>
    </form>
  )
}
