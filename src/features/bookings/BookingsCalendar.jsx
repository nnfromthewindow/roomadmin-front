
import { Calendar, momentLocalizer,Views } from "react-big-calendar";

import moment from "moment";

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useMemo } from "react";


const localizer = momentLocalizer(moment);

const onEventDrop = ({event, start, end, allDay}) => {
 /* console.log(event)
  console.log(start)
  console.log(end)
  console.log(allDay)
*/
}

const BookingsCalendar = ({bookings, customers, rooms, rates}) =>  {

  const {ids:bookingIds, entities: bookingEntities} = bookings

  const {ids:customersIds, entities: customersEntities} = customers

  const {ids:roomsIds, entities: roomsEntities} = rooms

  const {ids:ratesIds, entities: ratesEntities} = rates  

let bookingEvents = bookingIds.map((bookingId) => {
  const booking = bookingEntities[bookingId];
  const customer = customersEntities[booking.customer];
  const room = roomsEntities[booking.room];
  const checkinDateJs = booking.checkin;
  const checkoutDateJs = booking.checkout;

  return {
    start: new Date(checkinDateJs),
    end: new Date (checkoutDateJs),
    title: `${room.number} - ${customer.name} ${customer.lastname}`,
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
            style={{ height: "100vh" }}
            />
           
          </div>
        );
      
}

export default BookingsCalendar
