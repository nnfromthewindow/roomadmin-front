import { useGetCustomersQuery } from "./customersApiSlice"
import AddCircleOutline  from "@mui/icons-material/AddCircleOutline"
import { ColorRing } from "react-loader-spinner"
import  TextField from "@mui/material/TextField"
import  Button  from "@mui/material/Button"
import  lightBlue  from "@mui/material/colors/lightBlue"
import CustomerAddDialog from "./CustomerAddDialog"
import { useState, lazy, Suspense } from "react"
import useTitle from "../hooks/useTitle"

const CustomersTable = lazy(()=> import("./CustomersTable"))

const CustomersList = () => {

  useTitle('Roomy - Customers')

    const{data:customers,
    isLoading,
    isSuccess,
    isError,
    error} = useGetCustomersQuery('customersList')

   
    const [open, setOpen] = useState(false)
    const [filter, setFilter] = useState("")
    
let content

const handleClose = () => {
    setOpen(false);
  }

  
const handleClickOpen = () => {
  setOpen(true);
}

const handleFilterChange = (event) => {
    setFilter(event.target.value);
}



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
} else if (isSuccess ){

    const {ids, entities} = customers

    const filteredIds = ids.filter((customerId) => {
        const customer = entities[customerId];
    
        return (
          customer &&
          customer.name.toLowerCase().includes(filter.toLowerCase()) ||
          customer.lastname.toLowerCase().includes(filter.toLowerCase()) ||customer.idnumber && customer.idnumber.toString().includes(filter.toString()) 
        );
      });

      const filteredCustomers = filteredIds.map((id)=>entities[id])
    

        

content = (
    <section className="customers">
        <h1 className="main_title">CUSTOMERS</h1>
        <div className="btn_container">
        <Button variant="contained" color="success" sx={{width:'80%', margin:'0 auto', fontFamily:'Dosis',fontSize:'1.55em', gap:'10px'}} onClick={handleClickOpen}><AddCircleOutline sx={{color:lightBlue[500],}}/>Add Customer</Button>
        </div>
        <div className="filter_container">
                    <TextField
                    label="Filter"
                    variant="outlined"
                    value={filter}
                    placeholder="Name, lastname or ID°"
                    onChange={handleFilterChange}
                    sx={{marginTop:'2rem', width: "80%" }}
                    />
                </div>
     <CustomerAddDialog open={open} handleClose={handleClose}/>
    <Suspense fallback={<div>Loading...</div>}>
    <CustomersTable customers={filteredCustomers} />
    </Suspense> 
    
    </section>
    )
}else if(isError){
    content = <section className="customers">
    <h1 className="main_title">CUSTOMERS</h1>
    <div className="btn_container">
    <Button variant="contained" color="success" sx={{width:'80%', margin:'0 auto', fontFamily:'Dosis',fontSize:'1.55em', gap:'10px'}} onClick={handleClickOpen}><AddCircleOutline sx={{color:lightBlue[500],}}/>Add Customer</Button>
    </div>

 <CustomerAddDialog open={open} handleClose={handleClose}/>

</section>
}
return content
}

export default CustomersList