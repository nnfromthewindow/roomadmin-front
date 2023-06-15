import { useState, useEffect,useMemo } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {Box, Table, TableBody,TableCell,TableContainer,TableHead,TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Paper, Checkbox, IconButton,Tooltip, Button} from '@mui/material';
import {Delete, FilterList} from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import LedgerDeleteDialog from './LedgerDeleteDialog';

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

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.numeric ? 'right' : 'left'}
            padding={column.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
              {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

function EnhancedTableToolbar(props) {
  const { numSelected, selected,openDelete, handleCloseDelete,handleCloseCancelDelete, handleClickOpenDelete} = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Ledger
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
        <Tooltip title="Delete">
          <IconButton onClick={handleClickOpenDelete}>
            <Delete  />
          </IconButton>
          
        </Tooltip>
        <LedgerDeleteDialog handleCloseCancelDelete={handleCloseCancelDelete}
          handleCloseDelete={handleCloseDelete}
          openDelete={openDelete}
          numSelected={numSelected} selectedIds={selected}/>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton onClick={()=>{console.log(selected)}}>
            <FilterList />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  openDelete:PropTypes.bool.isRequired,
  handleCloseDelete:PropTypes.func.isRequired,
  handleCloseCancelDelete:PropTypes.func.isRequired,
  handleClickOpenDelete:PropTypes.func.isRequired
};


const LedgerTable = ({rows}) => {
 
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
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


  //=== MUI TABLE CODE ===

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      
      newSelected = newSelected.concat(selected, name);
      
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
  
    setSelected(newSelected);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  //================================



  const handleCloseDelete = () => {
    setOpenDelete(false);
    //handleClose()
  };

  const handleCloseCancelDelete = () => {
    setOpenDelete(false);
  };

  
const handleClickOpenDelete = () => {
  setOpenDelete(true);
};

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};





  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      
      <EnhancedTableToolbar numSelected={selected.length} selected={selected} openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleCloseCancelDelete={handleCloseCancelDelete} handleClickOpenDelete={handleClickOpenDelete}/>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
        
        <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

          <TableBody >
            {visibleRows.map((row, index) => {

            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  sx={{ cursor: 'pointer' }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.date}
                    </TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">{row.expenses}</TableCell>
                    <TableCell align="left">{row.income}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              <TableRow >
              <TableCell align="right" colSpan={3} sx={{fontWeight:'bold'}}>TOTAL BALANCE</TableCell>
            <TableCell align="right" colSpan={2} sx={{fontWeight:'bold'}} >{total}</TableCell>
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