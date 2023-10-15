import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Lobby, Home } from './pages'

const App = () => {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/lobby" element={<Lobby/>}/>
        </Routes>
      </Router>
    </main>
  )
}

export default App
