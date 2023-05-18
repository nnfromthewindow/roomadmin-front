import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const PublicLayout = () =>{
    return(
        
        <section className='layout'>
            <div className="loginTitle-container">
            <h2 className="loginTitle">ROOMY</h2>
            </div>
            <div className="outlet-public">
                <Outlet/>
            </div>
            <Footer/>
        </section>
        
        )
}
export default PublicLayout