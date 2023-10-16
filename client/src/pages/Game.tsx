import { Table } from '../components/ui'
import { useGame } from '../hooks'

export const Game = () => {
  const { table } = useGame()

  return (
    <section className='h-screen flex flex-col pt-10 gap-5'>
      {/* Table */}
      {
        Boolean(table) && (
          <Table selections={table!}/>
        )
      }
    </section>
  )
}
