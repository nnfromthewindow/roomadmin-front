import { Button, Select,MenuItem } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { Spreadsheet } from "react-spreadsheet"
import { useState, useEffect } from "react"
import { memo } from "react"

const LedgerTable = ({ledger}) => {
  const [data, setData] = useState([]);

      console.log(ledger)
        useEffect(() => {
            
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
            
          }, [ledger]);
          
        
        
        const OPTIONS = [
            { value: "INCOME", label: "Income" },
            { value: "EXPENSES", label: "Expenses"}
          ];

          const typeOptions = OPTIONS.map(option => {
            return(
              <MenuItem key={option.value} value={option.value}>{option.label} </MenuItem>
            )
          }) 

  return (
    <Spreadsheet data={data}
        hideRowIndicators={true}
        onChange={console.log(data)}
        columnLabels={["Date","Description","Type","Value","Delete"]} 
        DataViewer={(table)=>{

          if(table.column == 0){
            return[table.cell?.value.split('T')[0]] 
          }
            
            if(table.column == 2){return  <Select defaultValue={''} sx={{width:'8rem'}}>
            {typeOptions}
            </Select>
            }
            
            if(table.column == 3){
                return [table.cell?.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/\.\d+/g, ''),]
            }
            
            if(table.column == 4){
                
                return  <Button sx={{marginLeft:'1rem'}}><Delete sx={{color:'red'}}/></Button>}

            else{return table.cell?.value}}}/>
  )
}

const memoizedLedgerTable =memo(LedgerTable)

export default memoizedLedgerTable