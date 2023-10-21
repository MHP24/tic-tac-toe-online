import { type FC } from 'react'
import { type TSelection } from '../../types'
import { Selection } from '.'
import { useGame } from '../../hooks'

type Props = {
  selections: TSelection[][]
}

export const Table: FC<Props> = ({ selections }) => {
  const { player } = useGame()
  return (
    <ol className='grid grid-cols-3 gap-4 m-auto
      w-full h-full'>
      {
        selections.map(([x, y, z], i) => (
          <>
            <Selection key={`selector-${i}-x-${player}`} selection={x} coords={{ i, j: 0 }}/>
            <Selection key={`selector-${i}-y-${player}`} selection={y} coords={{ i, j: 1 }}/>
            <Selection key={`selector-${i}-z-${player}`} selection={z} coords={{ i, j: 2 }}/>
          </>
        ))
      }
    </ol>
  )
}
