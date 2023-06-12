import { useGetLedgerQuery } from "./ledgerApiSlice"
import { ColorRing } from "react-loader-spinner"
import { Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper } from "@mui/material"
import { AddCircleOutline } from "@mui/icons-material"
import { lightBlue } from "@mui/material/colors"
import { useState, useEffect,forwardRef,useRef } from "react"
import { TableVirtuoso } from 'react-virtuoso';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective, RowsDirective, RowDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RangeDirective, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';


const Ledger = () => {


    const {
        data: ledger,
        isLoading,
        isSuccess,
        isError,
        error
        } = useGetLedgerQuery()
       
        const{ids,entities}=ledger || {}
       
        const spreadsheetRef = useRef(null);
        const [rowData, setRowData] = useState([]) 
        
        useEffect(() => {
          const rows = ids && ids.map((id)=>{
            return{date:entities[id].date.split('T')[0],
              description:entities[id].description,
              type:JSON.stringify(entities[id].type),
              value:entities[id].value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/\.\d+/g, '')
            }
          })
     
          setRowData(rows)

          let spreadsheet = spreadsheetRef.current;

          setRowData(rows)

          if (spreadsheet ) {
            
              spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:H1');
           
          }
      }, []);

        
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
        <div className="spreadsheet_container">
        <SpreadsheetComponent ref={spreadsheetRef} showSheetTabs={true} showRibbon={false} showFormulaBar={false}>
               <SheetsDirective>
                   <SheetDirective >
                       <RangesDirective >
                            <RangeDirective  dataSource={rowData} ></RangeDirective>
                        </RangesDirective>
                        <RowsDirective>
                            <RowDirective index={0}></RowDirective>
                            <RowDirective hidden={true}></RowDirective>
                        </RowsDirective>
                        <ColumnsDirective>
                            <ColumnDirective width={100}></ColumnDirective>
                            <ColumnDirective width={500}></ColumnDirective>
                            <ColumnDirective width={100}></ColumnDirective>
                            <ColumnDirective width={80}></ColumnDirective>
                            <ColumnDirective width={80}></ColumnDirective>
                            <ColumnDirective width={80}></ColumnDirective>
                            <ColumnDirective width={80}></ColumnDirective>
                            <ColumnDirective width={80}></ColumnDirective>
                        </ColumnsDirective>
                    </SheetDirective>
                </SheetsDirective>
           </SpreadsheetComponent>      
        </div>
        
                
            </section>
            )
        }else if(isError){
            content = <p>{JSON.stringify(error)}</p>
        }
        return content
}

export default Ledger