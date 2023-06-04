import { useGetCustomersQuery } from "./customersApiSlice"
import { AddCircleOutline } from "@mui/icons-material"
import { ColorRing } from "react-loader-spinner"
import CustomersTable from "./CustomersTable"
import { Button } from "@mui/material"
import { lightBlue } from "@mui/material/colors"
import CustomerAddDialog from "./CustomerAddDialog"
import { useState } from "react"

const CustomersList = () => {
    const{data:customers,
    isLoading,
    isSuccess,
    isError,
    error} = useGetCustomersQuery()

    const [open, setOpen] = useState(false)

let content

const handleClose = () => {
    setOpen(false);
  };

  
const handleClickOpen = () => {
  setOpen(true);
};

if(isLoading){
    content = <div className="spinner">
    <ColorRing
visible={true}
height="200"
width="200"
ariaLabel="blocks-loading"
wrapperStyle={{}}
wrapperClass="blocks-wrapper"
colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
</div>
} else if (isSuccess){

const {ids, entities} = customers

content = (
    <section className="customers">
        <h1 className="main_title">CUSTOMERS</h1>
        <div className="btn_container">
        <Button variant="contained" color="success" sx={{width:'80%', margin:'0 auto', fontFamily:'Dosis',fontSize:'1.55em', gap:'10px'}} onClick={handleClickOpen}><AddCircleOutline sx={{color:lightBlue[500],}}/>Add Customer</Button>
        </div>
     <CustomerAddDialog open={open} handleClose={handleClose}/>
    <CustomersTable customers={customers} />
    </section>
    )
}else if(isError){
    content = <p>{JSON.stringify(error)}</p>
}
return content
}

export default CustomersList