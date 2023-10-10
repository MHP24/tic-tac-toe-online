import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Game, Home } from './pages'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/game" element={<Game/>}/>
      </Routes>
    </Router>
  )
}

export default App
