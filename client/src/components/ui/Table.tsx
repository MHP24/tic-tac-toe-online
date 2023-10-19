import { type FC } from 'react'
import { type TSelection } from '../../types'
import { Selection } from '.'

type Props = {
  selections: TSelection[][]
}

export const Table: FC<Props> = ({ selections }) => {
  return (
    <ol className='grid grid-cols-3 gap-4 m-auto
      w-full h-full'>
      {
        selections.map(([x, y, z], i) => (
          <>
            <Selection key={`selector-${i}-x`} selection={x} coords={{ i, j: 0 }}/>
            <Selection key={`selector-${i}-y`} selection={y} coords={{ i, j: 1 }}/>
            <Selection key={`selector-${i}-z`} selection={z} coords={{ i, j: 2 }}/>
          </>
        ))
      }
    </ol>
  )
}
