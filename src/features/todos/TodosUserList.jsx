import { useGetTodosByUserQuery } from "./todosApiSlice";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const TodosUserList = () =>{
    let {username} = useParams();

    const {data:todos,
        isLoading,
        isSuccess,
        isError,
        error} = useGetTodosByUserQuery(username)

        let content
    
        if(isLoading){
            content = <div className="spinner">
            <ColorRing
      visible={true}
      height="200"
      width="200"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
        </div>
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
export default TodosUserList