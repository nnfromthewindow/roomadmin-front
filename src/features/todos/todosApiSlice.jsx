import { apiSlice } from "../../app/api/apiSlice";

export const todosApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodos: builder.query({
            query: ()=>'/todos',
            keepUnusedDataFor: 10,
        })
    })
})

export const {
    useGetTodosQuery
} = todosApiSlice