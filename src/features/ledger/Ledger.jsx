import { useGetLedgerQuery } from "./ledgerApiSlice"
import { ColorRing } from "react-loader-spinner"
import { useState,useMemo, useEffect, lazy, Suspense } from "react"
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers';
import AddCircleOutline from "@mui/icons-material/AddCircleOutline"
import lightBlue  from "@mui/material/colors/lightBlue"
import { useAddNewLedgerItemMutation } from "./ledgerApiSlice"
import moment from "moment"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import useTitle from "../hooks/useTitle";

const LedgerTable = lazy(() => import( "./LedgerTable"));

const Ledger = () => {

  useTitle('Roomy - Ledger')

    const {
        data: ledger,
        isLoading,
        isSuccess,
        isError,
        error
        } = useGetLedgerQuery('ledgerList',{
          pollingInterval: 900000
      })

        const [addNewLedgerItem, {
          isLoading:isLoadingNewLedgerItem,
          isSuccess:isSuccessNewLedgerItem,
          isError:isErrorNewLedgerItem,
          error: errorNewLedgerItem
        }] = useAddNewLedgerItemMutation()    
       
        const{ids,entities}=ledger || {}
        
        const rows = entities && ids && ids.map((id)=>{
            return{id:id,
                date:entities[id].date.split('T')[0],
              description:entities[id].description,
              expenses:Number(entities[id].expenses),
              income:Number(entities[id].income.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/\.\d+/g, ''))
            }
          })
        
        const [date, setDate] = useState('') || ''
        const [description, setDescription] = useState('') || '' 
        const [type, setType] = useState('') || ''
        const [value, setValue] = useState('') || ''
        const [alert,setAlert] = useState(false)

        useEffect(() => {
          if (isErrorNewLedgerItem) {
           setAlert(true)
            const timeout = setTimeout(() => {
              setAlert(false)
             
            }, 5000);
      
            return () => clearTimeout(timeout);
          }
        }, [isErrorNewLedgerItem]);

        const memoizedTable = useMemo(()=>{
        return(<Suspense fallback={<div>Loading...</div>}>
          <LedgerTable rows={rows}/>
          </Suspense>)
        },[ledger])
     
        const handleDescriptionChange = (event) => {
          const inputDescription = event.target.value;
          if (inputDescription.length <= 80) {
            setDescription(inputDescription);
          }
        };

        const handleTypeChange = (event) => {
            setType(event.target.value);
        };  

        const handleValueChange = (event) => {
          const inputValue = event.target.value;
        
          const rawNumber = inputValue.replace(/\./g, '');
        
          if (/^\d{0,20}(\.\d{0,2})?$/.test(rawNumber)) {
      
            const formattedNumber = Number(rawNumber).toLocaleString('es-ES');
            setValue(formattedNumber);
          }
        };

        const canSave = [date, description, type, value].every(Boolean) && value !='0'
        
        const onSaveNewLedgerItem = async (e) =>{
          e.preventDefault()
          if(canSave){
           
            let newDate = moment(date.$d, "YYYY-MM-DD").set({ hour: 12, minute: 0, second: 0 })    
            let expenses
            let income

            if(type == 'Expenses'){
              expenses = value.toString().replace(/\./g, '')
              income = '0'
            }
            if(type == 'Income'){
              expenses = '0'
              income = value.toString().replace(/\./g, '')
            }
           
            await addNewLedgerItem({date:newDate, description, expenses, income})
            setDate('')
            setDescription('')
            setType('')
            setValue('')
           
          }
        }

        let content
          
          if(isLoading){
              return (<div className="spinner">
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
        } else if (isLoadingNewLedgerItem){
          return  (<div className="spinner" style={{position:'fixed', margin:'auto',
          width: '100vw',
          height: '100vh',
          top:'0rem',
          left:'0rem',
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
        
        } else if (isSuccess || isError){
          return (     
            <section className="ledger">
                <h1 className="main_title">LEDGER</h1>
                  
                <form onSubmit={onSaveNewLedgerItem}>
                {alert &&  <Alert variant='filled' severity="error" style={{transition:'2s', position:'fixed', top:'0',width:'100%'}}>
        <AlertTitle>Error</AlertTitle>
        {errorNewLedgerItem?.data?.message}— <strong>check it out!</strong>
      </Alert>}
                <div className="ledger_add">

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                
                  
                  <MobileDatePicker slotProps={{field:{id:'ledger-date-input'}}} onChange={(newDate) => setDate(newDate)}  value={date} sx={{width:'12rem'}}/>

                  <TextField onChange={handleDescriptionChange} value={description} label="Description" variant="outlined" style={{width:'40rem'}}/>
                  
                  <FormControl >
                  <InputLabel htmlFor="type-input" id="type-label" >Type</InputLabel>
                  
                  <Select
                  inputProps={{id:'type-input'}}
                  value={type}
                  label="Type"
                  placeholder="Type"
                  onChange={handleTypeChange}
                  sx={{width:'10rem'}}
                  >
                  <MenuItem value={'Expenses'}>Expenses</MenuItem>
                  <MenuItem value={'Income'}>Income</MenuItem>
                  </Select>
                  </FormControl>
    
                  <TextField InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,          
                  }} onChange={handleValueChange} value={value} label="Value" variant="outlined" />

                  <Button type="submit" disabled={!canSave} color="success" variant="contained" sx={{  fontFamily:'Dosis',fontSize:'1.55em',width:'240px'}} >Add Item<AddCircleOutline sx={{color:lightBlue[500],marginLeft:'8px'}}/></Button>

                  </LocalizationProvider>
                  </div>
                  
                  </form>
                  
        
              {isSuccess && memoizedTable}
        
                
            </section>
            )

        }
}

export default Ledger