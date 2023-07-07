import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const PublicLayout = () =>{
    return(
        
        <section className='layout_public'>
   
            <div className="outlet-public">
                <Outlet/>
            </div>
            <Footer/>
        </section>
        
        )
}
export default PublicLayout