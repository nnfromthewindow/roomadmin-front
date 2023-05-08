import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const todosAdapter = createEntityAdapter(/*create sort method*/)
const initialState = todosAdapter.getInitialState()

export const todosApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodos: builder.query({
            query: () =>({
            url: '/todos',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
        }),
        transformResponse: responseData => {
            const loadedTodos = responseData.map(todo => {
                todo.id = todo._id
                return todo
            });
            return todosAdapter.setAll(initialState, loadedTodos)
        },
    })
    })
})

export const {
    useGetTodosQuery
} = todosApiSlice