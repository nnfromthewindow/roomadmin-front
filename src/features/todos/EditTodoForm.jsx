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
import { useUpdateTodoMutation } from './todosApiSlice';


const EditTodoForm = ({open, handleClose, users}) =>{

    const{ids,entities}=users
  
    const [addNewTodo, {
      isLoading,
      isSuccess,
      isError,
      error
    }] = useUpdateTodoMutation()

    const navigate = useNavigate()
   
    const [date, setDate] = useState(dayjs()) 
    const [employee, setEmployee] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');  

    useEffect(()=>{
      if(isSuccess){
        setDate(dayjs())
        setEmployee('')
        setDescription('')
        setStatus('')
        handleClose()
      }
    },[isSuccess, navigate])

    const handleEmployeeChange = (event) => {
      setEmployee(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
      };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };  

    const canSave = [date, employee, description, status].every(Boolean) && !isLoading  

    const onSaveNewTodo = async (e) =>{
      e.preventDefault()
      if(canSave){
        await addNewTodo({date, employee, description, status})
      }
    }

    const employeeOptions = ids.map(userId => {
      return(
        <MenuItem key={userId} value={userId}>{entities[userId].name} {entities[userId].lastname}</MenuItem>
      )
    })

return (
    <form className='todo_form' onSubmit={onSaveNewTodo}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{fontFamily:'Dosis',  fontSize:'1.5em'}}>Edit Todo</DialogTitle>

        <DialogContent>
        <InputLabel id="date-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Date</InputLabel>

        <MobileDatePicker disablePast  onChange={(newDate) => setDate(newDate)} value={date}/>
        <InputLabel id="employee-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Employee</InputLabel>                   
        <Select required
            labelId="employee-label"
            id="employee"
            value={employee}
            variant="filled"
            sx={{width:'100%'}}
            onChange={handleEmployeeChange}
        >
            {employeeOptions}
        </Select>
        <InputLabel id="description-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Description</InputLabel>
        <TextField required
            autoFocus
            margin="dense"
            id="description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="filled"
            value={description}
            onChange={handleDescriptionChange}
          />
        <InputLabel id="status-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Status</InputLabel>
         <Select required
            labelId="status-label"
            id="demo-simple-select"
            value={status}
            variant="filled"
            sx={{width:'100%'}} 
            onChange={handleStatusChange}
        >
            <MenuItem value={'PENDING'}>PENDING</MenuItem>
            <MenuItem value={'IN PROGRESS'}>IN PROGRESS</MenuItem>
            <MenuItem value={'COMPLETED'}>COMPLETED</MenuItem>
        </Select>  
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSaveNewTodo} disabled={!canSave}>Add Todo</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
    
    </form>
)


}

export default EditTodoForm