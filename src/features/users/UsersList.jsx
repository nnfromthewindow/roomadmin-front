import { useGetUsersQuery } from "./usersApiSlice"
import { ColorRing } from "react-loader-spinner"
import { lightBlue } from "@mui/material/colors"
import UserAddDialog from "./userAddDialog"

import { useState, lazy, Suspense } from "react"
import { Button, TextField } from "@mui/material"
import { AddCircleOutline } from "@mui/icons-material"

const UsersTable = lazy(()=> import('./UsersTable'))

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
    } = useGetUsersQuery('usersList')

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
} else if (isSuccess){

    const {ids, entities} = users

    const filteredIds = ids.filter((userId) => {
        const user = entities[userId];
    
        return (
          user &&
          user.name.toLowerCase().includes(filter.toLowerCase()) ||
          user.lastname.toLowerCase().includes(filter.toLowerCase()) || user.idnumber && user.idnumber.toString().includes(filter.toString()) 
        );
      });

      const filteredUsers = filteredIds.map((id)=>entities[id])
    

        

content = (
    <section className="customers">
        <h1 className="main_title">USERS</h1>
        <div className="btn_container">
        <Button variant="contained" color="success" sx={{width:'80%', margin:'0 auto', fontFamily:'Dosis',fontSize:'1.55em', gap:'10px'}} onClick={handleClickOpen}><AddCircleOutline sx={{color:lightBlue[500],}}/>Add User</Button>
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
     <UserAddDialog open={open} handleClose={handleClose}/>
     <Suspense fallback={<div>Loading...</div>}>
     <UsersTable users={filteredUsers} />
     </Suspense>
    
    </section>
    )
}else if(isError){
    content = <section className="customers">
    <h1 className="main_title">USERS</h1>
    <div className="btn_container">
    <Button variant="contained" color="success" sx={{width:'80%', margin:'0 auto', fontFamily:'Dosis',fontSize:'1.55em', gap:'10px'}} onClick={handleClickOpen}><AddCircleOutline sx={{color:lightBlue[500],}}/>Add User</Button>
    </div>
 <UserAddDialog open={open} handleClose={handleClose}/>

</section>
}
return content
}

export default UsersList