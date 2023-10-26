import {
  Route,
  Routes
} from 'react-router-dom'
import { Lobby, Home, Game } from './pages'
import { publicRoutes, privateRoutes } from './mocks'
import { GameGuard } from './guards'

const App = () => {
  return (
    <main>
      <Routes>
        <Route element={<GameGuard/>}>
          <Route path={privateRoutes.game} element={<Game/>}/>
        </Route>
        <Route path={privateRoutes.lobby} element={<Lobby/>}/>
        <Route path={publicRoutes.home} element={<Home/>}/>
      </Routes>
    </main>
  )
}

export default App
