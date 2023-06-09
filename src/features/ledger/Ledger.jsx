import { useGetLedgerQuery } from "./ledgerApiSlice"
import { Link } from "react-router-dom"
import { ColorRing } from "react-loader-spinner"
import { Button, Select,MenuItem } from "@mui/material"
import { AddCircleOutline,Delete } from "@mui/icons-material"
import { lightBlue } from "@mui/material/colors"
import { Spreadsheet } from "react-spreadsheet"
import { useState, useEffect } from "react"



const Ledger = () => {
    const {
        data: ledger,
        isLoading,
        isSuccess,
        isError,
        error
        } = useGetLedgerQuery()
       
       
        const [data, setData] = useState([]);
        
        const OPTIONS = [
            { value: "INCOME", label: "Income" },
            { value: "EXPENSES", label: "Expenses"}
          ];

          const typeOptions = OPTIONS.map(option => {
            return(
              <MenuItem key={option.value} value={option.value}>{option.label} </MenuItem>
            )
          }) 
        
        
        useEffect(() => {
            if (isSuccess) {
              const { ids, entities } = ledger;
              let table =ledger.ids && ledger.ids.map(id=>{
                return[{
                value:ledger.entities[id].date},
                {
                value:ledger.entities[id].description},
                {
                value:JSON.stringify(ledger.entities[id].type)},
                {
                value:ledger.entities[id].value}]
            })
            
              setData(table);
            }
          }, [isSuccess, ledger]);
          
        
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
        <div style={{marginTop:'2rem' ,overflowX:'auto'}}>
        <Spreadsheet data={data}

        onChange={setData} 
        columnLabels={["Date","Description","Type","Value","Delete"]} 
        DataViewer={(table)=>{
            
            if(table.column == 2){return  <Select defaultValue={''} sx={{width:'100%'}}>
            {typeOptions}
            </Select>
            }
            
            if(table.column == 3){
                return [table.cell?.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/\.\d+/g, ''),]
            }
            
            if(table.column == 4){
                
                return  <Button sx={{marginLeft:'1rem'}}><Delete sx={{color:'red'}}/></Button>}

            else{return table.cell?.value}}}/>
            
        </div>
                
            </section>
            )
        }else if(isError){
            content = <p>{JSON.stringify(error)}</p>
        }
        return content
}

export default Ledger