import { useGetTodosByUserQuery } from "./todosApiSlice";
import { useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import TodoEmployee from "./TodoEmployee";


const TodosUserList = () =>{
    let {username} = useParams();

    const {data:todos,
        isLoading,
        isSuccess,
        isError,
        error} = useGetTodosByUserQuery(username,{
            pollingInterval: 300000,
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
   
            content = (
                <section className="todos_list">
                    
                    <h1 className="main_title">TODOS</h1>

                    {ids.map((todoId)=>{
                   return <TodoEmployee key={todoId} todoId={todoId} username={username} date={entities[todoId].date} description={entities[todoId].description} status={entities[todoId].status} employee={entities[todoId].employee}/>})}
                </section>
                
                )

        }else if(isError){
            content = <h3 style={{fontFamily:'Dosis', fontSize:'2em'}}>{JSON.stringify(error.data.message)}{' Please login again'}</h3>
        }
        return content
        
    
}
export default TodosUserList