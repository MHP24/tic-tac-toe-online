import { useGame } from '../hooks'

export const Game = () => {
  const data = useGame()

  return (
    <div>{JSON.stringify(data)}</div>
  )
}
