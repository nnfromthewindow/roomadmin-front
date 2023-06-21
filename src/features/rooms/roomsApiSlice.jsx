import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


const roomsAdapter = createEntityAdapter({sortComparer: (a, b) => {
    if (a.number === b.number) {
      return 0;
    } else if (a.number && !b.number) {
      return -1;
    } else if (!a.number && b.number) {
      return 1;
    } else {
      return b.number > a.number ? -1 : 1;
    }
  }})
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
    }),
    addNewRoom: builder.mutation({
        query: initialRoom => ({
            url: '/rooms',
            method: 'POST',
            body: {
                ...initialRoom,
            }
        }),
        invalidatesTags: [
            { type: 'Room', id: "LIST" }
        ]
    }),
    deleteRoom: builder.mutation({
        query: ({ id }) => ({
            url: `/rooms`,
            method: 'DELETE',
            body: { id }
        }), 
        invalidatesTags: (result, error, arg) => [
            { type: 'Room', id: "LIST" }
        ]
    }),
    })
})

export const {
    useGetRoomsQuery,
    useAddNewRoomMutation,
    useDeleteRoomMutation
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