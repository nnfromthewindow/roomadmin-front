import { useGetCustomersQuery } from "./customersApiSlice"
import { Link } from "react-router-dom"
import { ColorRing } from "react-loader-spinner"

const CustomersList = () => {
    const{data:customers,
    isLoading,
    isSuccess,
    isError,
    error} = useGetCustomersQuery()

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