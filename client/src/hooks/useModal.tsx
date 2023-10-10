import { useState } from 'react'

export const useModal = (starts: boolean = false) => {
  const [isOpen, setIsOpen] = useState(starts)

  const open = () => { setIsOpen(true) }
  const close = () => { setIsOpen(false) }

  return {
    open,
    close,
    isOpen
  }
}
