import { useUpdateEmployeeTodoMutation } from "./todosApiSlice";
import { memo } from "react";
import PlayCircle from "@mui/icons-material/PlayCircle";
import CheckCircle from "@mui/icons-material/CheckCircle";
import moment from "moment";
import Button from "@mui/material/Button";

const TodoEmployee = ({todoId, username, date, description, status, employee}) => {
 
    const [updateEmployeeTodo, {
        isLoading,
        isSuccess,
        isError,
        error
      }] = useUpdateEmployeeTodoMutation()


   const canSave = [todoId, date, employee, description, status, username].every(Boolean) && !isLoading  

    const handleInProgress = async (e) =>{
        e.preventDefault()
        status='IN PROGRESS'
        if(canSave){
            await updateEmployeeTodo({id:todoId, date:date, description:description, status:status, employee:employee, username:username})
        }
      
    
    }

    const handleCompleted = async (e) =>{
        e.preventDefault()
        status='COMPLETED'
        if(canSave){
            await updateEmployeeTodo({id:todoId, date:date, description:description, status:status, employee:employee, username:username})
        }
    }

    if(todoId && date && description && status && employee && username){

        const statusClassName = status === 'PENDING'
        ? 'status_pending'
        : status === 'IN PROGRESS'
          ? 'status_in-progress'
          : 'status_completed';

        const dateMoment = moment.utc(date).local()
        const dateFormatted = dateMoment.format('MMMM D, YYYY')
        return(
            <div className="todo_card">
                <h2 className="todo_date">{dateFormatted}</h2>
                <div className="todo_card--container">

                    <div className="todo_card--text">
                        <h3 className="todo_description">{description}</h3>
                        <h3 className="todo_status"></h3>
                    </div>

                    <div className="todo_card--status">
                        <div className="btn_container">
                            <Button onClick={handleInProgress}color="warning" sx={{backgroundColor:"#221616", borderRadius:'5rem', ":hover":{backgroundColor:'#201915b5', transition:'1s'}}}><PlayCircle/></Button>
                            
                            <div className="todo_status">
                                    <div style={{display:'flex',gap:'10px', flexWrap:'wrap'}}>
                                        <h3>STATUS:</h3><div className={statusClassName}>{status}</div>
                                    </div>
                                </div>
                            <Button onClick={handleCompleted} color="success" sx={{backgroundColor:"#221616", borderRadius:'5rem', ":hover":{backgroundColor:'#201915b5', transition:'1s'}}}><CheckCircle/></Button>
                        </div>
                    </div>
                
                </div>
             
                
            </div>
            )
    }else return null
}

const memoizedEmployeeTodo = memo(TodoEmployee)


export default memoizedEmployeeTodo