import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ColorRing } from 'react-loader-spinner';
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
  const [nameError, setNameError] = useState(false)
  const [lastname, setLastname] = useState('')
  const [lastnameError, setLastnameError] = useState(false)
  const [idnumber, setIdnumber] = useState('')
  const [idnumberError, setIdnumberError] = useState(false)
  const [adress, setAdress] = useState('')
  const [adressError, setAdressError] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState(false)


 
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
    setNameError(false)
    setLastnameError(false)
    setIdnumberError(false)
    setAdressError(false)
    setEmailError(false)
    setPhoneError(false)

  },[handleClose])

  const onSaveNewCustomer = async(e) =>{
    e.preventDefault()
    if(canSave){
      await addNewCustomer({name, lastname, idnumber,adress, email, phone})
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
    if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || email.length>30){
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
  

  if(isLoading){
    return  (<div className="spinner" style={{position:'fixed', margin:'auto',
    width: '100vw',
    height: '100vh',
    top:'0rem',
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
            <Button disabled={!canSave} onClick={onSaveNewCustomer}>Add Customer</Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
      
      </form>
  )
  }

}

export default CustomerAddDialog