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
        addNewBooking: builder.mutation({
            query: initialBooking => ({
                url: '/bookings',
                method: 'POST',
                body: {
                    ...initialBooking,
                }
            }),
            invalidatesTags: [
                { type: 'Booking', id: "LIST" }
            ]
        }),
        updateBooking: builder.mutation({
            query: initialBooking => ({
                url: '/bookings',
                method: 'PATCH',
                body: {
                    ...initialBooking,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Booking', id: arg.id }
            ]
        }),
        deleteBooking: builder.mutation({
            query: ({ id }) => ({
                url: `/bookings`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Booking', id: arg.id }
            ]
        }),
    })
})

export const {
    useGetBookingsQuery,
    useAddNewBookingMutation,
    useUpdateBookingMutation,
    useDeleteBookingMutation
} = bookingsApiSlice

export const selectBookingsResult = bookingsApiSlice.endpoints.getBookings.select()

const selectBookingsData = createSelector(
    selectBookingsResult,
    bookingsResult => bookingsResult.data 
)

export const {
    selectAll: selectAllBookings,
    selectById: selectBookingById,
    selectIds: selectBookingIds
} = bookingsAdapter.getSelectors(state => selectBookingsData(state) ?? initialState)
