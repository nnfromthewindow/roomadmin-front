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
import InputAdornment from '@mui/material/InputAdornment';
import dayjs from 'dayjs';
import { useAddNewCustomerMutation } from './customersApiSlice';

const CustomerAddDialog = ({open, handleClose}) => {

  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [idnumber, setIdnumber] = useState('')
  const [adress, setAdress] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
 
  const phoneRegex = /^[\d+ ]*$/
 
  const [addNewCustomer, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewCustomerMutation()

  useEffect(()=>{
    setName('')
    setLastname('')
    setIdnumber('')
    setAdress('')
    setEmail('')
    setPhone('')
  },[handleClose])

  const onSaveNewCustomer = async(e) =>{
    e.preventDefault()
    if(canSave){
      await addNewCustomer({name, lastname, idnumber,adress, email, phone})
      handleClose()
    }
  
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  
  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };
  
  const handleIdNumberChange = (event) => {
    setIdnumber(event.target.value);
  };
  
  const handleAdressChange = (event) => {
    setAdress(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  const handlePhoneChange = (event) => {
    const newPhone = event.target.value;
    if (newPhone.match(phoneRegex) || newPhone === '') {
      setPhone(newPhone);
    }
  }

  const canSave = [name, lastname, idnumber, adress,phone].every(Boolean)
  

    return (
        <form className='todo_form' >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{fontFamily:'Dosis',  fontSize:'1.5em'}}>Add Customer</DialogTitle>
    
            <DialogContent>
    
           
            <InputLabel id="name-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}
            >Name</InputLabel>
            
            <TextField required
                margin="dense"
                id="name"
                type="text"
                fullWidth
                variant="filled" onChange={handleNameChange} value={name}          
              />

            <InputLabel id="name-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Lastname</InputLabel>
            
            <TextField required
                margin="dense"
                id="lastname"
                type="text"
                fullWidth
                variant="filled"
                onChange={handleLastnameChange}
                value={lastname}             
              />

            <InputLabel id="idnumber-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>ID number</InputLabel>
            
            <TextField required
                margin="dense"
                id="idnumber"
                type="text"
                fullWidth
                variant="filled"
                onChange={handleIdNumberChange}
                value={idnumber}             
              />

            <InputLabel id="adress-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Adress</InputLabel>
            
            <TextField required
                margin="dense"
                id="adress"
                type="text"
                fullWidth
                variant="filled"
                onChange={handleAdressChange}
                value={adress}
              />

            <InputLabel id="email-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Email</InputLabel>
            
            <TextField required
                margin="dense"
                id="email"
                type="email"
                fullWidth
                variant="filled"
                onChange={handleEmailChange}
                value={email}    
                error={email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)} 
                helperText={error && 'Invalid email'}        
              />

            <InputLabel id="phone-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Phone</InputLabel>
            
            <TextField required
                margin="dense"
                id="phone"
                type="phone"
                fullWidth
                variant="filled"
                onChange={handlePhoneChange}
                value={phone}             
              />
        
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button disabled={!canSave} onClick={onSaveNewCustomer}>Add Customer</Button>
            </DialogActions>
          </Dialog>
        </LocalizationProvider>
        
        </form>
    )
}

export default CustomerAddDialog