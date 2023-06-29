import { useGetTodosQuery, useDeleteTodoMutation } from "./todosApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { memo } from "react";
import { Edit, Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { selectUserById} from "../users/usersApiSlice";
import EditTodoForm from "./EditTodoForm";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";

const Todo = ({todoId})=>{

    const{todo}=useGetTodosQuery("todosList",{
        selectFromResult: ({data})=>({
            todo: data?.entities[todoId]
            
        }),    
    })

    const [deleteTodo, {
        isSuccess,
        isLoading,
        isError,
        error
      }] = useDeleteTodoMutation()

    const{data:users}=useGetUsersQuery('usersList')

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    
    const onDeleteTodo = async () => {
        await deleteTodo({ id: todo.id })
    }  


        if(isLoading){
            return  (<div className="spinner" style={{position:'fixed', margin:'auto',
            width: '100vw',
            height: '100vh',
            top:'0rem',
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
        }else if(todo && users){

            const{ids,entities} = users

            const statusClassName = todo.status === 'PENDING'
            ? 'status_pending'
            : todo.status === 'IN PROGRESS'
              ? 'status_in-progress'
              : 'status_completed';
    
            const date = moment.utc(todo.date).local()
            const dateFormatted = date.format('MMMM D, YYYY')
            return(
                <div className="todo_card">
                    <h2 className="todo_date">{dateFormatted}</h2>
                    <div className="todo_card--container">
                        <div className="todo_card--text">
                            <h3 className="todo_employee"><u>Employee</u>: {users && `${entities[todo.employee].name} ${entities[todo.employee].lastname}`}</h3>
                            <h3 className="todo_description">{todo.description}</h3>
                            <h3 className="todo_status"></h3>
                        </div>
                        <div className="todo_card--status">
                            <div className="btn_container">
                                <Button onClick={handleClickOpen}color="success" sx={{backgroundColor:"#221616", borderRadius:'5rem', ":hover":{backgroundColor:'#201915b5', transition:'1s'}}}><Edit/></Button>
                                <EditTodoForm open={open} handleClose={handleClose} users={users} todo={todo}/>
                                <div className="todo_status">
                                    <div style={{display:'flex',gap:'10px', flexWrap:'wrap'}}>
                                        <h3>STATUS:</h3><div className={statusClassName}>{todo.status}</div>
                                    </div>
    
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