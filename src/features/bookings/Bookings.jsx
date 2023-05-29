import { useGetBookingsQuery } from "./bookingsApiSlice"
import { useGetCustomersQuery } from "../customers/customersApiSlice"
import { useGetRatesQuery } from "../rates/ratesApiSlice"
import { useGetRoomsQuery } from "../rooms/roomsApiSlice"
import { Link } from "react-router-dom"
import { ColorRing } from "react-loader-spinner"
import BookingsCalendar from "./BookingsCalendar"
import { Button } from "@mui/material"
import { AddCircleOutline } from "@mui/icons-material"
import { lightBlue } from "@mui/material/colors"
import NewBookingForm from "./NewBookingForm"
import { useState } from "react"


const Bookings = () => {
  const {
    data:bookings,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBookingsQuery()
 
  const {data:customers} = useGetCustomersQuery()

  const {data:rooms} = useGetRoomsQuery()

  const {data:rates} = useGetRatesQuery()

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  let content

  

  if(isLoading){
    content = <div className="spinner">
    <ColorRing
visible={true}
height="200"
width="200"
ariaLabel="blocks-loading"
wrapperStyle={{}}
wrapperClass="blocks-wrapper"
colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
</div>
  } else if (isSuccess && customers && rooms && rates){

    const {ids, entities} = bookings

    content = (
      <section className="bookings">
          <h1 className="main_title">BOOKINGS</h1>
          <div className="btn_container">
                <Button variant="contained" color="success" sx={{width:'80%', margin:'0 auto', fontFamily:'Dosis',fontSize:'1.55em', gap:'10px'}} onClick={handleClickOpen}><AddCircleOutline sx={{color:lightBlue[500],}}/>Add Booking</Button>
                <NewBookingForm open={open} handleClose={handleClose}/>
                </div>
                <div className="calendar_container">
                <BookingsCalendar bookings={bookings} customers={customers} rooms={rooms} rates={rates}/>
                </div>
              
      </section>
      
      )
/*
  content = (
      <section className="bookings">
          <h1 className="main_title">BOOKINGS</h1>
          <ul>
              {ids.map((bookingId, i) =>{
              return <li key={i}>
                  <h2>INCOME: {entities[bookingId].income}</h2>
                  <h2>OUTCOME: {entities[bookingId].outcome}</h2>
                  <h2>ROOM: {entities[bookingId].room}</h2>
                  <h2>PAX: {entities[bookingId].pax}</h2>
                  <h2>CLIENT: {entities[bookingId].client}</h2>
                  <h2>VALUE: {entities[bookingId].value}</h2>
                  <h2>DISCOUNT: {entities[bookingId].discount}</h2>
                  <h2>TOTAL VALUE:{entities[bookingId].totalValue}</h2>
                  <h2>NOTE: {entities[bookingId].note}</h2>
              </li>
              })}
          </ul>
        
          <Link to="/welcome">Back to Welcome</Link>
          <BookingsCalendar bookings={bookings} customers={customers} rooms={rooms} rates={rates}/>    
      </section>
      )
*/

  }else if(isError){
      content = <p>{JSON.stringify(error)}</p>
  }

  return content
}

export default Bookings