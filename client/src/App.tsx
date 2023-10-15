import {
  Routes,
  Route
} from 'react-router-dom'
import { Lobby, Home, Game } from './pages'

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/lobby" element={<Lobby/>}/>
        <Route path="/game" element={<Game/>}/>
      </Routes>
    </main>
  )
}

export default App
