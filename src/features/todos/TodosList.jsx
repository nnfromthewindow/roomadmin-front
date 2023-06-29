import { useGetTodosQuery } from "./todosApiSlice";
import { ColorRing } from "react-loader-spinner";
import Todo from "./Todo";
import { Button, TextField } from "@mui/material";
import { AddCircleOutline} from "@mui/icons-material";
import { lightBlue } from "@mui/material/colors";
import { useState, useMemo } from "react";
import NewTodoForm from "./NewTodoForm";
import { useGetUsersQuery } from "../users/usersApiSlice";
import TablePagination from '@mui/material/TablePagination';


const TodosList = () =>{
    const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error
    } = useGetTodosQuery('todosList',{
      pollingInterval: 600000,
      

  })


    const{data:users}=useGetUsersQuery('usersList')

    const [open, setOpen] = useState(false)
    const [filter, setFilter] = useState("")
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
      }

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  

  
    let content
   
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

        const{ids, entities} = todos || {}
        const{ entities:usersEntities} = users || {}

        

        const filteredIds =ids && ids.filter((todoId) => {
         
          const todo = entities[todoId] || {};
            
          const user = todo && users && usersEntities[todo.employee] || {};
         

            return (
              todo &&
              user &&
              user.name?.toLowerCase().includes(filter.toLowerCase()) ||
              user.lastname?.toLowerCase().includes(filter.toLowerCase()) ||
              todo.date?.includes(filter)
            );
          });
        
          const visibleRows =filteredIds && filteredIds.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
              )


        content = (
            <section className="todos_list">
                
                <h1 className="main_title">TODOS</h1>
                <div className="btn_container">
                <Button variant="contained" color="success" sx={{width:'80%', margin:'0 auto', fontFamily:'Dosis',fontSize:'1.55em', gap:'10px'}} onClick={handleClickOpen}><AddCircleOutline sx={{color:lightBlue[500],}}/>Add Todo</Button>
                <NewTodoForm open={open} handleClose={handleClose} users={users}/>
                </div>
                <div className="filter_container">
                    <TextField
                    id="filter"
                    name="filter-input"
                    label="Filter"
                    variant="outlined"
                    value={filter}
                    onChange={handleFilterChange}
                    sx={{marginTop:'2rem', width: "80%" }}
                    />
                </div>
                
                {filteredIds && visibleRows.map((todoId)=>{
               return <Todo key={todoId} todoId={todoId}/>})}
               <div >
                   <TablePagination
                      id="table_pagination"
                      
                      rowsPerPageOptions={[10, 50, 100]}
                      labelRowsPerPage='Todos per page'
                      component="div"
                      count={filteredIds  && filteredIds.length || 1}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
               </div>
                  
            </section>
            
            )
    }else if(isError){ 
        content = <>
                  <h1 className="main_title">NO TODOS</h1>
                  <div className="btn_container">
                <Button variant="contained" color="success" sx={{width:'80%', margin:'0 auto', fontFamily:'Dosis',fontSize:'1.55em', gap:'10px'}} onClick={handleClickOpen}><AddCircleOutline sx={{color:lightBlue[500],}}/>Add Todo</Button>
                <NewTodoForm open={open} handleClose={handleClose} users={users}/>
               
                </div>
                  </>
    }
    return content
}
export default TodosList