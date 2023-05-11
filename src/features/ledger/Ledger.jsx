import { useGetLedgerQuery } from "./ledgerApiSlice"
import { Link } from "react-router-dom"


const Ledger = () => {
    const {
        data: ledger,
        isLoading,
        isSuccess,
        isError,
        error
        } = useGetLedgerQuery()

        let content

        if(isLoading){
            content = <p>"Loading..."</p>
        } else if (isSuccess){
    
            const{ids, entities} = ledger
    
        content = (
            <section className="ledger">
                <h1>LEDGER</h1>
                <ul>
                    {ids.map(ledgerItemId =>{
                    return <li key={ledgerItemId}>
                        <h2>FECHA: {entities[ledgerItemId].date}</h2>
                        <h2>DESCRIPCION: {entities[ledgerItemId].description}</h2>
                        <h2>TIPO: {JSON.stringify(entities[ledgerItemId].type)}</h2>
                        <h2>VALOR: {entities[ledgerItemId].value}</h2>
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

export default Ledger