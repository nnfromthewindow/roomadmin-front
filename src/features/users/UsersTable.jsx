import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Link from '@mui/material/Link';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { Delete, Edit } from '@mui/icons-material';
import { useState,useMemo } from 'react';
import { Button } from '@mui/material';
import UserEditDialog from './UserEditDialog';
import UserDeleteDialog from './UserDeleteDialog';
import { memo } from 'react';

const UsersTable = ({users}) => {

  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [userId, setUserId] = useState(null)
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('number');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'lastname', label: 'Lastname', minWidth: 100 },
    { id: 'idNumber', label: 'ID Number', minWidth: 100 },
    { id: 'adress', label: 'Adress', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'phone', label: 'Phone', minWidth: 100 },
    { id: 'avatar', label: 'Avatar', minWidth: 50 },
    { id: 'username', label: 'Username', minWidth: 100 },
    { id: 'roles', label: 'Roles', minWidth: 100 }
  ]
  const {ids, entities} = users

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  
const handleClickOpenEdit = (user) => {
  setSelectedUser(user)
  setOpenEdit(true);
};

const handleCloseDelete = () => {
  setOpenDelete(false);

};

const handleCloseCancelDelete = () => {
  setOpenDelete(false);
};


const handleClickOpenDelete = (userId) => {
setUserId(userId)  
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
page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

const visibleRows = users && useMemo(
() =>
  stableSort(users, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  ),
[order, orderBy, page, rowsPerPage, users],
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
            sortDirection={orderBy === column.id ? order : false}
            width={column.minWidth}
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
          {users && visibleRows.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right" component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.lastname}</TableCell>
              <TableCell align="right">{user.idnumber}</TableCell>
              <TableCell align="right">{user.adress}</TableCell>
              <TableCell align="right">
                <Link href={`mailto:${user.email}`} underline="none" target="_blank" rel="noopener">
                {user.email}
                </Link>
              </TableCell>
              <TableCell align="right">
                <Link href={`tel:${user.phone}`} underline="none" target="_blank" rel="noopener">
                {user.phone}
                </Link>
              </TableCell>
              <TableCell align="right" sx={{wordBreak:'break-word'}}>
                <Link href={user.avatar} underline="none" target="_blank" rel="noopener">
                {`${user.avatar.length>15 ? user.avatar.substring(0,15)+'...': user.avatar} `}
                </Link>
                </TableCell>
              <TableCell align="right">{user.username}</TableCell>
              <TableCell align="right">{Object.values(user.roles).join(', ')}</TableCell>
              <TableCell align="right">
                <div style={{display:'flex', justifyContent:'space-around', gap:'20px'}}>
                <Button onClick={() => handleClickOpenEdit(user)}>
                <Edit sx={{cursor:'pointer', color:'green',":hover":{scale:'1.1', transition:'0.5s'}}}/>
                </Button>
                <Button onClick={()=> handleClickOpenDelete(user.id)}>
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
     
       <TablePagination
          rowsPerPageOptions={[10, 50, 100]}
          component="div"
          count={users  && users.length || 1}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
  </Paper>
  {selectedUser && <UserEditDialog open={openEdit} handleClose={handleCloseEdit} user={selectedUser}/>  
       }
       {userId && <UserDeleteDialog openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleCloseCancelDelete={handleCloseCancelDelete} userId={userId}/>}
  </>
  );
}
const memoizedUsersTable = memo(UsersTable)
export default memoizedUsersTable