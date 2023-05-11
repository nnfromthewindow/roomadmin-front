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
 
  let content

  if(isLoading){
    content = <p>"Loading..."</p>
  } else if (isSuccess){

    const {ids, entities} = bookings

  content = (
      <section className="bookings">
          <h1>BOOKINGS</h1>
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
      </section>
      )
  }else if(isError){
      content = <p>{JSON.stringify(error)}</p>
  }

  return content
}

export default Bookings