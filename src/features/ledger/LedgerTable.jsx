import { useState, useEffect,useMemo, useRef, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {FormControlLabel, Table, TableBody,TableCell,TableContainer,TableHead,TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Paper, Checkbox, IconButton,Tooltip, Switch} from '@mui/material';
import {Delete, CalendarViewDay} from '@mui/icons-material';
import LedgerDeleteDialog from './LedgerDeleteDialog';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

const DownloadTableExcel = lazy(() => import('react-export-table-to-excel').then(module => ({ default: module.DownloadTableExcel })));

const MobileDatePicker = lazy(() => import('@mui/x-date-pickers').then(module => ({ default: module.MobileDatePicker })));

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

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (props &&
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
              id:'allselected-checkbox'
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
  rowCount: PropTypes.number
};

function EnhancedTableToolbar(props) {
  const { numSelected, selected,openDelete, handleCloseDelete,handleCloseCancelDelete, handleClickOpenDelete, date, dense, handleChangeDense, handleFilterChange, filter,} = props;

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
        <>
        <Tooltip title="Dense Padding" sx={{marginRight:'8px'}}>
        <CalendarViewDay  />
        </Tooltip>   
         
         
        <FormControlLabel
      control={<Switch inputProps={{id:'dense-switch'}} checked={dense} onChange={handleChangeDense} />}
    />

     <FilterToolbar date={date} handleFilterChange={handleFilterChange} filter={filter}/>
        </>
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
  handleClickOpenDelete:PropTypes.func.isRequired,
  date:PropTypes.object,
  handleFilterChange:PropTypes.func,
  filter:PropTypes.any,
  dense:PropTypes.bool,
  handleChangeDense:PropTypes.func
};

function FilterToolbar(props) {
  const{handleFilterChange, filter}=props

  
  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Suspense fallback={<div>Loading...</div>}>
      <MobileDatePicker onChange={handleFilterChange}  value={filter}  views={['year','month']} openTo='month' />
      </Suspense>

    </LocalizationProvider>
  )
}

FilterToolbar.propTypes = {
  handleFilterChange: PropTypes.func,
  filter:PropTypes.any
}

const LedgerTable = ({rows}) => {
 
  
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1000);
  const[total, setTotal] = useState(0)
  const[date, setDate] = useState(dayjs())
  const[filter, setFilter] = useState(dayjs())
  const tableRef = useRef(null);
          
  const filteredRows = rows.filter((row)=>{
    
    return(row && dayjs(row.date).month() == dayjs(filter).month() && dayjs(row.date).year() == dayjs(filter).year())
  
  })

 const totalMemo =filteredRows && useMemo(()=>{

    let sumIncome = 0
    let sumExpenses = 0
    filteredRows &&  filteredRows.forEach((obj) => {
    
      const income = Number(obj.income);
      const expenses = Number(obj.expenses);
        
      if (!isNaN(income) ) {
          sumIncome += income;
          }
      if (!isNaN(expenses) ) {
            sumExpenses += expenses;
     
          }
    })  
    

    return (sumIncome-sumExpenses).toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/\.\d+/g, '')
   
  },[filteredRows])

  useEffect(()=>{
    setSelected([])
  },[totalMemo])

  //=== MUI TABLE CODE ===

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((n) => n.id);
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

  // Avoid a layout jump when reaching the last page with empty filteredRows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const visibleRows = filteredRows && useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, filteredRows],
  );

  
  //================================



  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelected([])
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


const handleFilterChange = (event) => {
  setFilter(dayjs(event.$d));
}


  return (
    <>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      
      <EnhancedTableToolbar numSelected={selected.length} selected={selected} openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleCloseCancelDelete={handleCloseCancelDelete} handleClickOpenDelete={handleClickOpenDelete} dense={dense} handleChangeDense={handleChangeDense} handleFilterChange={handleFilterChange} filter={filter}/>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" ref={tableRef}  size={dense ? 'small' : 'medium'}>
        
        <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows?.length}
            />

          <TableBody >
            {filteredRows && visibleRows.map((row, index) => {

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
                          id: labelId
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
                    <TableCell align="left">{row.expenses == 0 ? "" : row.expenses.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/\.\d+/g, '')}</TableCell>
                    <TableCell align="left">{row.income == 0 ? "" : row.income.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/\.\d+/g, '')}</TableCell>
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
            <TableCell align="right" colSpan={2} sx={{fontWeight:'bold'}} >{totalMemo}</TableCell>
          </TableRow>
          
              
          </TableBody>
        </Table>
      </TableContainer>
<Suspense fallback={<div>Loading...</div>}>
<DownloadTableExcel
                    filename={`total_balance_${dayjs(filter).year()}_${dayjs(filter).format('MMM').toLocaleLowerCase()}`}
                    sheet={`${dayjs(filter).year()} ${dayjs(filter).format('MMM')}`}
                    currentTableRef={tableRef.current}
                >
 <Tooltip title="Export Excel">
          <IconButton onClick={handleClickOpenDelete} sx={{fontSize:'1em', gap:'8px'}}>
          <FontAwesomeIcon icon={faFileExcel}  color='green'/> <span style={{marginTop:'3px', fontSize:'0.9em'}}>Export Excel</span> 
          </IconButton>
          
        </Tooltip>
                  
  </DownloadTableExcel>
</Suspense>
      
        <TablePagination
          rowsPerPageOptions={[1000, 500, 100, 50]}
          component="div"
          count={filteredRows && filteredRows.length || 1}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        
      </Paper>
      
  </>    
  )
}

export default LedgerTable