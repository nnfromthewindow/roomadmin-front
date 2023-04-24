import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PublicLayout from './components/PublicLayout'
import UserLayout from './components/UserLayout'
import './App.css'
import Login from './features/auth/Login'
import Welcome from './features/auth/Welcome'
import RequireAuth from './features/auth/requireAuth'


function App() {

  return (
<Routes>
    <Route path="/" element={<PublicLayout/>}>
      <Route index element={<Login/>}/>
      
      <Route element={<RequireAuth/>}>
        <Route path='todos' element={<Welcome/>}/>
      </Route>
    </Route>
</Routes>
  
  )
}

export default App
