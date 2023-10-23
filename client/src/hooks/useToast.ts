import { useEffect, useState } from 'react'

export const useToast = (fadeTime: number, isVisible: boolean = false) => {
  const [visible, setVisible] = useState<boolean>(isVisible)

  useEffect(() => {
    const tout = visible
      ? setTimeout(() => {
        setVisible(false)
      }, fadeTime)
      : undefined

    return () => {
      clearTimeout(tout)
    }
  }, [visible])

  const showToast = () => {
    setVisible(true)
  }

  const hideToast = () => {
    setVisible(false)
  }

  return {
    isVisible: visible,
    showToast,
    hideToast
  }
}
