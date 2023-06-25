import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { Delete } from '@mui/icons-material';
import { useState,useMemo } from 'react';
import { Button } from '@mui/material';
import { memo } from 'react';
import { useDeleteRoomMutation } from './roomsApiSlice';
import { ColorRing } from 'react-loader-spinner';

const RoomsTable = ({rooms}) => {

  const [deleteRoom,{
    isLoading:deleteRoomIsLoading,
    isSuccess,
    isError,
    error}] = useDeleteRoomMutation()

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('number');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const columns = [
      { id: 'number', label: 'Number', minWidth: 170 },
      { id: 'passengers', label: 'Passengers', minWidth: 170 },
      { id: 'rooms', label: 'Rooms', minWidth: 170 }
    ]
    
    const {ids, entities} = rooms

  
    const onDeleteRoom = async (id) => {
        await deleteRoom({id})
    }  

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rooms.length) : 0;

  const visibleRows = rooms && useMemo(
    () =>
      stableSort(rooms, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rooms],
  );

  if(deleteRoomIsLoading){
    return  (<div className="spinner" style={{position:'fixed', margin:'auto',
    width: '100vw',
    height: '100vh',
    top:'0rem',
    left:'0rem',
    paddingTop:'30vh',
    backgroundColor: '#ffffffc7',
    zIndex: '3000'}}>
                <ColorRing
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
              </div>)
  }else{

    return (
      <>
      <Paper>
      <TableContainer component={Paper} sx={{marginTop:'3rem'}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead >
            <TableRow>
              {columns.map((column)=>(
              <TableCell
              key={column.id}
              align='right'
              padding={column.disablePadding ? 'none' : 'normal'}
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
            {rooms && visibleRows.map((room) => (
              <TableRow
                key={room.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
               
                <TableCell align="right">{room.number}</TableCell>
                <TableCell align="right">{room.passengers}</TableCell>
                <TableCell align="right">{room.rooms}</TableCell>
                <TableCell align="right">
                  <div style={{display:'flex', justifyContent:'space-around', gap:'20px'}}>
                  <Button onClick={()=> onDeleteRoom(room.id)}>
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
            count={rooms  && rooms.length || 1}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </Paper>     
    </>
    );  
  }

}
const memoizedRoomsTable = memo(RoomsTable)
export default memoizedRoomsTable