import { useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let isManager = false
    let status = 'Employee'
    let avatar = ''

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles, avatar } = decoded.UserInfo

        isAdmin = roles.includes('Admin')

        if (isAdmin) status = 'Admin'

        isManager = roles.includes('Manager')

        if (isManager) status = 'Manager'

        return { username, roles, status, isAdmin, isManager, avatar }
    }

    return { username: '', roles: [], isAdmin, isManager, status, avatar }
}
export default useAuth