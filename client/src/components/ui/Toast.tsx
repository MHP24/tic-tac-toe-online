import { type FC } from 'react'

type Props = {
  isVisible: boolean
  text: string
}

export const Toast: FC<Props> = ({ isVisible, text }) => {
  return (
    <div className={`fixed top-4 lef-0 w-full animate__animated animate__toast 
    ${isVisible ? 'animate__slideInDown' : 'hidden'}`}
    >
      <h3 className='max-w-sm m-auto text-center font-primary text-lg border-2
      rounded-full border-gray-600 bg-c4 py-2'>
        {text}
      </h3>
    </div>
  )
}
