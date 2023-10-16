import { type FC } from 'react'
import { type TSelection } from '../../types'

type Props = {
  selection: TSelection
}

const colors = {
  X: 'text-shadow-blue',
  O: 'text-shadow-red',
  '': ''
}

export const Selection: FC<Props> = ({ selection }) => {
  const border = selection !== '' ? 'border-white' : 'border-gray-600'
  return (
    <div className={`grid items-center text-center
     border-2 ${border} rounded-md select-none`
    }
    >
      <p className={
        `w-full font-primary text-6xl md:text-7xl lg:text-9xl ${colors[selection]}`
      }>
        {selection}
      </p>
    </div>
  )
}
