import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const PrivateLayout = () =>{
    return(
        <section className='layout_private'>
            <Navbar/>
            
            <div className='outlet-private'>
            <Outlet/>
            </div>
            <Footer/>
        </section>
            
     
        )
}
export default PrivateLayout