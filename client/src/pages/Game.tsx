import { Table } from '../components/ui'
import { useGame } from '../hooks'

export const Game = () => {
  const { table, players, player: client } = useGame()

  return (
    <section className='h-screen flex flex-col pt-10 gap-5'>

      {
        players.find(({ player }) => player === client)?.data.isPlaying && (
          // TODO: create timer component
          <p>Is your turn! time remaining {}s</p>
        )
      }

      {/* Table */}
      {
        Boolean(table) && (
          <Table selections={table!}/>
        )
      }
    </section>
  )
}
