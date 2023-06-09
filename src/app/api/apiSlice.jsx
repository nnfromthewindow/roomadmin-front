import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setCredentials,logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
   //baseUrl: 'http://localhost:3500',
    baseUrl: 'https://roomyapp-api.onrender.com',
    credentials: 'include',
    prepareHeaders: (headers,{getState}) => {
        const token = getState().auth.token
        if(token){
            headers.set("authorization",`Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async(args, api, extraOptions)=>{
    let result = await baseQuery(args,api,extraOptions)
   
    if(result?.error?.status === 403){

        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if(refreshResult?.data){
            const user = api.getState().auth.user
            api.dispatch(setCredentials({...refreshResult.data}, user ))
            result = await baseQuery(args,api,extraOptions)
        }else{
            api.dispatch(logOut())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes:['Todo','Booking','Customer','User','LedgerItem','Room'],
    endpoints: builder => ({})
})