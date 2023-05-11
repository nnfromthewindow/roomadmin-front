import { useGetCustomersQuery } from "./customersApiSlice"
import { Link } from "react-router-dom"

const CustomersList = () => {
    const{data:customers,
    isLoading,
    isSuccess,
    isError,
    error} = useGetCustomersQuery()

let content

if(isLoading){
    content = <p>"Loading..."</p>
} else if (isSuccess){

const {ids, entities} = customers

content = (
    <section className="customers">
        <h1>CUSTOMERS</h1>
        <ul>
            {ids.map(customerId =>{
            return <li key={customerId}>
                <h2>NAME: {entities[customerId].name}</h2>
                <h2>LAST NAME:{entities[customerId].lastname}</h2>
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

export default CustomersList