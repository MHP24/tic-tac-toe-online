import { Navigate, Outlet } from 'react-router-dom'
import { useGame } from '../hooks'
import { publicRoutes } from '../mocks'

export const GameGuard = () => {
  const { status } = useGame()

  return (
    ['Started', 'Finished', 'Closed'].includes(status)
      ? <Outlet/>
      : <Navigate replace to={publicRoutes.home}/>
  )
}
