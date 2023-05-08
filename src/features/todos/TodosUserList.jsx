import { useGetTodosQuery } from "./todosApiSlice";
import { Link } from "react-router-dom";
import Todo from "./Todo";

const TodosUserList = () =>{
    const {data:todos,
        isLoading,
        isSuccess,
        isError,
        error} = useGetTodosQuery()
    console.log(todos)
}
export default TodosUserList