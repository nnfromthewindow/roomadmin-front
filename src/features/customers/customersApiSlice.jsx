import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const customersAdapter = createEntityAdapter()
const initialState = customersAdapter.getInitialState()

export const customersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
    getCustomers: builder.query({
        query: ()=>({
            url:'/clients',
        validateStatus: (response, result)=>{
            return response.status === 200 && !result.isError},
        }),
    transformResponse: (response) => {
        
    const loadedCustomers = response.map(customer=>{
        customer.id = customer._id
        return customer})
    return customersAdapter.setAll(initialState, loadedCustomers)},
    providesTags: (result, error, arg) => {
        if(result?.ids){
            return [
                {type: 'Customer', id:'LIST'},
                ...result.ids.map(id => ({type:'Note', id}))
            ]
        }else return [{type:'Customer', id:'LIST'}]
    }
    })
})
})

export const {
    useGetCustomersQuery
} = customersApiSlice

