import { useGetLedgerQuery } from "./ledgerApiSlice"
import { Link } from "react-router-dom"
import { ColorRing } from "react-loader-spinner"
import { Button } from "@mui/material"
import { AddCircleOutline } from "@mui/icons-material"
import { lightBlue } from "@mui/material/colors"

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
    
            const{ids, entities} = ledger
    
        content = (
            <section className="ledger">
                <h1 className="main_title">LEDGER</h1>
                <div className="btn_container">
        <Button variant="contained" color="success" sx={{width:'80%', margin:'0 auto', fontFamily:'Dosis',fontSize:'1.55em', gap:'10px'}} ><AddCircleOutline sx={{color:lightBlue[500],}}/>Add Item</Button>
        </div>
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