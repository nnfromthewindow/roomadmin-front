import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


const todosAdapter = createEntityAdapter(/*create sort method*/)
const initialState = todosAdapter.getInitialState()

export const todosApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodosByUser: builder.query({
            query: (username) =>({
            url: `todos/${username}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
        }),
        transformResponse: (response)  => {
            const loadedTodos = response.todos.map(todo=>{
                todo.id=todo._id
                return todo
            })
           console.log(loadedTodos)
    
       
           return loadedTodos
            
        },
    })
    })
})

export const {
    useGetTodosByUserQuery
} = todosApiSlice