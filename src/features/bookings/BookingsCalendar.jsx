import { Calendar, momentLocalizer,Views } from "react-big-calendar";
import moment from "moment";
import EditBookingForm from "./EditBookingForm";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useMemo, useRef, useState, useEffect, useCallback } from "react";


const BookingsCalendar = ({bookings, customers, rooms, rates}) =>  {

  const localizer = momentLocalizer(moment);

  const [selectedBooking, setSelectedBooking] = useState('')
  const [open, setOpen] = useState(false);

  const clickRef = useRef(null)

  const handleClose = () => {
        setOpen(false);
      };
  
 

  useEffect(() => {
    /**
     * What Is This?
     * This is to prevent a memory leak, in the off chance that you
     * teardown your interface prior to the timed method being called.
     */

    return () => {
      window.clearTimeout(clickRef?.current)
    }
  }, [])

  const onSelectEvent = useCallback((calEvent) => {
    /**
     * Here we are waiting 250 milliseconds (use what you want) prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      setOpen(true)
      setSelectedBooking(calEvent.booking)
    }, 250)
  }, [setSelectedBooking])

  const onDoubleClickEvent = useCallback((calEvent) => {
    /**
     * Notice our use of the same ref as above.
     */
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      setOpen(true)
      setSelectedBooking(calEvent.booking)
      

    }, 250)
  }, [setSelectedBooking])

 


  const {ids:bookingIds, entities: bookingEntities} = bookings

  const {ids:customersIds, entities: customersEntities} = customers || null

  const {ids:roomsIds, entities: roomsEntities} = rooms

  const {ids:ratesIds, entities: ratesEntities} = rates  
  

let bookingEvents = bookingIds.map((bookingId) => {
  const booking = bookingEntities[bookingId] || '';
  const customer = customersEntities[booking.customer] || '';
  const room = roomsEntities[booking.room];
  const checkinDateJs = booking.checkin;
  const checkoutDateJs = booking.checkout;

  return {
    start: new Date(checkinDateJs),
    end: new Date (checkoutDateJs),
    title: `${room.number ||''} - ${customer.name || 'CUSTOMER DELETED'} ${customer.lastname || ''}`,
    booking: booking,
    allDay: false,
    
  }
}
)

  const {events,views, defaultDate} = useMemo(
    ()=>({
      events:bookingEvents,
      views: Object.keys(Views).map((k) => Views[k]),
      defaultDate: new Date(),
    }),[bookingEntities])

    
        return (
          <div >
            <Calendar
            localizer={localizer}
            defaultDate={defaultDate}
            events={events}
            views={views}
            showMultiDayTimes
            onDoubleClickEvent={onDoubleClickEvent}
            onSelectEvent={onSelectEvent}
            style={{ height: "100vh" }}
            />
             <EditBookingForm open={open} handleClose={handleClose} booking={selectedBooking} rooms={rooms} rates={rates} customers={customers}/>
           
          </div>
        );
      
}

export default BookingsCalendar
