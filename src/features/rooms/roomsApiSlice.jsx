import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


const roomsAdapter = createEntityAdapter(/*create sort method*/)
const initialState = roomsAdapter.getInitialState()

export const roomsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRooms: builder.query({
            query: () =>({
            url: '/rooms',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
        }),
        transformResponse: response => {
            const loadedRooms = response.map(room=>{
                room.id=room._id
                return room
            })
        
           return roomsAdapter.setAll(initialState, loadedRooms)
            
        },
        providesTags: (result, error, arg) => {
            if(result?.ids){
                return[
                {type:'Room', id:'LIST'},
                ...result.ids.map(id =>({type:'Room', id}))
                ]
            } else return [{type:'Room', id:'LIST'}]
        }
    })
    })
})

export const {
    useGetRoomsQuery
} = roomsApiSlice

export const selectRoomsResult = roomsApiSlice.endpoints.getRooms.select()

const selectRoomsData = createSelector(
    selectRoomsResult,
    roomsResult => roomsResult.data 
)

export const {
    selectAll: selectAllRooms,
    selectById: selectRoomById,
    selectIds: selectRoomIds
} = roomsAdapter.getSelectors(state => selectRoomsData(state) ?? initialState)