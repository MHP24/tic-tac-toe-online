import { createPortal } from 'react-dom'

type Props = {
  isOpen: boolean
  close: () => void
}

export const Modal: React.FC<React.PropsWithChildren<Props>> = ({ isOpen, close, children }) => {
  return isOpen
    ? createPortal(
      <section className='fixed top-0 left-0 w-full h-screen
      z-20 flex items-center justify-center bg-c2-h px-4'>
        <div className='w-full max-w-xl bg-c4 max-h-[70vh] flex justify-center
      relative overflow-y-auto rounded-lg p-3 border-2 border-gray-600 mb-28'>
          <button className='absolute top-2 right-2 rounded-full hover:bg-c1 hover:opacity-80 bg-c2
          aspect-square grid items-center w-8 h-8 font-primary'
          onClick={close}
          >
            X
          </button>
          {children}
        </div>
      </section>,
      document.getElementById('root-modal')!
    )
    : null
}
