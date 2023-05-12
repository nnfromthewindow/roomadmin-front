import { Outlet } from 'react-router-dom'

const PublicLayout = () =>{
    return(
        <>
        <div className="loginTitle-container">
        <h2 className="loginTitle">ROOM ADMIN APP</h2>
        </div>
            <div className="outlet-public">
                <Outlet/>
            </div>
        </>
        )
}
export default PublicLayout