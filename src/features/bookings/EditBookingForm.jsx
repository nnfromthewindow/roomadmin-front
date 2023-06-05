import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, InputLabel, Select, MenuItem } from '@mui/material';
import { AddCircleOutline, Delete} from '@mui/icons-material';
import { lightBlue, grey } from '@mui/material/colors';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { useUpdateBookingMutation } from './bookingsApiSlice';
import InputAdornment from '@mui/material/InputAdornment';
import dayjs from 'dayjs';
import DeleteBookingDialog from './deleteBookingDialog';
import CustomerAddDialog from '../customers/CustomerAddDialog';

const EditBookingForm = ({open, handleClose, booking, customers, rooms, rates}) => {
    
    const{ids:customersIds,entities:customersEntities} = customers || {} 
    const{ids:roomsIds,entities:roomsEntities} = rooms || {}
    const{ids:ratesIds,entities:ratesEntities} = rates || {}
 
    const selectedBooking = booking

    
    const [checkinDate, setCheckinDate] = useState(dayjs(booking.checkin))
    const [checkoutDate, setCheckoutDate] = useState(dayjs(booking.checkout))
    const [room, setRoom] = useState('')
    const [passengers, setPassengers] = useState('')
    const [customer, setCustomer] = useState('')
    const [cost, setCost] = useState('')
    const [discount, setDiscount] = useState('')
    const [totalCost, setTotalCost] = useState('')
    const [note, setNote] = useState('')
    const [openDelete, setOpenDelete] = useState(false);
    const [openCustomer, setOpenCustomer] = useState(false);
    
    const selectedCustomer = customersIds.includes(customer) && customer || ''
    
    const [updateBooking, {
      isLoading,
      isSuccess,
      isError,
      error
    }] = useUpdateBookingMutation()

    useEffect(()=>{
      if(customersIds.includes(customer)){
        setCustomer(booking.id)
      }else{
        setCustomer('')
      }
    },[])
    
    
    useEffect(() => {
      if (booking) {
        setCheckinDate(dayjs(booking.checkin));
        setCheckoutDate(dayjs(booking.checkout));
        setRoom([booking.room]);
        setPassengers(booking.passengers);
        setCustomer(booking.customer);
        setCost(booking.value.$numberDecimal
          );
        setDiscount(booking.discount);
        setTotalCost(booking.totalValue.$numberDecimal
          );
        setNote(booking.note);
      }
    }, [handleClose]);  


    useEffect (()=>{
    if(cost){
      const rawNumber = cost.replace(/\./g, '');
      const discountedRawNumber = rawNumber - (Math.round((rawNumber*discount)/100) )
      if (/^\d*\.?\d*$/.test(discountedRawNumber)) {
  
        const formattedTotalCost = Number(discountedRawNumber).toLocaleString('es-ES');
        const formattedCost = Number(rawNumber).toLocaleString('es-ES');
        
        setCost(formattedCost)
        setTotalCost(formattedTotalCost);
      }
    }
    },[cost, discount, totalCost])

    const canSave = [cost, room, passengers, customer, totalCost].every(Boolean) && checkinDate!=checkoutDate && checkinDate < checkoutDate && cost.replace(/\./g, '') >0
  
    const onUpdateBooking = async (e) =>{
      e.preventDefault()
      if(canSave){
       
        let checkin = moment(checkinDate.$d, "YYYY-MM-DD").set({ hour: 12, minute: 0, second: 0 })
        let checkout = moment(checkoutDate.$d, "YYYY-MM-DD").set({ hour: 12, minute: 0, second: 0 })
        let rawTotalCost = cost.replace(/\./g, '')
        let rawTotalDiscountedCost = totalCost.replace(/\./g, '')
  
        await updateBooking({id:booking.id,checkin, checkout, customer, room, passengers, value:rawTotalCost, discount, totalValue:rawTotalDiscountedCost, note})
        handleClose()
      }
    }
  
    const handleRoomChange = (event) => {
      setRoom(event.target.value);
    };
    
    const handlePassengersChange = (event) => {
      setPassengers(event.target.value);
    };
  
    const                                             handleCustomerChange = (event) => {
      setCustomer(event.target.value);
    };
  
    const handleCostChange = (event) => {
     
      const inputValue = event.target.value;
     
      const rawNumber = inputValue.replace(/\./g, '');
  
      if (/^\d*\.?\d*$/.test(rawNumber)) {
  
        const formattedNumber = Number(rawNumber).toLocaleString('es-ES');
  
        setCost(formattedNumber);
      }
      
    };
  
    const handleDiscountChange = (event) => {
     
      const inputValue = event.target.value;
  
      if (inputValue === '' || /^\d*\.?\d+$/.test(inputValue)  && inputValue <= 100) {
        setDiscount(inputValue);
      }
    };
  

    const handleNoteChange = (event) => {
      setNote(event.target.value);
    };
  
    const handleCloseDelete = () => {
      setOpenDelete(false);
      handleClose()
    };

    const handleCloseCancelDelete = () => {
      setOpenDelete(false);
    };
  
    
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseCustomer = () => {
    setOpenCustomer(false);
  };

  
const handleClickOpenCustomer = () => {
  setOpenCustomer(true);
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
  
  
  return (
      <form className='todo_form' style={{zIndex:-1}}>
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open}  onClose={handleClose}>
          <DialogTitle sx={{fontFamily:'Dosis',  fontSize:'1.5em'}}>Edit Booking</DialogTitle>
  
          <DialogContent>

          <InputLabel id="date-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Check-in</InputLabel>
        <MobileDatePicker disablePast  onChange={(newDate) => setCheckinDate(newDate)} value={checkinDate} sx={{width:'100%'}}/>

        <InputLabel id="date-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Check-out</InputLabel>
        <MobileDatePicker disablePast  onChange={(newDate) => setCheckoutDate(newDate)} value={checkoutDate} sx={{width:'100%'}}/>

        <InputLabel id="customer-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Customer</InputLabel>                   
        <Select required
            labelId="customer-label"
            id="customer"
            value={selectedCustomer}
            variant="filled"
            fullWidth
            onChange={handleCustomerChange}
        >
            {customersOptions}
        </Select>
        <div style={{textAlign:'center'}}>
        <Button onClick={handleClickOpenCustomer} variant="contained" color="info" sx={{width:'80%', margin:'2rem auto', fontFamily:'Dosis',fontSize:'1em', gap:'10px'}} ><AddCircleOutline sx={{color:lightBlue[500],}} />Add Customer</Button>
        </div>
       <CustomerAddDialog handleClose={handleCloseCustomer} open={openCustomer}/>

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
          <div style={{textAlign:'center'}}>
          <Button variant="contained" color="error" sx={{width:'80%', marginTop:'1rem', fontFamily:'Dosis',fontSize:'1em', gap:'10px'}} onClick={handleClickOpenDelete}><Delete sx={{color:grey[500],}}/>Delete Booking</Button>
          </div>
       
  
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={onUpdateBooking} disabled={!canSave}>Edit Booking</Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>

      <DeleteBookingDialog openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleCloseCancelDelete={handleCloseCancelDelete} bookingId={booking.id}/>

      </form>
  )
  
}

export default EditBookingForm