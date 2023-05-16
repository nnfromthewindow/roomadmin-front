import { useGetRoomsQuery } from "./roomsApiSlice"
import { Link } from "react-router-dom"
import { ColorRing } from "react-loader-spinner"

const Rooms = () => {
    const {
        data: rooms,
        isLoading,
        isSuccess,
        isError,
        error
        } = useGetRoomsQuery()
    
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
        } else if (isSuccess){
    
            const{ids, entities} = rooms
    
        content = (
            <section className="rooms">
                <h1>ROOMS</h1>
                <ul>
                    {ids.map(roomId =>{
                    return <li key={roomId}>
                        <h3>ROOM N°: {entities[roomId].number}</h3>
                        <h3>PAX: {entities[roomId].pax}</h3>
                        <h3>ROOMS: {entities[roomId].rooms}</h3>
                        <h3>RATE: {entities[roomId].rate}</h3>
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

export default Rooms