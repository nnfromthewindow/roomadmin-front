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
            url:'/customers',
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
                    ...result.ids.map(id => ({type:'Customer', id}))
                ]
            }else return [{type:'Customer', id:'LIST'}]
        }
    }),
    addNewCustomer: builder.mutation({
        query: initialCustomer => ({
            url: '/customers',
            method: 'POST',
            body: {
                ...initialCustomer,
            }
        }),
        invalidatesTags: [
            { type: 'Customer', id: "LIST" }
        ]
    }),
    updateCustomer: builder.mutation({
        query: initialCustomer => ({
            url: '/customers',
            method: 'PATCH',
            body: {
                ...initialCustomer,
            }
        }),
        invalidatesTags: (result, error, arg) => [
            { type: 'Customer', id: arg.id }
        ]
    }),
    deleteCustomer: builder.mutation({
        query: ({ id }) => ({
            url: `/customers`,
            method: 'DELETE',
            body: { id }
        }),
        invalidatesTags: (result, error, arg) => [
            { type: 'Customer', id: arg.id }
        ]
    }),
})
})

export const {
    useGetCustomersQuery,
    useAddNewCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation
} = customersApiSlice

export const selectCustomersResult = customersApiSlice.endpoints.getCustomers.select()

const selectCustomersData = createSelector(
    selectCustomersResult,
    customersResult => customersResult.data 
)

export const {
    selectAll: selectAllCustomers,
    selectById: selectCustomerById,
    selectIds: selectCustomerIds
} = customersAdapter.getSelectors(state => selectCustomersData(state) ?? initialState)