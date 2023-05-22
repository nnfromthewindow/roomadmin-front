import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { useState } from 'react';

const NewTodoForm = ({open, handleClose}) =>{
   
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
    <div>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Todo</DialogTitle>

        <DialogContent>
        <InputLabel id="date">Date</InputLabel>          
          <TextField
            autoFocus
            name='date'
            margin="dense"
            id="date"
            type="date"
            fullWidth
            variant="standard"
          />
        <InputLabel id="employee-label">Employee</InputLabel>                   
        <Select
            labelId="employee-label"
            id="employee"
            value={employee}
            
            onChange={handleEmployeeChange}
        >
            <MenuItem value={10}>John Doe</MenuItem>
            <MenuItem value={20}>Billy Weyland</MenuItem>
            <MenuItem value={30}>Mary Johnston</MenuItem>
        </Select>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Status"
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
</div>
)


}

export default NewTodoForm