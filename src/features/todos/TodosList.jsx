import { useGetTodosByUserQuery } from "./todosApiSlice";
import { Link } from "react-router-dom";

const TodosList = () =>{
    const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error
    } = useGetTodosByUserQuery()

    let content
    
    if(isLoading){
        content = <p>"Loading..."</p>
    } else if (isSuccess){

        const{ids, entities} = todos

    content = (
        <section className="todos">
            <h1>Todos</h1>
            <ul>
                {ids.map(todoId =>{
                return <li key={todoId}>
                    <h2>{entities[todoId].description}</h2>
                    <h3>Status:{entities[todoId].status}</h3>
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