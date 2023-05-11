import { useSelector } from "react-redux"
import { selectCurrentUser, selectCurrentToken } from "./authSlice"
import { Link } from "react-router-dom"
import { useSendLogoutMutation } from "./authApiSlice"

const Welcome = () => {
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)

    const welcome = user ? `Welcome ${user}!` : 'Welcome!'
    const tokenAbbr = `${token.slice(0, 9)}...`

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {token}</p>
            <p><Link to={`/todos/${user}`}>Go to Todos</Link></p>
            <p><Link to={'/bookings'}>Go to Bookings</Link></p>
            <p><Link to={'/customers'}>Go to Customers</Link></p>
            <p><Link to={'/users'}>Go to Users</Link></p>
            <p><Link to={'/ledger'}>Go to Ledger</Link></p>
            <p><Link to={'/rates'}>Go to Rates</Link></p>
            <p><Link to={'/rooms'}>Go to Rooms</Link></p>
          
            <button title="logout" onClick={sendLogout}>Logout</button>
        </section>
    )

    return content
}
export default Welcome