import { type FC } from 'react'
import { type TGameStatus, type TGamePlayer } from '../../types'
import { Modal } from '.'
import { Button } from '../ui'
import { colors, playerSelection } from '../../mocks'
import { useNavigate } from 'react-router-dom'

type Props = {
  players: TGamePlayer[]
  totalRounds: number
  status: TGameStatus
}

export const Summary: FC<Props> = ({ players, totalRounds, status }) => {
  const [p1, p2] = players
  const navigate = useNavigate()

  return (
    <Modal isOpen={status === 'Finished'}>
      <div className='flex flex-col items-center gap-5 font-primary w-full py-5'>
        <h3 className='text-3xl md:text-4xl'>
          {
            `${p1.data.wins === p2.data.wins
              ? 'Tie'
              : '🏆 Player ' + (p1.data.wins > p2.data.wins ? '1' : '2') + ' wins 🏆'
            }`
          }
        </h3>
        <h4 className='text-2xl md:text-3xl'>Round count: {totalRounds}</h4>

        <ol className='flex items-center gap-5 w-full my-10'>
          {
            players.map(({ data, player }, i) => (
              <li key={`player-${player}-${i}`} className='w-full text-center'>
                <h3 className={`text-2xl md:text-3xl ${colors[playerSelection[player]]}`}>Player {player}</h3>
                <h4 className='text-2xl md:text-3xl'>{`${data.wins} Win${data.wins > 1 || data.wins === 0 ? 's' : ''}`}</h4>
              </li>
            ))
          }
        </ol>

        <div className='w-full max-w-sm m-auto'>
          <Button onClick={() => { navigate('/') }} color='red' label='Return to home' height={3} text='xl'/>

        </div>
      </div>
    </Modal>
  )
}
