import { useGetRoomsQuery } from "./roomsApiSlice"
import { AddCircleOutline } from "@mui/icons-material"
import { ColorRing } from "react-loader-spinner"
import { Button, TextField } from "@mui/material"
import { lightBlue } from "@mui/material/colors"
import { useState } from "react"
import RoomsTable from "./RoomsTable"

const Rooms = () => {
    const {
        data: rooms,
        isLoading,
        isSuccess,
        isError,
        error
        } = useGetRoomsQuery()
    
    const [open, setOpen] = useState(false)
    const [filter, setFilter] = useState("")
    
    
let content

const handleClose = () => {
    setOpen(false);
  }

  
const handleClickOpen = () => {
  setOpen(true);
}

const handleFilterChange = (event) => {
    setFilter(event.target.value);
}



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

    const {ids, entities} = rooms

    const filteredIds = ids.filter((roomId) => {
        const room = entities[roomId];
        
        return (
          room &&
          String(room.number).includes(filter)
        );
      });

      const filteredRooms = filteredIds.map((id)=>entities[id])
    

        

content = (
    <section className="rooms">
        <h1 className="main_title">ROOMS</h1>
       
        <div className="filter_container">
                    <TextField
                    label="Filter"
                    variant="outlined"
                    value={filter}
                    placeholder="Name, lastname or ID°"
                    onChange={handleFilterChange}
                    sx={{marginTop:'2rem', width: "80%" }}
                    />
                </div>

    <RoomsTable rooms={filteredRooms} />
    </section>
            )
        }else if(isError){
            content = <p>{JSON.stringify(error)}</p>
        }
        return content
}

export default Rooms