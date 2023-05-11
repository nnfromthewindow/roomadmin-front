import { useGetRatesQuery } from "./ratesApiSlice"
import { Link } from "react-router-dom"

const Rates = () => {
    const {
        data: rates,
        isLoading,
        isSuccess,
        isError,
        error
        } = useGetRatesQuery()
    
        let content
        
        if(isLoading){
            content = <p>"Loading..."</p>
        } else if (isSuccess){
    
            const{ids, entities} = rates
    
        content = (
            <section className="rates">
                <h1>RATES</h1>
                <ul>
                    {ids.map(rateId =>{
                    return <li key={rateId}>
                        <h2>{entities[rateId].name}: {entities[rateId].valueDay} </h2>
                    </li>
                    })}
                </ul>
                <Link to="/welcome">Back to Welcome</Link>
            </section>
            )
        }else if(isError){
            content = <p>{JSON.stringify(error)}</p>
        }
        return content
}

export default Rates