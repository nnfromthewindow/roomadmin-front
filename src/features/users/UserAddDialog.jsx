import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ColorRing } from 'react-loader-spinner';
import { Button, InputLabel, Select, MenuItem , OutlinedInput} from '@mui/material';
import { AddCircleOutline, Delete} from '@mui/icons-material';
import { lightBlue, grey } from '@mui/material/colors';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import moment from 'moment';
import InputAdornment from '@mui/material/InputAdornment';
import dayjs from 'dayjs';
import { useAddNewUserMutation } from './usersApiSlice';

const UserAddDialog = ({open, handleClose}) => {

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
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [avatarError, setAvatarError] = useState(false)
  const [roles, setRoles] = useState([])
 
  const phoneRegex = /^[\d+ ]*$/
 
  const [addNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewUserMutation()

  useEffect(()=>{
    setName('')
    setLastname('')
    setIdnumber('')
    setAdress('')
    setEmail('')
    setPhone('')
    setAvatar('')
    setUsername('')
    setPassword('')
    setRoles([])
    setNameError(false)
    setLastnameError(false)
    setIdnumberError(false)
    setAdressError(false)
    setEmailError(false)
    setPhoneError(false)
    setAvatarError(false)
    setUsernameError(false)
    setPasswordError(false)
  },[handleClose])

  const onSaveNewUser = async(e) =>{
    e.preventDefault()
    if(canSave){
          
      await addNewUser({name, lastname, idnumber,adress, email, phone, avatar, username, password, roles})
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

  const handleAvatarChange = (event) => {
    const avatar = event.target.value
    setAvatar(avatar)
    avatar.length>400 ? setAvatarError(true) : setAvatarError(false)
 
  }

  const handleUsernameChange = (event) => {
    const username = event.target.value
    setUsername(username)
    username.length>20 || username.length<4? setUsernameError(true) : setUsernameError(false)
 
  }

  const handlePasswordChange = (event) => {
    const password = event.target.value
    setPassword(password)
    !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/) ? setPasswordError(true) : setPasswordError(false)
 
  }

  const handleRolesChange = (event) => {

    const {
      target: { value },
    } = event;
   
    setRoles(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
      );
  }

  const rolesArray = ["Employee","Admin"]

  const rolesOptions = rolesArray.map((role) => {

    return(
      <MenuItem key={role} value={role}>{role} </MenuItem>
    )
  })

  const canSave = [name, lastname, idnumber, adress,phone, username, password,!emailError,!nameError,!lastnameError,!idnumberError,!adressError,!phoneError,!usernameError,!passwordError,!avatarError].every(Boolean) && roles.length!=0


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
          <DialogTitle sx={{fontFamily:'Dosis',  fontSize:'1.5em'}}>Add User</DialogTitle>
  
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

          <InputLabel id="avatar-label" sx={{fontFamily:'Dosis',  fontWeight:'bold', fontSize:'1.2em'}}>Avatar</InputLabel>
          

          <TextField required
              margin="dense"
              id="avatar"
              type="text"
              fullWidth
              variant="filled"
              onChange={handleAvatarChange}
              value={avatar}
              error={avatarError}
              helperText={avatarError && 'The field should have less than 400 characters'}              
          />

          <InputLabel id="username-label" sx={{fontFamily:'Dosis',  fontWeight:'bold', fontSize:'1.2em'}}>Username</InputLabel>
          

          <TextField required
              margin="dense"
              id="username"
              type="text"
              fullWidth
              variant="filled"
              onChange={handleUsernameChange}
              value={username}  
              error={usernameError}
              helperText={usernameError && 'The username should have a minimum of 4 characters and a maximum of 20 characters'}             
            />

          <InputLabel id="password-label" sx={{fontFamily:'Dosis',  fontWeight:'bold', fontSize:'1.2em'}}>Password</InputLabel>
          
          <TextField required
              margin="dense"
              id="password"
              type="password"
              fullWidth
              variant="filled"  
              onChange={handlePasswordChange}
              value={password}  
              error={passwordError}
              helperText={passwordError && 'The password should contain at least one lowercase letter, one uppercase letter, one number, and have a minimum of 8 characters and a maximum of 20 characters'}             
            />
      
          <InputLabel id="role-label" sx={{fontFamily:'Dosis',  fontWeight:'bold', fontSize:'1.2em'}}>Role</InputLabel>

          <Select required
              labelId="role-label"
              id="role"
              value={roles}
              variant="filled"
              sx={{width:'100%'}}
              multiple
              onChange={handleRolesChange}
          >
              {rolesOptions}
          </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={!canSave} onClick={onSaveNewUser}>Add User</Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
      
      </form>
  )
  }

   
}

export default UserAddDialog