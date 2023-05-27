import { useGetTodosByUserQuery, useUpdateTodoMutation, selectTodoById } from "./todosApiSlice"
import { memo } from "react";
import { PlayCircle, CheckCircle } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";

const TodoEmployee = ({todoId}) => {
   /* 
    const{todo}=useGetTodosByUserQuery("todosEmployeeList",{
        selectFromResult: ({data})=>({
            todo: data?.entities[todoId]
            
        }),    
    })

    */
    const todo = useSelector((state) => selectTodoById(state,todoId))
   
    console.log(todoId)
    const [updateTodo, {
        isLoading,
        isSuccess,
        isError,
        error
      }] = useUpdateTodoMutation()

    
    const [status, setStatus] = useState(todo.status);    

    const handleInProgress = async (e) =>{
      /*  e.preventDefault()
        todo.status='IN PROGRESS'
        await updateTodo({id:todo.id, date:todo.date, employee:todo.employee, description:todo.description, status:todo.status})
    */
    }

    const handleCompleted = async (e) =>{
        /*
        e.preventDefault()
        todo.status='COMPLETED'
        await updateTodo({id:todo.id, date:todo.date, employee:todo.employee, description:todo.description, status:todo.status})
    */
    }

    if(todo){

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
                        <h3 className="todo_description">{todo.description}</h3>
                        <h3 className="todo_status"></h3>
                    </div>

                    <div className="todo_card--status">
                        <div className="todosBtn_container">
                            <Button onClick={handleInProgress}color="success" sx={{backgroundColor:"#221616", borderRadius:'5rem', ":hover":{backgroundColor:'#201915b5', transition:'1s'}}}><PlayCircle/></Button>
                            
                            <div className="todo_status">
                                <h3>STATUS:<div className={statusClassName}>{todo.status}</div></h3>

                            </div>
                            <Button onClick={handleCompleted} color="error" sx={{backgroundColor:"#221616", borderRadius:'5rem', ":hover":{backgroundColor:'#201915b5', transition:'1s'}}}><CheckCircle/></Button>
                        </div>
                    </div>
                
                </div>
             
                
            </div>
            )
    }else return null
}

const memoizedEmployeeTodo = memo(TodoEmployee)


export default memoizedEmployeeTodo