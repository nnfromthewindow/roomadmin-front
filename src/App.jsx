import { Routes, Route } from 'react-router-dom'
import PublicLayout from './components/PublicLayout'
import PrivateLayout from './components/PrivateLayout'
//import './App.css'
import Login from './features/auth/Login'
import Welcome from './features/auth/Welcome'
import RequireAuth from './features/auth/requireAuth'
import TodosList from './features/todos/TodosList'
import TodosUserList from './features/todos/TodosUserList'
import Bookings from './features/bookings/Bookings'
import CustomersList from './features/customers/CustomersList'
import UsersList from './features/users/UsersList'
import Ledger from './features/ledger/Ledger'
import Rooms from './features/rooms/Rooms'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'


function App() {

  return (
<Routes>
    <Route path="/" element={<PublicLayout/>}>
      <Route index element={<Login/>}/>
    </Route>
    <Route element={<PersistLogin/>}> 
      <Route element={<RequireAuth/>}>
        <Route element={<Prefetch/>}>
          <Route element={<PrivateLayout/>}>
            <Route path='welcome' element={<Welcome/>}/>
            <Route path='todos' element={<TodosList/>}/>
            <Route path='todos/:username' element={<TodosUserList/>}/>
            <Route path='bookings' element={<Bookings/>}/>
            <Route path='customers' element={<CustomersList/>}/>
            <Route path='users' element={<UsersList/>}/>
            <Route path='ledger' element={<Ledger/>}/>
            <Route path='rooms' element={<Rooms/>}/>
          </Route>
        </Route>
      </Route>
    </Route>
</Routes>
  
  )
}

export default App
