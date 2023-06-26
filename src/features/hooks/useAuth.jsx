import { useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let status = 'Employee'
    let avatar = ''

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles, avatar } = decoded.UserInfo

        isAdmin = roles.includes('Admin')

        if (isAdmin) status = 'Admin'

        return { username, roles, status, isAdmin, avatar }
    }

    return { username: '', roles: [], isAdmin, status, avatar }
}
export default useAuth