import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const ledgerAdapter = createEntityAdapter()
const initialState = ledgerAdapter.getInitialState()

export const ledgerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getLedger: builder.query({
            query: ()=>({
                url:'/ledger',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: response =>{
                const loadedLedger = response.map(item=>{
                    item.id = item._id
                    return item
                })

                return ledgerAdapter.setAll(initialState,loadedLedger)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return[
                        {type:'LedgerItem', id:'LIST'},
                        ...result.ids.map(id =>({type:'LedgerItem', id}))
                    ]
                } else return [{type:'LedgerItem', id:'LIST'}]
            } 
        })
    })
})

export const {
    useGetLedgerQuery
} = ledgerApiSlice

export const selectLedgerResult = ledgerApiSlice.endpoints.getLedger.select()

const selectLedgerData = createSelector(
    selectLedgerResult,
    ledgerResult => ledgerResult.data 
)

export const {
    selectAll: selectAllLedger,
    selectById: selectLedgerItemById,
    selectIds: selectLedgerItemIds
} = ledgerAdapter.getSelectors(state => selectLedgerData(state) ?? initialState)
