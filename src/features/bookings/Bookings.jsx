import { useGetBookingsQuery } from "./bookingsApiSlice"
import { useGetCustomersQuery } from "../customers/customersApiSlice"
import { useGetRoomsQuery } from "../rooms/roomsApiSlice"
import { ColorRing } from "react-loader-spinner"
import BookingsCalendar from "./BookingsCalendar"
import { Button } from "@mui/material"
import { AddCircleOutline } from "@mui/icons-material"
import { lightBlue } from "@mui/material/colors"
import NewBookingForm from "./NewBookingForm"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Bookings = () => {
  const {
    data:bookings,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBookingsQuery('bookingsList')

  const {data:customers,
         isSuccess:customersIsSuccess} = useGetCustomersQuery('customersList')

  const {data:rooms,
         isSuccess:roomsIsSuccess} = useGetRoomsQuery('roomsList')

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
  } else if (isSuccess ){

    const {ids, entities} = bookings

    content = (
      <section className="bookings">
          <h1 className="main_title">BOOKINGS</h1>
          <div className="btn_container">
                <Button variant="contained" color="success" sx={{width:'80%', margin:'0 auto', fontFamily:'Dosis',fontSize:'1.55em', gap:'10px'}} onClick={handleClickOpen}><AddCircleOutline sx={{color:lightBlue[500],}}/>Add Booking</Button>
                <NewBookingForm open={open} handleClose={handleClose} customers={customers} rooms={rooms}  bookings={bookings}/>
                </div>
                <div className="calendar_container">
                <BookingsCalendar bookings={bookings} customers={customers} rooms={rooms} />
                </div>
              
      </section>
      
      )

  }else if(isError){

    content = (
      <section className="bookings">
          <h1 className="main_title">BOOKINGS</h1>
          <div className="btn_container">
                <Button variant="contained" color="success" sx={{width:'80%', margin:'0 auto', fontFamily:'Dosis',fontSize:'1.55em', gap:'10px'}} onClick={handleClickOpen}><AddCircleOutline sx={{color:lightBlue[500],}}/>Add Booking</Button>
                <NewBookingForm open={open} handleClose={handleClose} customers={customers} rooms={rooms}  bookings={bookings}/>
                </div>
               <h1 className="main_title">NO BOOKINGS FOUND</h1>
              
      </section>
    )  
}

  return content
}

export default Bookings