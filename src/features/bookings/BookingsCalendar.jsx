
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Component } from "react";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import dayjs from "dayjs";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar)


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

let state

const events = bookingIds.map(bookingId=>{
  const booking = bookingEntities[bookingId]
  const customer = customersEntities[booking.client]
  const room = roomsEntities[booking.room]
  const checkinDateJs = moment(booking.checkin, "YYYY-MM-DD").set({ hour: 12, minute: 0, second: 0 })
  const checkoutDateJs = moment(booking.checkout, "YYYY-MM-DD").set({ hour: 12, minute: 0, second: 0 })

  return {
    start:checkinDateJs,
    end: checkoutDateJs,
    title: `${room.number} - ${customer.name} ${customer.lastname}`,
   
  }
 })

    
      
        return (
          <div >

            <DnDCalendar
            localizer={localizer}
            events={events}
            draggableAccessor={(event) => true}
            defaultDate={new Date()}
            defaultView="month"
            style={{ height: "100vh" }}
            onEventDrop={onEventDrop}
            
            
  />
          </div>
        );
      
}

export default BookingsCalendar

/*

export default BookingsCalendar
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Component } from "react";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import dayjs from "dayjs";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar)

const onEventDrop = ({event, start, end, allDay}) => {
  console.log(event)
  console.log(start)
  console.log(end)
  console.log(allDay)

}

const BookingsCalendar = ({bookings, customers, rooms, rates}) =>  {

  const {ids:bookingIds, entities: bookingEntities} = bookings

  const {ids:customersIds, entities: customersEntities} = customers

  const {ids:roomsIds, entities: roomsEntities} = rooms

  const {ids:ratesIds, entities: ratesEntities} = rates

let state
  
    state = {
        events: [
          {
            id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2023, 5, 25),
    end: new Date(2023, 5, 30),
          }
        ]
      };
    
      
        return (
          <div >

            <DnDCalendar
            localizer={localizer}
            events={state.events}
            draggableAccessor={(event) => true}
            defaultDate={new Date()}
            defaultView="month"
            style={{ height: "100vh" }}
            onEventDrop={onEventDrop}
  />
          </div>
        );
      
}

export default BookingsCalendar
*/