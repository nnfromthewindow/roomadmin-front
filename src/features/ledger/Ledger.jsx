import { useGetLedgerQuery } from "./ledgerApiSlice"
import { ColorRing } from "react-loader-spinner"
import { Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper } from "@mui/material"
import { AddCircleOutline } from "@mui/icons-material"
import { lightBlue } from "@mui/material/colors"
import { useState, useEffect,forwardRef,useRef,useLayoutEffect } from "react"
import { TableVirtuoso } from 'react-virtuoso';
import LedgerSpreadsheet from "./LedgerSpreadsheet"

const Ledger = () => {


    const {
        data: ledger,
        isLoading,
        isSuccess,
        isError,
        error
        } = useGetLedgerQuery('ledgerList')
       
        const{ids,entities}=ledger || {}
        const rows = entities && ids && ids.map((id)=>{
            return{date:entities[id].date.split('T')[0],
              description:entities[id].description,
              expenses:entities[id].expenses,
              income:entities[id].income.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/\.\d+/g, '')
            }
          })
    
    
        
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
            

        content = rows && (     
            <section className="ledger">
                <h1 className="main_title">LEDGER</h1>
                <div className="btn_container">
        <Button variant="contained" color="success" sx={{width:'80%', margin:'0 auto', fontFamily:'Dosis',fontSize:'1.55em', gap:'10px'}} ><AddCircleOutline sx={{color:lightBlue[500],}}/>Add Item</Button>
        </div>
        <LedgerSpreadsheet rows={rows}/>
        
                
            </section>
            )
        }else if(isError){
            content = <LedgerSpreadsheet rows={rows}/>
        }
        return content
}

export default Ledger