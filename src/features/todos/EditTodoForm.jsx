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
import { useUpdateTodoMutation} from './todosApiSlice';


const EditTodoForm = ({open, handleClose, users, todo}) =>{

    const{ids,entities}=users
  
    const [updateTodo, {
      isLoading,
      isSuccess,
      isError,
      error
    }] = useUpdateTodoMutation()

   
    const [date, setDate] = useState(dayjs(todo.date)) 
    const [employee, setEmployee] = useState(todo.employee); 
    const [description, setDescription] = useState(todo.description);
    const [status, setStatus] = useState(todo.status);  


    useEffect(()=>{
      if(isSuccess){
        handleClose()
      }
    },[isSuccess])

    
 

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

    const onSaveSelectedTodo = async (e) =>{
      e.preventDefault()
      if(canSave){
        await updateTodo({id:todo.id, date, employee, description, status})
      }
    }

    const employeeOptions = ids.map(userId => {
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
    <form className='todo_form' onSubmit={onSaveSelectedTodo}>
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
          <Button onClick={onSaveSelectedTodo} disabled={!canSave}>Edit Todo</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
    
    </form>
)
}




}

export default EditTodoForm