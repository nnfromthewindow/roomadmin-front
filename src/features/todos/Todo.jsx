import { useGetTodosQuery } from "./todosApiSlice";

const Todo = ({todoId})=>{
    const {todo} = useGetTodosQuery("todosList",{
    selectFromResult: ({data})=>({
        todo: data?.entities[todoId]
    }),
})

}

export default Todo