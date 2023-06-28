import { store } from "../../app/store"
import { todosApiSlice } from "../todos/todosApiSlice"
import { bookingsApiSlice } from "../bookings/bookingsApiSlice"
import { customersApiSlice } from "../customers/customersApiSlice"
import { usersApiSlice } from "../users/usersApiSlice"
import { ledgerApiSlice } from "../ledger/ledgerApiSlice"
import { roomsApiSlice } from "../rooms/roomsApiSlice"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Prefetch = () => {
  
    const {isAdmin, username} = useAuth()

    useEffect(()=>{
        if(isAdmin){
            store.dispatch(todosApiSlice.util.prefetch('getTodos','todosList', {force: true}))
            store.dispatch(bookingsApiSlice.util.prefetch('getBookings','bookingsList',{force:true}))
            store.dispatch(customersApiSlice.util.prefetch('getCustomers','customersList',{force:true}))
            store.dispatch(usersApiSlice.util.prefetch('getUsers','usersList',{force:true}))
            store.dispatch(ledgerApiSlice.util.prefetch('getLedger','ledgerList',{force:true}))
            store.dispatch(roomsApiSlice.util.prefetch('getRooms', 'roomsList',{force:true}))
        
        }else{
            store.dispatch(todosApiSlice.util.prefetch('getTodosByUser', username, {force:true}))
        }
     },[])

    return <Outlet/>
}

export default Prefetch