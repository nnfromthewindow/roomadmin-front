import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const bookingsAdapter = createEntityAdapter()
const initialState = bookingsAdapter.getInitialState()

export const bookingsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getBookings: builder.query({
            query:()=>({
                url:'/bookings',
                validateStatus:(response,result)=> {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: (response) =>{
               
                const loadedBookings = response.map(booking=>{
                    booking.id = booking._id
                    return booking
                })
                
                return bookingsAdapter.setAll(initialState, loadedBookings)
            },
            providesTags: (result, error, arg) =>{
                if(result?.ids){
                return [
                    {type:'Booking', id:'LIST'},
                    ...result.ids.map(id => ({ type:'Booking', id}))
                ]
                } else return [{type: 'Booking', id:'LIST'}]
            }
        }),
    })
})

export const {
    useGetBookingsQuery
} = bookingsApiSlice