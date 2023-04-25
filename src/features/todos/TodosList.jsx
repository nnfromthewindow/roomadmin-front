import { useGetTodosQuery } from "./todosApiSlice";
import { Link } from "react-router-dom";

const TodosList = () =>{
    const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error
    } = useGetTodosQuery()

    let content
    
    if(isLoading){
        content = <p>"Loading..."</p>
    } else if (isSuccess){
    content = (
        <section className="todos">
            <h1>Todos</h1>
            <ul>
                {todos.map((todo, i) =>{
                return <li key={i}>
                    <h2>{todo.description}</h2>
                    <h3>Status:{todo.status}</h3>
                </li>
                })}
            </ul>
            <Link to="/welcome">Back to Welcome</Link>
        </section>
        )
    }else if(isError){
        content = <p>{JSON.stringify(error)}</p>
    }
    return content
}
export default TodosList