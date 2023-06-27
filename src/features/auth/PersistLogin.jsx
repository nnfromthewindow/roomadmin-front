import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../hooks/usePersist"
import { ColorRing } from "react-loader-spinner"

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()


    useEffect(() => {

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {              
                    await refresh()
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true

    }, [])


    let content
    if (!persist) { 
        console.log('no persist')
        content = <Outlet />
    } else if (isLoading) { 
        console.log('loading')
        content = <div className="spinner" style={{position:'fixed', margin:'auto',
        width: '100vw',
        height: '100vh',
        top:'0rem',
        left:0,
        paddingTop:'30vh',
        backgroundColor: '#ffffffc7',
        zIndex: '3000'}}>
                    <ColorRing
                        visible={true}
                        height="200"
                        width="200"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />
                  </div>
    } else if (isError) {
        console.log('error')
        content = (
            <p className='errmsg'>
                {`${error?.data?.message} - `}
                <Link to="/">Please login again</Link>.
            </p>
        )
    } else if (isSuccess && trueSuccess) {
        console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) { 
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    }

    return content
}

export default PersistLogin