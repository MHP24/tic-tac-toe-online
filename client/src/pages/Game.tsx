import { Table } from '../components/ui'
import { useGame } from '../hooks'
import { type TSelection } from '../types'

export const Game = () => {
  const data = useGame()

  const matrix: TSelection[][] = [
    ['X', '', 'O'],
    ['', 'X', ''],
    ['O', '', 'X']
  ]

  return (
    <section className='h-screen flex flex-col pt-10 gap-5'>
      {/* Table */}
      <Table selections={matrix}/>
    </section>
  )
}
