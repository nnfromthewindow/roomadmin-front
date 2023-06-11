import { useGetLedgerQuery } from "./ledgerApiSlice"
import { ColorRing } from "react-loader-spinner"
import { Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper } from "@mui/material"
import { AddCircleOutline } from "@mui/icons-material"
import { lightBlue } from "@mui/material/colors"
import { useState, useEffect,forwardRef } from "react"
import { TableVirtuoso } from 'react-virtuoso';
import { SheetsDirective, SheetDirective, RangesDirective, RangeDirective, SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';


const columns = [
  {
    width: 10,
    label: 'Date',
    dataKey: 'date',
  },
  {
    width: 120,
    label: 'Description',
    dataKey: 'description',

  },
  {
    width: 10,
    label: 'Type',
    dataKey: 'type',
  
  },
  
  {
    width: 10,
    label: 'Value',
    dataKey: 'value',
    numeric: true,
  },

  {
    width: 10,
    label: '',
    dataKey: 'delete',
  
  },
];



const VirtuosoTableComponents = {
  Scroller:forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody:forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </>
  );
}



const Ledger = () => {


    const {
        data: ledger,
        isLoading,
        isSuccess,
        isError,
        error
        } = useGetLedgerQuery()
       
        const{ids,entities}=ledger || {}
     
          const rows = ids && ids.map((id)=>{
            return{date:entities[id].date.split('T')[0],
              description:entities[id].description,
              type:JSON.stringify(entities[id].type),
              value:entities[id].value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/\.\d+/g, '')
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
            

        content = (     
            <section className="ledger">
                <h1 className="main_title">LEDGER</h1>
                <div className="btn_container">
        <Button variant="contained" color="success" sx={{width:'80%', margin:'0 auto', fontFamily:'Dosis',fontSize:'1.55em', gap:'10px'}} ><AddCircleOutline sx={{color:lightBlue[500],}}/>Add Item</Button>
        </div>
        <div className="spreadsheet_container">
        <SpreadsheetComponent >
               <SheetsDirective>
                   <SheetDirective >
                       <RangesDirective >
                            <RangeDirective  dataSource={rows} ></RangeDirective>
                        </RangesDirective>
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