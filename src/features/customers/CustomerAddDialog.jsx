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


const CustomerAddDialog = ({open, handleClose}) => {
    return (
        <form className='todo_form' >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog open={open}  onClose={handleClose}>
            <DialogTitle sx={{fontFamily:'Dosis',  fontSize:'1.5em'}}>Add Customer</DialogTitle>
    
            <DialogContent>
    
           
            <InputLabel id="name-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Name</InputLabel>
            
            <TextField required
                margin="dense"
                id="name"
                type="text"
                fullWidth
                variant="filled"             
              />

            <InputLabel id="name-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Lastname</InputLabel>
            
            <TextField required
                margin="dense"
                id="lastname"
                type="text"
                fullWidth
                variant="filled"             
              />

            <InputLabel id="idnumber-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>ID number</InputLabel>
            
            <TextField required
                margin="dense"
                id="idnumber"
                type="text"
                fullWidth
                variant="filled"             
              />

            <InputLabel id="adress-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Adress</InputLabel>
            
            <TextField required
                margin="dense"
                id="adress"
                type="text"
                fullWidth
                variant="filled"             
              />

            <InputLabel id="email-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Email</InputLabel>
            
            <TextField required
                margin="dense"
                id="email"
                type="email"
                fullWidth
                variant="filled"             
              />

            <InputLabel id="phone-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Phone</InputLabel>
            
            <TextField required
                margin="dense"
                id="phone"
                type="phone"
                fullWidth
                variant="filled"             
              />
        
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button>Add Customer</Button>
            </DialogActions>
          </Dialog>
        </LocalizationProvider>
        
        </form>
    )
}

export default CustomerAddDialog