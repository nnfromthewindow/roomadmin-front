import { useGetTodosQuery } from "./todosApiSlice";
import { ColorRing } from "react-loader-spinner";
import Todo from "./Todo";
import { Button } from "@mui/material";
import { AddCircleOutline} from "@mui/icons-material";
import { lightBlue } from "@mui/material/colors";

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
      
        content = (
            <section className="todos_list">
                
                <h1 className="main_title">TODOS</h1>
                <div className="todosBtn_container">
                <Button variant="contained" color="success" sx={{width:'80%', margin:'0 auto', fontFamily:'Dosis',fontSize:'1.55em'}}><AddCircleOutline sx={{color:lightBlue[500],}}/>Add Todo</Button>
                </div>
                {ids.map((todoId)=>{
               return <Todo key={todoId} todoId={todoId}/>})}
            </section>
            
            )
    }else if(isError){
        content = <p>{JSON.stringify(error)}</p>
    }
    return content
}
export default TodosList