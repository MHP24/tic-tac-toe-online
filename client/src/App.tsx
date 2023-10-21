import {
  Routes,
  Route
} from 'react-router-dom'
import { Lobby, Home, Game, Summary } from './pages'

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/lobby" element={<Lobby/>}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="/summary" element={<Summary/>}/>
      </Routes>
    </main>
  )
}

export default App
