import { Outlet } from 'react-router-dom'

const PublicLayout = () =>{
    return(
        <>
            <span className="title">ROOM ADMIN APP</span>
            <div className="login">
                <Outlet/>
            </div>
        </>
        )
}
export default PublicLayout