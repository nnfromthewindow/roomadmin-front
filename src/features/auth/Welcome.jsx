import useAuth from "../hooks/useAuth"
import useTitle from "../hooks/useTitle"

const Welcome = () => {
    
    useTitle('Roomy - Welcome')
    
    const { username,  isAdmin, isManager } = useAuth()

    let content

    if(isAdmin || isManager){
        content = (
            <section className="welcome">
                <h1>Hi {username}!!<br></br><br></br>It's great to have you back in Roomy.<br></br><br></br> You can now access all our features and tools to efficiently manage your bookings, customers, and daily tasks.<br></br><br></br> Let's get started!!</h1>
               
            </section>
        )
    }else content = (
        <section className="welcome">
            <h1>Hi {username}!!<br></br><br></br> It's great to have you back in Roomy.<br></br><br></br> You can now access all your daily tasks.<br></br><br></br> Let's get started!!</h1>
         
        </section>
    )     
           
    return content
}
export default Welcome