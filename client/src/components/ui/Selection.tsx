import { type FC } from 'react'
import { type TSelection } from '../../types'
import { useGame } from '../../hooks'
import { colors, playerSelection } from '../../mocks'

type Props = {
  selection: TSelection
  coords: {
    i: number
    j: number
  }
}

export const Selection: FC<Props> = ({ selection, coords: { i, j } }) => {
  const { player, emitTurn, isTurn } = useGame()

  const select = () => {
    isTurn && emitTurn(i, j, playerSelection[player!] as TSelection)
  }

  return (
    <li
      onClick={select}
      className='grid items-center text-center border-2 border-gray-500 rounded-lg select-none aspect-square'
    >
      <p className={
        `w-full font-primary text-7xl md:text-8xl lg:text-9xl ${colors[selection]}`
      }>
        {selection}
      </p>
    </li>
  )
}
