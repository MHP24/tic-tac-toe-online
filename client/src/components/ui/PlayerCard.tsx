import { type FC } from 'react'
import { type TGamePlayerSide } from '../../types'
import { useGame } from '../../hooks'

type Props = {
  player: TGamePlayerSide
  isTurn: boolean
  color: 'blue' | 'red'
  data: {
    wins: number
  }
}

export const PlayerCard: FC<Props> = ({ player, color, data: { wins } }) => {
  const { player: client } = useGame()

  return (
    <div className='text-2xl md:text-3xl lg:text-4xl'>
      <h3 className={`text-shadow-${color} text-2xl md:text-3xl lg:text-4xl inline-block`}>
        {player}
      </h3>
      { player === client && <h4 className={`text-shadow-${color} inline-block`}>{'- (You)'}</h4> }
      <h4>{wins} Wins</h4>
    </div>

  )
}
