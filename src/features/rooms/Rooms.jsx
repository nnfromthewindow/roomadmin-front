import { useGetRoomsQuery,useAddNewRoomMutation } from "./roomsApiSlice"
import { ColorRing } from "react-loader-spinner"
import { useState,useEffect, lazy, Suspense} from "react"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline"
import lightBlue from "@mui/material/colors/lightBlue"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import useTitle from "../hooks/useTitle";

const RoomsTable = lazy(()=> import("./RoomsTable"))

const Rooms = () => {

    useTitle('Roomy - Rooms')

    const {
        data: rooms,
        isLoading,
        isSuccess,
        isError,
        error
        } = useGetRoomsQuery('roomsList')
    
        const [addNewRoom, {
            isLoading:isLoadingNewRoomItem,
            isSuccess:isSuccessNewRoomItem,
            isError:isErrorNewRoomItem,
            error: errorNewRoomItem
          }] = useAddNewRoomMutation()    
    
   
    const [filter, setFilter] = useState("")
    const [number, setNumber] = useState('')
    const [passengers, setPassengers] = useState('')
    const [numberOfRooms, setNumberOfRooms] = useState('')
    const [alert,setAlert] = useState(false)
    const canSave = [number, passengers, numberOfRooms].every(Boolean) && number !=0 && passengers !=0 && numberOfRooms !=0
    
    useEffect(() => {
        if (isErrorNewRoomItem) {
         setAlert(true)
          const timeout = setTimeout(() => {
            setAlert(false)
           
          }, 5000);
    
          return () => clearTimeout(timeout);
        }
      }, [isErrorNewRoomItem]);
          
    const onSaveNewRoom = async (e) =>{
        e.preventDefault()
        if(canSave){
            await addNewRoom({number, passengers, rooms:numberOfRooms})
            setNumber('')
            setPassengers('')
            setNumberOfRooms('')
        }
      }
    
    let content


    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    const handleNumberChange = (event) => {
        const number = event.target.value
      number>=0 && setNumber(Number(number));
    }

    const handlePassengersChange = (event) => {
        const number = event.target.value
        number>=0 && setPassengers(Number(number));
    }

    const handleNumberOfRoomsChange = (event) => {
        const number = event.target.value
        number>=0 && setNumberOfRooms(Number(number));
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
    }else if(isLoadingNewRoomItem){
        return  (<div className="spinner" style={{position:'fixed', margin:'auto',
        width: '100vw',
        height: '100vh',
        top:'0rem',
        left:'0rem',
        paddingTop:'30vh',
        backgroundColor: '#ffffffc7',
        zIndex: '3000'}}>
                    <ColorRing
                        visible={true}
                        height="200"
                        width="200"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />
                  </div>)
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
            <form  onSubmit={onSaveNewRoom}>
            {alert &&  <Alert variant='filled' severity="error" style={{transition:'2s', position:'fixed', top:'0',width:'100%'}}>
        <AlertTitle>Error</AlertTitle>
        {errorNewRoomItem?.data?.message}— <strong>check it out!</strong>
      </Alert>}
            <div className="ledger_add">                
                    <TextField onChange={handleNumberChange} type="number"  value={number} id="number" label="Number" variant="outlined" style={{width:'6rem'}}/>
                    <TextField onChange={handlePassengersChange} type="number" value={passengers} id="passengers" label="Passengers" variant="outlined" style={{width:'6rem'}}/>
                    <TextField onChange={handleNumberOfRoomsChange} type="number" value={numberOfRooms} id="number-of-rooms" label="Rooms" variant="outlined" style={{width:'6rem'}}/>
                    <Button type="submit" disabled={!canSave} color="success" variant="contained" sx={{  fontFamily:'Dosis',fontSize:'1.55em',width:'240px'}} >Add Item<AddCircleOutline sx={{color:lightBlue[500],marginLeft:'8px'}}/></Button>

            </div>
            </form>
            <div className="filter_container">
                        <TextField
                        id="filter-input"
                        label="Filter"
                        variant="outlined"
                        value={filter}
                        placeholder="Room number"
                        onChange={handleFilterChange}
                        sx={{marginTop:'2rem', width: "80%" }}
                        />
                    </div>
        <Suspense  fallback={<div>Loading...</div>}>
            <RoomsTable rooms={filteredRooms} />
        </Suspense>
        
        </section>
                )
            }else if(isError){
                content = <section className="rooms">
                <h1 className="main_title">ROOMS</h1>
                <form  onSubmit={onSaveNewRoom}>
                <div className="ledger_add">                
                        <TextField onChange={handleNumberChange} type="number"  value={number} id="number" label="Number" variant="outlined" style={{width:'6rem'}}/>
                        <TextField onChange={handlePassengersChange} type="number" value={passengers} id="passengers" label="Passengers" variant="outlined" style={{width:'6rem'}}/>
                        <TextField onChange={handleNumberOfRoomsChange} type="number" value={numberOfRooms} id="number-of-rooms" label="Rooms" variant="outlined" style={{width:'6rem'}}/>
                        <Button type="submit" disabled={!canSave} color="success" variant="contained" sx={{  fontFamily:'Dosis',fontSize:'1.55em',width:'240px'}} >Add Item<AddCircleOutline sx={{color:lightBlue[500],marginLeft:'8px'}}/></Button>
    
                </div>
                </form>
            </section>
            }
            return content
}

export default Rooms