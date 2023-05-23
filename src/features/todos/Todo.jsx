import { useGetTodosQuery, useDeleteTodoMutation } from "./todosApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { memo } from "react";
import { Edit, Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { selectUserById, selectAllUsers } from "../users/usersApiSlice";
import EditTodoForm from "./EditTodoForm";
import { useState } from "react";


const Todo = ({todoId})=>{

    const{todo}=useGetTodosQuery("todosList",{
        selectFromResult: ({data})=>({
            todo: data?.entities[todoId]
            
        }),    
    })

    const [deleteTodo, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delError
      }] = useDeleteTodoMutation()

    const{data:users}=useGetUsersQuery()

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const user = useSelector((state) => selectUserById(state,todo?.employee))
   
    
    const onDeleteTodo = async () => {
        await deleteTodo({ id: todo.id })
    }  

    
    if(todo && users){
        
        const date = moment.utc(todo.date).local()
        const dateFormatted = date.format('MMMM D, YYYY')
        return(
            <div className="todo_card">
                <h2 className="todo_date">{dateFormatted}</h2>
                <div className="todo_card--container">
                    <div className="todo_card--text">
                        <h3 className="todo_employee"><u>Employee</u>: {user && `${user.name} ${user.lastname}`}</h3>
                        <h3 className="todo_description">{todo.description}</h3>
                        <h3 className="todo_status"></h3>
                    </div>
                    <div className="todo_card--status">
                        <div className="todosBtn_container">
                            <Button onClick={handleClickOpen}color="success" sx={{backgroundColor:"#221616", borderRadius:'5rem', ":hover":{backgroundColor:'#201915b5', transition:'1s'}}}><Edit/></Button>
                            <EditTodoForm open={open} handleClose={handleClose} users={users}/>
                            <div className="todo_status">
                                <h3>STATUS:{todo.status}</h3>

                            </div>
                            <Button onClick={onDeleteTodo} color="error" sx={{backgroundColor:"#221616", borderRadius:'5rem', ":hover":{backgroundColor:'#201915b5', transition:'1s'}}}><Delete/></Button>
                        </div>
                    </div>
                
                </div>
             
                
            </div>
            )
    }else return null
}

const memoizedTodo = memo(Todo)

export default memoizedTodo