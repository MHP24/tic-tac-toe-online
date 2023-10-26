import { Navigate, Outlet } from 'react-router-dom'
import { useGame } from '../hooks'
import { publicRoutes } from '../mocks'

export const GameGuard = () => {
  const { room: hasGame } = useGame()

  return hasGame ? <Outlet/> : <Navigate replace to={publicRoutes.home}/>
}
