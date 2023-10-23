import { type FC } from 'react'
import { useModal } from '../../hooks'
import { type TGameStatus } from '../../types'
import { Modal } from '../ui'

type Props = {
  status: TGameStatus
}

export const Leave: FC<Props> = ({ status }) => {
  const modal = useModal(status === 'Closed')

  return (
    <Modal {...modal}>
      <h3 className='font-primary text-center text-xl md:text-2xl py-10'>
        Your opponent has disconnected from the game
      </h3>
    </Modal>
  )
}
