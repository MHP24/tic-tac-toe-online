import { type FC } from 'react'
import { type TSelection } from '../../types'
import { useGame } from '../../hooks'
import { playerSelection } from '../../mocks'

type Props = {
  selection: TSelection
  coords: {
    i: number
    j: number
  }
}

const colors = {
  X: 'text-shadow-blue',
  O: 'text-shadow-red',
  '': ''
}

export const Selection: FC<Props> = ({ selection, coords: { i, j } }) => {
  const { player, emitTurn } = useGame()

  const select = () => {
    emitTurn(i, j, playerSelection[player!] as TSelection)
  }

  return (
    <div
      onClick={select}
      className='grid items-center text-center border-2 border-gray-500 rounded-lg select-none'
    >
      <p className={
        `w-full font-primary text-7xl lg:text-9xl ${colors[selection]}`
      }>
        {selection}
      </p>
    </div>
  )
}
