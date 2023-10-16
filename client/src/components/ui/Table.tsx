import { type FC } from 'react'
import { type TSelection } from '../../types'
import { Selection } from '.'

type Props = {
  selections: TSelection[][]
}

export const Table: FC<Props> = ({ selections }) => {
  return (
    <div className='grid grid-cols-3 grid-rows-3 gap-4 m-auto
      w-[28rem] h-[28rem] md:w-[34rem] md:h-[34rem] lg:w-[45rem] lg:h-[45rem]'>
      {
        selections.map(([x, y, z]) => (
          <>
            <Selection selection={x}/>
            <Selection selection={y}/>
            <Selection selection={z}/>
          </>
        ))
      }
    </div>
  )
}
