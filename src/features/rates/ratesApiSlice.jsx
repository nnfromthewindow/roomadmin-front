import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


const ratesAdapter = createEntityAdapter(/*create sort method*/)
const initialState = ratesAdapter.getInitialState()

export const ratesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRates: builder.query({
            query: () =>({
            url: '/rates',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
        }),
        transformResponse: response => {
            const loadedRates = response.map(rate=>{
                rate.id=rate._id
                return rate
            })
        
           return ratesAdapter.setAll(initialState, loadedRates)
            
        },
        providesTags: (result, error, arg) => {
            if(result?.ids){
                return[
                {type:'Rate', id:'LIST'},
                ...result.ids.map(id =>({type:'Rate', id}))
                ]
            } else return [{type:'Rate', id:'LIST'}]
        }
    })
    })
})

export const {
    useGetRatesQuery
} = ratesApiSlice

export const selectRatesResult = ratesApiSlice.endpoints.getRates.select()

const selectRatesData = createSelector(
    selectRatesResult,
    ratesResult => ratesResult.data 
)

export const {
    selectAll: selectAllRates,
    selectById: selectRateById,
    selectIds: selectRateIds
} = ratesAdapter.getSelectors(state => selectRatesData(state) ?? initialState)