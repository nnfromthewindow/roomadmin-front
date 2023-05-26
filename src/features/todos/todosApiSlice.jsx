import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


const todosAdapter = createEntityAdapter({
    sortComparer: (a, b) => {
        if (a.date === b.date) {
          return 0;
        } else if (a.date && !b.date) {
          return -1;
        } else if (!a.date && b.date) {
          return 1;
        } else {
          return a.date > b.date ? -1 : 1;
        }
      }
})
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
        transformResponse: response => {
            const loadedTodos = response.todos.map(todo=>{
                todo.id=todo._id
                return todo
            })
        
           return todosAdapter.setAll(initialState, loadedTodos)
            
        },
        providesTags: (result, error, arg) => {
            if(result?.ids){
                return[
                {type:'Todo', id:'LIST'},
                ...result.ids.map(id =>({type:'Todo', id}))
                ]
            } else return [{type:'Todo', id:'LIST'}]
        }
    }),
    getTodos: builder.query({
            query: () =>({
            url: '/todos',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
        }),
        transformResponse: response => {
            
            const loadedTodos = response.map(todo=>{
                todo.id=todo._id
                return todo
            })
        
           return todosAdapter.setAll(initialState, loadedTodos)
            
        },
        providesTags: (result, error, arg) => {
            if(result?.ids){
                return[
                {type:'Todo', id:'LIST'},
                ...result.ids.map(id =>({type:'Todo', id}))
                ]
            } else return [{type:'Todo', id:'LIST'}]
        }
    }),
    addNewTodo: builder.mutation({
        query: initialTodo => ({
            url: '/todos',
            method: 'POST',
            body: {
                ...initialTodo,
            }
        }),
        invalidatesTags: [
            { type: 'Todo', id: "LIST" }
        ]
    }),
    updateTodo: builder.mutation({
        query: initialTodo => ({
            url: '/todos',
            method: 'PATCH',
            body: {
                ...initialTodo,
            }
        }),
        invalidatesTags: (result, error, arg) => [
            { type: 'Todo', id: arg.id }
        ]
    }),
    deleteTodo: builder.mutation({
        query: ({ id }) => ({
            url: `/todos`,
            method: 'DELETE',
            body: { id }
        }),
        invalidatesTags: (result, error, arg) => [
            { type: 'Todo', id: arg.id }
        ]
    }),
    })
})

export const {
    useGetTodosQuery,
    useGetTodosByUserQuery,
    useAddNewTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = todosApiSlice

export const selectTodosResult = todosApiSlice.endpoints.getTodosByUser.select()

const selectTodosData = createSelector(
    selectTodosResult,
    todosResult => todosResult.data 
)

export const {
    selectAll: selectAllTodos,
    selectById: selectTodoById,
    selectIds: selectTodoIds
} = todosAdapter.getSelectors(state => selectTodosData(state) ?? initialState)