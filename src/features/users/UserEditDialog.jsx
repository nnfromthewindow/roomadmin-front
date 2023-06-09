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
import { useState, useEffect } from 'react';
import { useUpdateUserMutation } from './usersApiSlice';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const UserEditDialog = ({open, handleClose, user}) => {

  const [name, setName] = useState(user.name)
  const [lastname, setLastname] = useState(user.lastname || '')
  const [idnumber, setIdNumber] = useState(user.idnumber || '')
  const [adress, setAdress] = useState(user.adress || '')
  const [email, setEmail] = useState(user.email || '')
  const [phone, setPhone] = useState(user.phone || '')
  const [avatar, setAvatar] = useState(user.avatar || '')
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [roles, setRoles] = useState([user.roles] || [])
  const [openDelete, setOpenDelete] = useState(false)
  const [userId, setUserId] = useState(null)
  const [alert,setAlert] = useState(false)
  const phoneRegex = /^[\d+ ]*$/
 
  const [updateUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateUserMutation()
  
  useEffect(()=>{
    setName(user.name  || '')
    setLastname(user.lastname || '')
    setIdNumber(user.idnumber || '')
    setAdress(user.adress || '')
    setEmail(user.email || '' )
    setPhone(user.phone || '')
    setAvatar(user.avatar || '')
    setUsername(user.username || '')
    setRoles(user.roles || [])
  },[open])
 
  useEffect(() => {
    if (isError) {
     setAlert(true)
      const timeout = setTimeout(() => {
        setAlert(false)
       
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [isError]);


  const onUpdateUser = async(e) =>{
    e.preventDefault()
    if(canSave){
      await updateUser({id:user.id, name, lastname, idnumber,adress, email, phone, avatar, username, roles})
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
    setIdNumber(event.target.value);
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
  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const handleRolesChange = (event) => {

    const {
      target: { value },
    } = event;
   
    setRoles(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
      );
  }

  const handleCloseDelete = () => {
  setOpenDelete(false);

  };

  const handleCloseCancelDelete = () => {
    setOpenDelete(false);
  };


  const handleUsernameChange = (event) => {
    const username = event.target.value
    setUsername(username)
    username.length>20 || username.length<4? setUsernameError(true) : setUsernameError(false)
 
  }


  const rolesArray = ["Employee","Manager"]

  const rolesOptions = rolesArray.map((role) => {

    return(
      <MenuItem key={role} value={role}>{role} </MenuItem>
    )
  })

  const canSave = [name, lastname, idnumber, adress,phone,roles].every(Boolean)
  
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
        {alert &&  <Alert variant='filled' severity="error" style={{transition:'2s', position:'fixed', top:'0',width:'100%'} }>
  <AlertTitle>Error</AlertTitle>
  {error?.data?.message}— <strong>check it out!</strong>
</Alert>}
      <Dialog open={open}  onClose={handleClose}>
          <DialogTitle sx={{fontFamily:'Dosis',  fontSize:'1.5em'}}>Edit User</DialogTitle>
  
          <DialogContent>
  
         
          <InputLabel htmlFor='name-input' id="name-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}
          >Name</InputLabel>
          
          <TextField required
              margin="dense"
              inputProps={{id:'name-input'}}
              type="text"
              fullWidth
              variant="filled" onChange={handleNameChange} value={name}          
            />

          <InputLabel htmlFor='lastname-input' id="name-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Lastname</InputLabel>
          
          <TextField required
              margin="dense"
              inputProps={{id:'lastname-input'}}
              type="text"
              fullWidth
              variant="filled"
              onChange={handleLastnameChange}
              value={lastname}             
            />

          <InputLabel htmlFor='idnumber-input' id="idnumber-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>ID number</InputLabel>
          
          <TextField required
              margin="dense"
              inputProps={{id:'idnumber-input'}}
              type="text"
              fullWidth
              variant="filled"
              onChange={handleIdNumberChange}
              value={idnumber}             
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
            />

            <InputLabel htmlFor='avatar-input' id="avatar-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Avatar</InputLabel>
          
          <TextField required
              margin="dense"
              inputProps={{id:'avatar-input'}}
              type="email"
              fullWidth
              variant="filled"
              onChange={handleAvatarChange}
              value={avatar}             
            />

          <InputLabel htmlFor='username-input' id="username-label" sx={{fontFamily:'Dosis',  fontWeight:'bold', fontSize:'1.2em'}}>Username</InputLabel>
        
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
            <Button disabled={!canSave} onClick={onUpdateUser}>Edit User</Button>
          </DialogActions>
        </Dialog>
      {userId && <UserDeleteDialog openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleCloseCancelDelete={handleCloseCancelDelete} userId={userId}/>}
      
      </form>
  )
  }

    
}


export default UserEditDialog