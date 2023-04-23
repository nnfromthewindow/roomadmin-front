import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PublicLayout from './components/PublicLayout'
import UserLayout from './components/UserLayout'
import './App.css'

function App() {

  return (
<Routes>
    <Route path="/" element={<PublicLayout/>}/>
</Routes>
  
  )
}

export default App
