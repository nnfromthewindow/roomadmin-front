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
                console.log(response)
                const loadedBookings = response.map(booking=>{
                    booking.id = booking._id
                    return booking
                })
                
                return loadedBookings
            }
        })
    })
})

export const {
    useGetBookingsQuery
} = bookingsApiSlice