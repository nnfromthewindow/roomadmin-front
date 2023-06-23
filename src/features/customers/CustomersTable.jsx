import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { Delete, Edit } from '@mui/icons-material';
import { useState, useMemo } from 'react';
import { Button } from '@mui/material';
import CustomerEditDialog from './CustomersEditDialog';
import CustomerDeleteDialog from './CustomerDeleteDialog';
import { memo } from 'react';

const CustomersTable = ({customers}) => {

  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [customerId, setCustomerId] = useState(null)
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('number');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'lastname', label: 'Lastname', minWidth: 100 },
    { id: 'idNumber', label: 'ID Number', minWidth: 100 },
    { id: 'adress', label: 'Adress', minWidth: 300 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'phone', label: 'Phone', minWidth: 170 }
  ]

  const {ids, entities} = customers

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  
const handleClickOpenEdit = (customer) => {
  setSelectedCustomer(customer)
  setOpenEdit(true);
};

const handleCloseDelete = () => {
  setOpenDelete(false);

};

const handleCloseCancelDelete = () => {
  setOpenDelete(false);
};


const handleClickOpenDelete = (customerId) => {
setCustomerId(customerId)  
setOpenDelete(true);
};

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};

const handleRequestSort = (event, property) => {
  const isAsc = orderBy === property && order === 'asc';
  setOrder(isAsc ? 'desc' : 'asc');
  setOrderBy(property);
};

const createSortHandler = (property) => (event) => {
  handleRequestSort(event, property);
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
if(array){
const stabilizedThis = array.map((el, index) => [el, index]);
stabilizedThis.sort((a, b) => {
  const order = comparator(a[0], b[0]);
  if (order !== 0) {
    return order;
  }
  return a[1] - b[1];
});
return stabilizedThis.map((el) => el[0]);
}

}

// Avoid a layout jump when reaching the last page with empty filteredRows.
const emptyRows =
page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customers.length) : 0;

const visibleRows = customers && useMemo(
() =>
  stableSort(customers, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  ),
[order, orderBy, page, rowsPerPage, customers],
);



  return (
    <>
    <Paper>
    <TableContainer component={Paper} sx={{marginTop:'3rem'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column)=>(
            <TableCell
            key={column.id}
            align={'right'}
            padding={column.disablePadding ? 'none' : 'normal'}
            width={column.minWidth}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
            
            </TableSortLabel>
          </TableCell>
              ))}
            </TableRow>
        </TableHead>
        <TableBody>
          {customers && visibleRows.map((customer) => (
            <TableRow
              key={customer.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right" component="th" scope="row">
                {customer.name}
              </TableCell>
              <TableCell sx={{wordBreak:'break-word'}} align="right">{customer.lastname}</TableCell>
              <TableCell sx={{wordBreak:'break-word'}} align="right">{customer.idnumber.toLocaleString("es")}</TableCell>
              <TableCell sx={{wordBreak:'break-word'}} align="right">{customer.adress}</TableCell>
              <TableCell sx={{wordBreak:'break-word'}} align="right">
                <Link href={`mailto:${customer.email}`} underline="none" target="_blank" rel="noopener">
                {customer.email}
                </Link>
              </TableCell>
              <TableCell sx={{wordBreak:'break-word'}} align="right">
                <Link href={`tel:${customer.phone}`} underline="none" target="_blank" rel="noopener">
                {customer.phone}
                </Link>
              </TableCell>
              <TableCell align="right">
                <div style={{display:'flex', justifyContent:'space-around', gap:'20px'}}>
                <Button onClick={() => handleClickOpenEdit(customer)}>
                <Edit sx={{cursor:'pointer', color:'green',":hover":{scale:'1.1', transition:'0.5s'}}}/>
                </Button>
                <Button onClick={()=> handleClickOpenDelete(id)}>
                <Delete sx={{cursor:'pointer', color:'red',":hover":{scale:'1.1', transition:'0.5s'}}}/>   
                </Button>
             
                </div>
                </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                </TableRow>
              )}
        </TableBody>
      </Table>
    </TableContainer>
       {selectedCustomer && <CustomerEditDialog open={openEdit} handleClose={handleCloseEdit} customer={selectedCustomer}/>  
       }
       {customerId && <CustomerDeleteDialog openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleCloseCancelDelete={handleCloseCancelDelete} customerId={customerId}/>}
       <TablePagination
          rowsPerPageOptions={[10, 50, 100]}
          component="div"
          count={customers  && customers.length || 1}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
  </Paper>
  </>
  );
}
const memoizedCustomersTable = memo(CustomersTable)
export default memoizedCustomersTable