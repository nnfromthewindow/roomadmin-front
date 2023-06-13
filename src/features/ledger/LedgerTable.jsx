import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';

const LedgerTable = ({rows}) => {

    const columns = [
        { id: 'date', label: 'Date', minWidth: 170 },
        { id: 'description', label: 'Description', minWidth: 300 },
        {
          id: 'expenses',
          label: 'Expenses',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/\.\d+/g, ''),
        },
        {
          id: 'income',
          label: 'Income',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/\.\d+/g, ''),
        },
      
      ];
     

    //console.log(rows)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const[total, setTotal] = useState(0)

    useEffect(()=>{
        let sumIncome = 0
        let sumExpenses = 0
      rows &&  rows.forEach((obj) => {
        
            const income = Number(obj.income);
            const expenses = Number(obj.expenses);
            
            if (!isNaN(income) ) {
              sumIncome += income;
            }
            if (!isNaN(expenses) ) {
                sumExpenses += expenses;
              }
          })  
        setTotal((sumIncome-sumExpenses).toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/\.\d+/g, ''))
    
    },[rows])

   
  
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                     
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                          ? value === 0
                            ? ""
                            : column.format(value)
                          : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              <TableRow >
              <TableCell align="right" colSpan={3} sx={{fontWeight:'bold'}}>TOTAL BALANCE</TableCell>
            <TableCell align="right" colSpan={4} sx={{fontWeight:'bold'}} >{total}</TableCell>
          </TableRow>
             
              
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
        
  )
}

export default LedgerTable