import { useGetLedgerQuery } from "./ledgerApiSlice"
import { ColorRing } from "react-loader-spinner"
import { Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper } from "@mui/material"
import { AddCircleOutline } from "@mui/icons-material"
import { lightBlue } from "@mui/material/colors"
import { useState, useEffect,forwardRef } from "react"
import LedgerTable from "./LedgerTable"

import { TableVirtuoso } from 'react-virtuoso';

const sample = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread', 356, 16.0, 49, 3.9],
];

function createData(id, dessert, calories, fat, carbs, protein) {
  return { id, dessert, calories, fat, carbs, protein };
}

const columns = [
  {
    width: 200,
    label: 'Date',
    dataKey: 'date',
  },
  {
    width: 120,
    label: 'Description',
    dataKey: 'description',

  },
  {
    width: 60,
    label: 'Type',
    dataKey: 'type',
  
  },
  
  {
    width: 120,
    label: 'Value',
    dataKey: 'value',
    numeric: true,
  },

  {
    width: 120,
    label: 'Delete',
    dataKey: 'delete',
  
  },
];

const rows = Array.from({ length: 200 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});

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
       
       /*
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
          
        */
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
        <LedgerTable ledger={ledger}/>
        
            
        </div>
        <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
                
            </section>
            )
        }else if(isError){
            content = <p>{JSON.stringify(error)}</p>
        }
        return content
}

export default Ledger