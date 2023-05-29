import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, InputLabel, Select, MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';


const NewBookingForm = ({open, handleClose }) =>{

   

return (
    <form className='todo_form' >
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Dialog open={open}>
        <DialogTitle sx={{fontFamily:'Dosis',  fontSize:'1.5em'}}>Add Booking</DialogTitle>

        <DialogContent>
          
       
        </DialogContent>
        <DialogActions>
          <Button >Cancel</Button>
          <Button >Add Todo</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
    
    </form>
)


}

export default NewBookingForm