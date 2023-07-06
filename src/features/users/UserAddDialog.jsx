import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ColorRing } from 'react-loader-spinner';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState, useEffect } from 'react';
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
  const [alert,setAlert] = useState(false)
 
  const phoneRegex = /^[\d+ ]*$/
 
  const [addNewUser, {
    isLoading,
    isSuccess,
    isError,
    setIsError,
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

  useEffect(() => {
    if (isError) {
     setAlert(true)
      const timeout = setTimeout(() => {
        setAlert(false)
       
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [isError]);

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

  const rolesArray = ["Employee","Manager"]

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
        {alert &&  <Alert variant='filled' severity="error" style={{transition:'2s'}}>
  <AlertTitle>Error</AlertTitle>
  {error?.data?.message}— <strong>check it out!</strong>
</Alert>}
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{fontFamily:'Dosis',  fontSize:'1.5em'}}>Add User</DialogTitle>
  
          <DialogContent>
  
         
          <InputLabel htmlFor='name-input' id="name-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}
          >Name</InputLabel>
          
          <TextField required
              margin="dense"
              inputProps={{id:'name-input'}}
              type="text"
              fullWidth
              variant="filled" onChange={handleNameChange} value={name} 
              error={nameError}
              helperText={nameError && 'The field should have less than 20 characters'}         
            />

          <InputLabel htmlFor='lastname-input' id="lastname-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Lastname</InputLabel>
          
          <TextField required
              margin="dense"
              inputProps={{id:'lastname-input'}}
              type="text"
              fullWidth
              variant="filled"
              onChange={handleLastnameChange}
              value={lastname}  
              error={lastnameError}
              helperText={lastnameError && 'The field should have less than 20 characters'}            
            />

          <InputLabel htmlFor='idnumber-input' id="idnumber-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>ID number</InputLabel>
          
          <TextField required
              margin="dense"
              inputProps={{id:'idnumber-input'}}
              type="text"
              fullWidth
              variant="filled"
              onChange={handleIdnumberChange}
              value={idnumber} 
              error={idnumberError}
              helperText={idnumberError && 'The field should have less than 30 characters'}               
            />

          <InputLabel htmlFor='adress-input' id="adress-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Adress</InputLabel>
          
          <TextField required
              margin="dense"
              inputProps={{id:'adress-input'}}
              type="text"
              fullWidth
              variant="filled"
              onChange={handleAdressChange}
              value={adress}
              error={adressError}
              helperText={adressError && 'The field should have less than 50 characters'}   
            />

          <InputLabel htmlFor='email-input' id="email-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Email</InputLabel>
          
          <TextField required
              margin="dense"
              inputProps={{id:'email-input'}}
              type="email"
              fullWidth
              variant="filled"
              onChange={handleEmailChange}
              value={email}   
              error={emailError} 
              helperText={email.length>0 && emailError && 'Invalid Email'}               
            />

          <InputLabel htmlFor='phone-input' id="phone-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Phone</InputLabel>
          
          <TextField required
              margin="dense"
              inputProps={{id:'phone-input'}}
              type="phone"
              fullWidth
              variant="filled"
              onChange={handlePhoneChange}
              value={phone}  
              error={phoneError}
              helperText={phoneError && 'The field should have less than 20 characters'}            
            />

          <InputLabel htmlFor='avatar-input' id="avatar-label" sx={{fontFamily:'Dosis',  fontWeight:'bold', fontSize:'1.2em'}}>Avatar</InputLabel>
          
          <TextField required
              margin="dense"
              inputProps={{id:'avatar-input'}}
              type="text"
              fullWidth
              variant="filled"
              onChange={handleAvatarChange}
              value={avatar}
              error={avatarError}
              helperText={avatarError && 'The field should have less than 400 characters'}              
          />

          <InputLabel htmlFor='username-input'  id="username-label" sx={{fontFamily:'Dosis',  fontWeight:'bold', fontSize:'1.2em'}}>Username</InputLabel>
          

          <TextField required
              margin="dense"
              inputProps={{id:'username-input'}}
              type="text"
              fullWidth
              variant="filled"
              onChange={handleUsernameChange}
              value={username}  
              error={usernameError}
              helperText={usernameError && 'The username should have a minimum of 4 characters and a maximum of 20 characters'}             
            />

          <InputLabel htmlFor='password-input' id="password-label" sx={{fontFamily:'Dosis',  fontWeight:'bold', fontSize:'1.2em'}}>Password</InputLabel>
          
          <TextField required
              margin="dense"
              inputProps={{id:'password-input'}}
              type="password"
              sx={{maxWidth:'280px'}}
              variant="filled"  
              onChange={handlePasswordChange}
              value={password}  
              error={passwordError}
              helperText={passwordError && 'The password should contain at least one lowercase letter, one uppercase letter, one number, and have a minimum of 8 characters and a maximum of 20 characters'}             
            />
      
          <InputLabel htmlFor='role-input' id="role-label" sx={{fontFamily:'Dosis',  fontWeight:'bold', fontSize:'1.2em'}}>Role</InputLabel>

          <Select required
              inputProps={{id:'role-input'}}
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
      
      </form>
  )
  }

   
}

export default UserAddDialog