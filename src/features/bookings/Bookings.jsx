import { useGetBookingsQuery } from "./bookingsApiSlice"
import { useGetCustomersQuery } from "../customers/customersApiSlice"
import { useGetRoomsQuery } from "../rooms/roomsApiSlice"
import { ColorRing } from "react-loader-spinner"
import Button  from "@mui/material/Button"
import  AddCircleOutline  from "@mui/icons-material/AddCircleOutline"
import  lightBlue  from "@mui/material/colors/lightBlue"
import NewBookingForm from "./NewBookingForm"
import { useState, useMemo, lazy, Suspense } from "react"

const BookingsCalendar = lazy(() => import( "./BookingsCalendar"));

const Bookings = () => {
  const {
    data:bookings,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBookingsQuery('bookingsList',{
   // refetchOnFocus:true
  })
    
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

  const memoizedNewBookingForm = useMemo(()=>{
return  <NewBookingForm open={open} handleClose={handleClose} customers={customers} rooms={rooms}  bookings={bookings}/>
  },[bookings])  

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
                 <Suspense fallback={<div>Loading...</div>}>
                 <BookingsCalendar bookings={bookings} customers={customers} rooms={rooms} />
                 </Suspense> 
                </div>
              
      </section>
      
      )

  }else if(isError){

    content = (
      <section className="bookings">
          <h1 className="main_title">BOOKINGS</h1>
          <div className="btn_container">
                <Button variant="contained" color="success" sx={{width:'80%', margin:'0 auto', fontFamily:'Dosis',fontSize:'1.55em', gap:'10px'}} onClick={handleClickOpen}><AddCircleOutline sx={{color:lightBlue[500],}}/>Add Booking</Button>
               {memoizedNewBookingForm}
                </div>
               <h1 className="main_title">NO BOOKINGS FOUND</h1>
              
      </section>
    )  
}

  return content
}

export default Bookings