
import { useGetTodosByUserQuery } from "./todosApiSlice";
import { Link } from "react-router-dom";
import Todo from "./Todo";
import { useParams } from "react-router-dom";

const TodosUserList = () =>{
    let {username} = useParams();

    const {data:todos,
        isLoading,
        isSuccess,
        isError,
        error} = useGetTodosByUserQuery(username)

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
export default TodosUserList