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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useAddNewTodoMutation } from './todosApiSlice';


const NewTodoForm = ({open, handleClose, users}) =>{

    const{ids,entities}= users || {}
  
    const [addNewTodo, {
      isLoading,
      isSuccess,
      isError,
      error
    }] = useAddNewTodoMutation()
   
    const [date, setDate] = useState(dayjs()) 
    const [employee, setEmployee] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');  

    useEffect(()=>{
        setDate(dayjs())
        setEmployee('')
        setDescription('')
        setStatus('')
        handleClose()
      
    },[isSuccess])

    useEffect(()=>{
      setDate(dayjs())
      setEmployee('')
      setDescription('')
      setStatus('')
    },[handleClose])

    const handleEmployeeChange = (event) => {
      setEmployee(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
      };

    const handleDescriptionChange = (event) => {
      const inputDescription = event.target.value;
      if (inputDescription.length <= 200) {
        setDescription(inputDescription);
      }
    };  

    const canSave = [date, employee, description, status].every(Boolean) && !isLoading  

    const onSaveNewTodo = async (e) =>{
      e.preventDefault()
      if(canSave){
        await addNewTodo({date, employee, description, status})
      }
    }

    const employeeOptions = users && ids.map(userId => {
      return(
        <MenuItem key={userId} value={userId}>{entities[userId].name} {entities[userId].lastname}</MenuItem>
      )
    })

if(isLoading){
  return  (<div className="spinner" style={{position:'fixed', margin:'auto',
  width: '100vw',
  height: '100vh',
  top:'0rem',
  left:0,
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
    <form className='todo_form' onSubmit={onSaveNewTodo}>
      
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{fontFamily:'Dosis',  fontSize:'1.5em'}}>Add Todo</DialogTitle>

        <DialogContent>
        
        <InputLabel htmlFor='date-input' id="date-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Date</InputLabel>

        <MobileDatePicker slotProps={{field:{id:'date-input'}}} autoFocus disablePast  onChange={(newDate) => setDate(newDate)} value={date}/>

        <InputLabel htmlFor='employee-input' id="employee-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Employee</InputLabel>                   
        
        <Select required
            labelId="employee-label"
            inputProps={{id:'employee-input'}}
            
            value={employee}
            variant="filled"
            sx={{width:'100%'}}
            onChange={handleEmployeeChange}
        >
            {employeeOptions}
        </Select>
        <InputLabel htmlFor='description-input' id="description-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Description</InputLabel>
        <TextField required
            name='description-input'
            margin="dense"
            inputProps={{id:'description-input'}}
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="filled"
            value={description}
            onChange={handleDescriptionChange}
          />

        <InputLabel htmlFor='status-input' id="status-label" sx={{fontFamily:'Dosis', fontWeight:'bold', fontSize:'1.2em'}}>Status</InputLabel>
         
         <Select required
            labelId="status-label"
            inputProps={{id:'status-input'}}
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

}

export default NewTodoForm