import { createContext } from 'react'
import { type TGameProvider } from '../../types'

export const GameContext = createContext<TGameProvider | undefined>(undefined)
