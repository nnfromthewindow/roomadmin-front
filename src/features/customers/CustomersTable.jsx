import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Delete, Edit } from '@mui/icons-material';
import { useState } from 'react';
import { Button } from '@mui/material';
import CustomerEditDialog from './CustomersEditDialog';
import CustomerDeleteDialog from './CustomerDeleteDialog';
import { memo } from 'react';

const CustomersTable = ({customers}) => {

  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [customerId, setCustomerId] = useState(null)

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


  return (
    <>
    <TableContainer component={Paper} sx={{marginTop:'3rem'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Lastname</TableCell>
            <TableCell align="right">ID Number</TableCell>
            <TableCell align="right">Adress</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers && customers.map((customer) => (
            <TableRow
              key={customer.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {customer.name}
              </TableCell>
              <TableCell align="right">{customer.lastname}</TableCell>
              <TableCell align="right">{customer.idnumber}</TableCell>
              <TableCell align="right">{customer.adress}</TableCell>
              <TableCell align="right">{customer.email}</TableCell>
              <TableCell align="right">{customer.phone}</TableCell>
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
        </TableBody>
      </Table>
    </TableContainer>
       {selectedCustomer && <CustomerEditDialog open={openEdit} handleClose={handleCloseEdit} customer={selectedCustomer}/>  
       }
       {customerId && <CustomerDeleteDialog openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleCloseCancelDelete={handleCloseCancelDelete} customerId={customerId}/>}
  </>
  );
}
const memoizedCustomersTable = memo(CustomersTable)
export default memoizedCustomersTable