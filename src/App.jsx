import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PublicLayout from './components/PublicLayout'
import UserLayout from './components/UserLayout'
import './App.css'
import Login from './components/Login'

function App() {

  return (
<Routes>
    <Route path="/" element={<PublicLayout/>}>
      <Route index element={<Login/>}/>
    </Route>
</Routes>
  
  )
}

export default App
