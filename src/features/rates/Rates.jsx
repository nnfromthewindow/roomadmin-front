import { useGetRatesQuery } from "./ratesApiSlice"
import { Link } from "react-router-dom"
import { ColorRing } from "react-loader-spinner"

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
            content = <div className="spinner">
            <ColorRing
      visible={true}
      height="200"
      width="200"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
        </div>
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