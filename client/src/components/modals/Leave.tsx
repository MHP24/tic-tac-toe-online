import { type FC } from 'react'
import { useModal } from '../../hooks'
import { Modal } from '../ui'

type Props = {
  reason: string
}

export const Leave: FC<Props> = ({ reason }) => {
  const modal = useModal(reason === 'closed')

  return (
    <Modal {...modal}>
      <h3 className='font-primary text-center text-xl md:text-2xl py-10'>
        Your opponent has disconnected from the game
      </h3>
    </Modal>
  )
}
