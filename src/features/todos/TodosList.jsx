import { useGetTodosQuery } from "./todosApiSlice";
import { Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import Todo from "./Todo";

const TodosList = () =>{
    const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error
    } = useGetTodosQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
  
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
/*
    content = (
        <section className="todos">
            <h1 className="main_title">TODOS</h1>
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
        */
      
        content = (
            <div>
                <h1 className="main_title">TODOS</h1>
                {ids.map((todoId)=>{
               return <Todo key={todoId} todoId={todoId}/>})}
            </div>
            
            )
    }else if(isError){
        content = <p>{JSON.stringify(error)}</p>
    }
    return content
}
export default TodosList