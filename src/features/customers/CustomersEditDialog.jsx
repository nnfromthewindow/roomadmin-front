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
import { useUpdateCustomerMutation } from './customersApiSlice';
import { memo } from 'react';

const CustomerEditDialog = ({open, handleClose, customer}) => {

  const [name, setName] = useState(customer.name)
  const [nameError, setNameError] = useState(false)
  const [lastname, setLastname] = useState(customer.lastname || '')
  const [lastnameError, setLastnameError] = useState(false)
  const [idnumber, setIdnumber] = useState(customer.idnumber || '')
  const [idnumberError, setIdnumberError] = useState(false)
  const [adress, setAdress] = useState(customer.adress || '')
  const [adressError, setAdressError] = useState(false)
  const [email, setEmail] = useState(customer.email || '')
  const [emailError, setEmailError] = useState(false)
  const [phone, setPhone] = useState(customer.phone || '')
  const [phoneError, setPhoneError] = useState(false)
  const phoneRegex = /^[\d+ ]*$/
 
  const [updateCustomer, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateCustomerMutation()
  
  useEffect(()=>{
    setName(customer.name  || '')
    setLastname(customer.lastname || '')
    setIdnumber(customer.idnumber || '')
    setAdress(customer.adress || '')
    setEmail(customer.email || '' )
    setPhone(customer.phone || '')
  },[open])
 

  const onUpdateCustomer = async(e) =>{
    e.preventDefault()
    if(canSave){
      await updateCustomer({id:customer.id, name, lastname, idnumber,adress, email, phone})
      handleClose()
    }
  
  }

  const handleNameChange = (event) => {
    const name = event.target.value
    setName(name)
    name.length>20 ? setNameError(true) : setNameError(false)
  };
  
  const handleLastnameChange = (event) => {
    const lastname = event.target.value
    setLastname(lastname)
    lastname.length>20 ? setLastnameError(true) : setLastnameError(false)
  };
  
  const handleIdnumberChange = (event) => {
    const idnumber = event.target.value
    setIdnumber(idnumber)
    idnumber.length>30 ? setIdnumberError(true) : setIdnumberError(false)
  };
  
  const handleAdressChange = (event) => {
    const adress = event.target.value
    setAdress(adress)
    adress.length>50 ? setAdressError(true) : setAdressError(false)
  };

  const handleEmailChange = (event) => {
    const email = event.target.value
    setEmail(email);
    if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && email.length>30){
    setEmailError(true)
    }else{
      setEmailError(false)
    }
  };
  
  const handlePhoneChange = (event) => {
    const newPhone = event.target.value;
    if (newPhone.match(phoneRegex) || newPhone === '') {
      setPhone(newPhone);
    }

    newPhone.length>20 ? setPhoneError(true) : setPhoneError(false)
  }

  const canSave = [name, lastname, idnumber, adress,phone,!emailError,!nameError,!lastnameError,!idnumberError,!adressError,!phoneError].every(Boolean)

    return (
        <form className='todo_form' >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog open={open}  onClose={handleClose}>
            <DialogTitle sx={{fontFamily:'Dosis',  fontSize:'1.5em'}}>Edit Customer</DialogTitle>
    
            <DialogContent>
    
           
            <InputLabel id="name-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}
            >Name</InputLabel>
            
            <TextField required
                margin="dense"
                id="name"
                type="text"
                fullWidth
                variant="filled" onChange={handleNameChange} value={name}
                error={nameError}
                helperText={nameError && 'The field should have less than 20 characters'}   
                       
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
                error={lastnameError}
                helperText={lastnameError && 'The field should have less than 20 characters'}                
              />

            <InputLabel id="idnumber-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>ID number</InputLabel>
            
            <TextField required
                margin="dense"
                id="idnumber"
                type="text"
                fullWidth
                variant="filled"
                onChange={handleIdnumberChange}
                value={idnumber}             
                error={idnumberError}
                helperText={idnumberError && 'The field should have less than 30 characters'}   
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
                error={adressError}
                helperText={adressError && 'The field should have less than 50 characters'}   
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
                error={emailError} 
                helperText={email.length>0 && emailError && 'Invalid Email'}     
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
                error={phoneError}
                helperText={phoneError && 'The field should have less than 20 characters'}               
              />
        
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button disabled={!canSave} onClick={onUpdateCustomer}>Edit Customer</Button>
            </DialogActions>
          </Dialog>
        </LocalizationProvider>
        
        </form>
    )
}


export default CustomerEditDialog