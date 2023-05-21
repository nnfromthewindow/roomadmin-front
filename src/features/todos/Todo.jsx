import { useGetTodosQuery } from "./todosApiSlice";
import { memo } from "react";
import { Edit, Delete } from "@mui/icons-material";

const Todo = ({todoId})=>{

    const{todo}=useGetTodosQuery("todosList",{
        selectFromResult: ({data})=>({
            todo: data?.entities[todoId]
            
        }),    
    })

    if(todo){
       
        return(
            <div className="todo_card">
                <h2 className="todo_date">{todo.date}</h2>
                <div className="todo_card--container">
                    <div className="todo_card--text">
                        <h3 className="todo_description">{todo.description}</h3>
                        <h3 className="todo_status"></h3>
                    </div>
                    <div className="todo_card--status">
                        <div className="todosBtn_container">
                            <Edit/>
                            <div className="todo_status">
                                <h3>STATUS:{todo.status}</h3>

                            </div>
                            <Delete/>
                        </div>
                    </div>
                
                </div>
             
                
            </div>
            )
    }else return null
}

const memoizedTodo = memo(Todo)

export default memoizedTodo