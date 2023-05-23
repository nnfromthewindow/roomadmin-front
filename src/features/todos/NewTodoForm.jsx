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
import { useAddNewTodoMutation } from './todosApiSlice';

const NewTodoForm = ({open, handleClose}) =>{

    const [addNewTodo, {
      isLoading,
      isSuccess,
      isError,
      error
    }] = useAddNewTodoMutation()

    const navigate = useNavigate()
   
    const [date, setDate] = useState('')
  
    const [description, setDescription] = useState('');
    
    const [status, setStatus] = useState('');  

    const [employee, setEmployee] = useState('');

    

    const handleEmployeeChange = (event) => {
      setEmployee(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
      };


return (
    <section className='todo_form'>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{fontFamily:'Dosis',  fontSize:'1.5em'}}>Add Todo</DialogTitle>

        <DialogContent>
        <InputLabel id="date-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Date</InputLabel>

        <MobileDatePicker disablePast defaultValue={dayjs()}/>
        <InputLabel id="employee-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Employee</InputLabel>                   
        <Select
            labelId="employee-label"
            id="employee"
            value={employee}
            variant="filled"
            sx={{width:'100%'}}
            onChange={handleEmployeeChange}
        >
            <MenuItem value={10}>John Doe</MenuItem>
            <MenuItem value={20}>Billy Weyland</MenuItem>
            <MenuItem value={30}>Mary Johnston</MenuItem>
        </Select>
        <InputLabel id="description-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Description</InputLabel>
        <TextField
            autoFocus
            margin="dense"
            id="description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="filled"
          />
        <InputLabel id="status-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Status</InputLabel>
         <Select
            labelId="status-label"
            id="demo-simple-select"
            value={status}
            variant="filled"
            sx={{width:'100%'}} 
            onChange={handleStatusChange}
        >
            <MenuItem value={1}>PENDING</MenuItem>
            <MenuItem value={2}>IN PROGRESS</MenuItem>
            <MenuItem value={3}>COMPLETED</MenuItem>
        </Select>  
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add Todo</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
    
    </section>
)


}

export default NewTodoForm