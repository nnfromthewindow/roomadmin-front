import { useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let status = "Employee"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isAdmin = roles.includes('Admin')

        if (isAdmin) status = "Admin"

        return { username, roles, status, isAdmin }
    }

    return { username: '', roles: [], isAdmin, status }
}
export default useAuth