import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ColorRing } from 'react-loader-spinner';
import { Button, InputLabel, Select, MenuItem } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { lightBlue } from '@mui/material/colors';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { useAddNewBookingMutation } from './bookingsApiSlice';
import InputAdornment from '@mui/material/InputAdornment';
import CustomerAddDialog from '../customers/CustomerAddDialog';
import dayjs from 'dayjs';

const NewBookingForm = ({open, handleClose, customers,rooms,rates,bookings}) =>{
   
  const{ids:customersIds,entities:customersEntities} = customers || {} 
  const{ids:roomsIds,entities:roomsEntities} = rooms || {}
  const{ids:ratesIds,entities:ratesEntities} = rates || {}
  const{ids:bookingsIds,entities:bookingsEntities} = bookings || {}

  const [checkinDate, setCheckinDate] = useState('')
  const [checkoutDate, setCheckoutDate] = useState('')
  const [room, setRoom] = useState('')
  const [passengers, setPassengers] = useState('')
  const [customer, setCustomer] = useState('')
  const [cost, setCost] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [note, setNote] = useState('')
  const [openCustomer, setOpenCustomer] = useState(false);
    
  const [addNewBooking, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewBookingMutation()

  useEffect (()=>{
  if(cost){
    const rawNumber = cost.replace(/\./g, '');
    const discountedRawNumber = rawNumber - (Math.round((rawNumber*discount)/100) )
    if (/^\d*\.?\d*$/.test(discountedRawNumber)) {

      const formattedNumber = Number(discountedRawNumber).toLocaleString('es-ES');

      setTotalCost(formattedNumber);
    }
  }
  },[cost, discount, totalCost])

  useEffect (()=>{
    setCheckinDate('')
    setCheckoutDate('')
    setCustomer('')
    setRoom('')
    setPassengers('')
    setCost(0)
    setDiscount(0)
    setTotalCost(0)
    setNote('')
  },[handleClose])

  useEffect (()=>{

    if(isSuccess){
      setCheckinDate('')
      setCheckoutDate('')
      setCustomer('')
      setRoom('')
      setPassengers('')
      setCost(0)
      setDiscount(0)
      setTotalCost(0)
      setNote('')
      handleClose()
    }    
  },[isSuccess])

  const canSave = [cost, room, passengers, customer, totalCost].every(Boolean) && checkinDate!=checkoutDate && checkinDate < checkoutDate && cost.replace(/\./g, '') > 0

  const onSaveNewBooking = async (e) =>{
    e.preventDefault()
    if(canSave){
     
      let checkin = moment(checkinDate.$d, "YYYY-MM-DD").set({ hour: 12, minute: 0, second: 0 })
      let checkout = moment(checkoutDate.$d, "YYYY-MM-DD").set({ hour: 12, minute: 0, second: 0 })
      let rawTotalCost = cost.replace(/\./g, '')
      let rawTotalDiscountedCost = totalCost.replace(/\./g, '')

      await addNewBooking({checkin, checkout, customer, room, passengers, value:rawTotalCost, discount, totalValue:rawTotalDiscountedCost, note})
      handleClose()
    }
  }

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
   
    const rawNumber = inputValue.replace(/\./g, '');

    if (/^\d*\.?\d*$/.test(rawNumber)) {

      const formattedNumber = Number(rawNumber).toLocaleString('es-ES');

      setCost(formattedNumber);
    }
    
  }

  const handleCloseCustomer = () => {
    setOpenCustomer(false);
  }   

  
  const handleClickOpenCustomer = () => {
  setOpenCustomer(true);
}


  const handleDiscountChange = (event) => {
   
    const inputValue = event.target.value;

    if (inputValue === '' || /^\d*\.?\d+$/.test(inputValue)  && inputValue <= 100) {
      setDiscount(inputValue);
    }
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };


  const maxPassengersPerRoom = 10
  let numberOfPassengers = [];

  for (var i = 1; i <= maxPassengersPerRoom; i++) {
    numberOfPassengers.push(i);
  }
  

  const roomOptions = roomsIds ? ( roomsIds.map(roomId => {
    return(
      <MenuItem key={roomId} value={roomId}>{roomsEntities[roomId].number} </MenuItem>
    )
  })) : null

  const passengersOptions = numberOfPassengers.map(number => {
    return(
      <MenuItem key={number} value={number}>{number} </MenuItem>
    )
  })

  const customersOptions = customersIds ? (customersIds.map(customerId => {
    return(
      <MenuItem key={customerId} value={customerId}>{customersEntities[customerId].name} {customersEntities[customerId].lastname}</MenuItem>
    )
  })) : null

if(isLoading){
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
}else{
  return (
    <form className='todo_form' >
      
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Dialog open={open}  onClose={handleClose}>
        <DialogTitle sx={{fontFamily:'Dosis',  fontSize:'1.5em'}}>Add Booking</DialogTitle>

        <DialogContent>

        <InputLabel id="date-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Check-in</InputLabel>
        <MobileDatePicker disablePast maxDate={dayjs(checkoutDate).subtract(1,'day')} onChange={(newDate) => setCheckinDate(newDate)} value={checkinDate} sx={{width:'100%'}}/>

        <InputLabel id="date-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Check-out</InputLabel>
        <MobileDatePicker minDate={dayjs(checkinDate).add(1,'day')} onChange={(newDate) => setCheckoutDate(newDate)} value={checkoutDate} sx={{width:'100%'}}/>

        <InputLabel id="customer-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Customer</InputLabel>                   
        <Select required
            labelId="customer-label"
            id="customer"
            value={customer}
            variant="filled"
            fullWidth
            onChange={handleCustomerChange}
        >
            {customersOptions}
        </Select>
        <div style={{textAlign:'center'}}>
        <Button variant="contained" color="info" sx={{width:'80%', margin:'2rem auto', fontFamily:'Dosis',fontSize:'1em', gap:'10px'}} onClick={handleClickOpenCustomer} ><AddCircleOutline sx={{color:lightBlue[500],}}/>Add Customer</Button>
        <CustomerAddDialog handleClose={handleCloseCustomer} open={openCustomer}/>
        </div>
       

        <InputLabel id="room-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Room</InputLabel>                   
        <Select required
            labelId="room-label"
            id="room"
            value={room}
            variant="filled"
            fullWidth
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

        <InputLabel id="discount-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Discount %</InputLabel>
        <TextField required
            margin="dense"
            id="discount"
            type="number"
            fullWidth
            variant="filled"
            value={discount}
            onChange={handleDiscountChange}     
            InputProps={{
              startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
          />

        <InputLabel id="totalCost-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Total Cost</InputLabel>
        <TextField required
            margin="dense"
            id="totalCost"
            type="text"
            fullWidth
            variant="filled"
            value={totalCost}
            onChange={handleCostChange}     
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              readOnly:true
            }}
          
          />
        <InputLabel id="discount-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Note</InputLabel>
          <TextField 
            margin="dense"
            id="note"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="filled"
            value={note}
            onChange={handleNoteChange}
          />

        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!canSave} onClick={onSaveNewBooking}>Add Booking</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
    
    </form>
)
}

}

export default NewBookingForm