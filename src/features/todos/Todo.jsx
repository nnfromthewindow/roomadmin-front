import { useGetTodosQuery } from "./todosApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { memo } from "react";
import { Edit, Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersApiSlice";

const Todo = ({todoId})=>{

    const{todo}=useGetTodosQuery("todosList",{
        selectFromResult: ({data})=>({
            todo: data?.entities[todoId]
            
        }),    
    })

    /*
    const{user}=useGetUsersQuery("usersList",{
        selectFromResult: ({data})=>({
        user: data?.entities[todo.employee]
        })
    })

    const user = useSelector(state => selectUserById(state,todo?.employee))
*/
    if(todo){
        const date = moment.utc(todo.date).local()
        const dateFormatted = date.format('MMMM D, YYYY')
        return(
            <div className="todo_card">
                <h2 className="todo_date">{dateFormatted}</h2>
                <div className="todo_card--container">
                    <div className="todo_card--text">
                        <h3 className="todo_description">{todo.description}</h3>
                        <h3>Employee:</h3>
                        <h3 className="todo_status"></h3>
                    </div>
                    <div className="todo_card--status">
                        <div className="todosBtn_container">
                            <Button color="success" sx={{backgroundColor:"#221616", borderRadius:'5rem', ":hover":{backgroundColor:'#201915b5', transition:'1s'}}}><Edit/></Button>
                            
                            <div className="todo_status">
                                <h3>STATUS:{todo.status}</h3>

                            </div>
                            <Button color="error" sx={{backgroundColor:"#221616", borderRadius:'5rem', ":hover":{backgroundColor:'#201915b5', transition:'1s'}}}><Delete/></Button>
                        </div>
                    </div>
                
                </div>
             
                
            </div>
            )
    }else return null
}

const memoizedTodo = memo(Todo)

export default memoizedTodo