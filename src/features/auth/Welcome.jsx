import { useSelector } from "react-redux"
import { selectCurrentUser, selectCurrentToken } from "./authSlice"
import { Link } from "react-router-dom"

const Welcome = () => {
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)

    const welcome = user ? `Welcome ${user}!` : 'Welcome!'
    const tokenAbbr = `${token.slice(0, 9)}...`

    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {token}</p>
            <p><Link to="/todos">Go to Todos</Link></p>
        </section>
    )

    return content
}
export default Welcome