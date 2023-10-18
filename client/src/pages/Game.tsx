import { Table } from '../components/ui'
import { useGame } from '../hooks'

export const Game = () => {
  const { table, isTurn } = useGame()

  return (
    <section className='h-screen flex flex-col pt-10 gap-5'>

      {
        // TODO: create timer component

        isTurn && <p className='fixed '>Is your turn! time remaining {}s</p>
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
