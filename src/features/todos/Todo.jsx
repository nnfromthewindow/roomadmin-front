import { useGetTodosByUserQuery } from "./todosApiSlice";

const Todo = ({todoId})=>{
    const {todo} = useGetTodosByUserQuery("todosList",{
    selectFromResult: ({data})=>({
        todo: data?.entities[todoId]
    }),
})

}

export default Todo