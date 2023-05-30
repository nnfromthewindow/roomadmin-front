import { useSelector } from "react-redux"
import { selectCurrentUser, selectCurrentToken } from "./authSlice"
import { Link } from "react-router-dom"
import { useSendLogoutMutation } from "./authApiSlice"
import useAuth from "../hooks/useAuth"

const Welcome = () => {
    const { username,  isAdmin } = useAuth()

    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)

    
    const tokenAbbr = `${token.slice(0, 9)}...`

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    let navigationOptions
    let content

    if(isAdmin){
        content = (
            <section className="welcome">
                <h1>Hi {user}!!<br></br><br></br>It's great to have you back in Roomy.<br></br><br></br> You can now access all our features and tools to efficiently manage your bookings, customers, and daily tasks.<br></br><br></br> Let's get started!!</h1>
               
            </section>
        )
    }else content = (
        <section className="welcome">
            <h1>Hi {user}!!<br></br><br></br> It's great to have you back in Roomy.<br></br><br></br> You can now access all your daily tasks.<br></br><br></br> Let's get started!!</h1>
         
        </section>
    )     
           
    return content
}
export default Welcome