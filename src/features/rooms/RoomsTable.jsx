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
import { memo } from 'react';

const RoomsTable = ({rooms}) => {
console.log(rooms)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [roomId, setRoomId] = useState(null)

  const {ids, entities} = rooms

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  
const handleClickOpenEdit = (room) => {
  setSelectedRoom(room)
  setOpenEdit(true);
};

const handleCloseDelete = () => {
  setOpenDelete(false);

};

const handleCloseCancelDelete = () => {
  setOpenDelete(false);
};


const handleClickOpenDelete = (roomId) => {
setRoomId(roomId)  
setOpenDelete(true);
};


  return (
    <>
    <TableContainer component={Paper} sx={{marginTop:'3rem'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Number</TableCell>
            <TableCell align="right">Passengers</TableCell>
            <TableCell align="right">Rooms</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms && rooms.map((room) => (
            <TableRow
              key={room.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
              <TableCell align="right">{room.number}</TableCell>
              <TableCell align="right">{room.passengers}</TableCell>
              <TableCell align="right">{room.rooms}</TableCell>
              <TableCell align="right">
                <div style={{display:'flex', justifyContent:'space-around', gap:'20px'}}>
                <Button onClick={() => handleClickOpenEdit(room)}>
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
       {selectedRoom && <RoomEditDialog open={openEdit} handleClose={handleCloseEdit} room={selectedRoom}/>  
       }
       {roomId && <RoomDeleteDialog openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleCloseCancelDelete={handleCloseCancelDelete} roomId={roomId}/>}
  </>
  );
}
const memoizedRoomsTable = memo(RoomsTable)
export default memoizedRoomsTable