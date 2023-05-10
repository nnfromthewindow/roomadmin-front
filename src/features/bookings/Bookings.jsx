import { useGetBookingsQuery } from "./bookingsApiSlice"
import { Link } from "react-router-dom"

const Bookings = () => {
  const {
    data:bookings,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBookingsQuery()
  console.log()
  let content

  if(isLoading){
    content = <p>"Loading..."</p>
  } else if (isSuccess){
  content = (
      <section className="bookings">
          <h1>BOOKINGS</h1>
          <ul>
              {bookings.map((booking, i) =>{
              return <li key={i}>
                  <h2>INCOME: {booking.income}</h2>
                  <h2>OUTCOME: {booking.outcome}</h2>
                  <h2>ROOM: {booking.room}</h2>
                  <h2>PAX: {booking.pax}</h2>
                  <h2>CLIENT: {booking.client.name}</h2>
                  <h2>VALUE: {booking.value}</h2>
                  <h2>DISCOUNT: {booking.discount}</h2>
                  <h2>TOTAL VALUE:{booking.totalValue}</h2>
                  <h2>NOTE: {booking.note}</h2>
              </li>
              })}
          </ul>
          <Link to="/welcome">Back to Welcome</Link>
      </section>
      )
  }else if(isError){
      content = <p>{JSON.stringify(error)}</p>
  }

  return content
}

export default Bookings