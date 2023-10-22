import { PlayerCard, Summary, Table } from '../components/ui'
import { useGame } from '../hooks'
import { colors, playerSelection } from '../mocks'

export const Game = () => {
  const { table, isTurn, currentRound, players, totalRounds, status } = useGame()
  const [p1, p2] = players
  const turn = players.find(({ data }) => data.isPlaying)!.player

  return (
    <>
      <Summary {...{ players, status, totalRounds: totalRounds! }}/>

      <section className='h-screen flex flex-col pt-10 gap-5'>

        <div className='text-center font-primary h-[10vh] grid grid-cols-3 relative'>
          <PlayerCard {...{ isTurn: isTurn!, ...p1, color: 'blue' }}/>
          <div>
            <h2 className='text-4xl lg:text-5xl'>Round {currentRound}/{totalRounds}</h2>
            <h3 className={`text-3xl lg:text-4xl mt-4 ${colors[playerSelection[turn]]}`}>
              {`${turn}'s turn`}
            </h3>
          </div>
          <PlayerCard {...{ isTurn: isTurn!, ...p2, color: 'red' }}/>
        </div>

        <div className='max-w-xl m-auto w-full aspect-square'>
          {
            Boolean(table) && (
              <Table selections={table!}/>
            )
          }
        </div>

      </section>
    </>
  )
}
