import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, InputLabel, Select, MenuItem } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { lightBlue } from '@mui/material/colors';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useAddNewBookingMutation } from './bookingsApiSlice';
import InputAdornment from '@mui/material/InputAdornment';

const NewBookingForm = ({open, handleClose, customers,rooms,rates,bookings}) =>{
   
  const{ids:customersIds,entities:customersEntities} = customers
  const{ids:roomsIds,entities:roomsEntities} = rooms
  const{ids:ratesIds,entities:ratesEntities} = rates
  const{ids:bookingsIds,entities:bookingsEntities} = bookings

  const [checkinDate, setCheckinDate] = useState('')
  const [checkoutDate, setCheckoutDate] = useState('')
  const [room, setRoom] = useState('')
  const [passengers, setPassengers] = useState('')
  const [customer, setCustomer] = useState('')
  const [cost, setCost] = useState('')
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(0)
  const [note, setNote] = useState('')

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };
  
  const handlePassengersChange = (event) => {
    setPassengers(event.target.value);
  };

  const handleCustomerChange = (event) => {
    setCustomer(event.target.value);
  };

  const handleCostChange = (event) => {
   
    const inputValue = event.target.value;
   
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setCost(inputValue);
    }

  };

  const formattedCost = Number(cost).toLocaleString();

  const maxPassengersPerRoom = 10
  let numberOfPassengers = [];

  for (var i = 1; i <= maxPassengersPerRoom; i++) {
    numberOfPassengers.push(i);
  }
  

  const roomOptions = roomsIds.map(roomId => {
    return(
      <MenuItem key={roomId} value={roomId}>{roomsEntities[roomId].number} </MenuItem>
    )
  })

  const passengersOptions = numberOfPassengers.map(number => {
    return(
      <MenuItem key={number} value={number}>{number} </MenuItem>
    )
  })

  const customersOptions = customersIds.map(customerId => {
    return(
      <MenuItem key={customerId} value={customerId}>{customersEntities[customerId].name} {customersEntities[customerId].lastname}</MenuItem>
    )
  })


return (
    <form className='todo_form' >
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Dialog open={open}  onClose={handleClose}>
        <DialogTitle sx={{fontFamily:'Dosis',  fontSize:'1.5em'}}>Add Booking</DialogTitle>

        <DialogContent>

        <InputLabel id="date-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Check-in</InputLabel>
        <MobileDatePicker disablePast  onChange={(newDate) => setCheckinDate(newDate)} value={checkinDate}/>

        <InputLabel id="date-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Check-out</InputLabel>
        <MobileDatePicker disablePast  onChange={(newDate) => setCheckoutDate(newDate)} value={checkoutDate}/>

        <InputLabel id="customer-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Customer</InputLabel>                   
        <Select required
            labelId="customer-label"
            id="customer"
            value={customer}
            variant="filled"
            sx={{width:'100%'}}
            onChange={handleCustomerChange}
        >
            {customersOptions}
        </Select>
        <div style={{textAlign:'center'}}>
        <Button variant="contained" color="info" sx={{width:'80%', margin:'2rem auto', fontFamily:'Dosis',fontSize:'1em', gap:'10px'}} ><AddCircleOutline sx={{color:lightBlue[500],}}/>Add Customer</Button>
        </div>
       

        <InputLabel id="room-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Room</InputLabel>                   
        <Select required
            labelId="room-label"
            id="room"
            value={room}
            variant="filled"
            sx={{width:'100%'}}
            onChange={handleRoomChange}
        >
            {roomOptions}
        </Select>

        <InputLabel id="passengers-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Passengers</InputLabel>                   
        <Select required
            labelId="passengers-label"
            id="passengers"
            value={passengers}
            variant="filled"
            sx={{width:'100%'}}
            onChange={handlePassengersChange}
        >
            {passengersOptions}
        </Select>

        <InputLabel id="cost-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Cost</InputLabel>
        <TextField required
            margin="dense"
            id="cost"
            type="text"
            fullWidth
            variant="filled"
            value={cost}
            onChange={handleCostChange}     
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              
            }}
          
          />

        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button >Add Todo</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
    
    </form>
)


}

export default NewBookingForm