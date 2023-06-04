import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDeleteBookingMutation } from './bookingsApiSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteBookingDialog = ({openDelete, handleCloseDelete, handleCloseCancelDelete, bookingId}) => {
 
    const [deleteBooking,
    isLoading,
    isSuccess,
    isError,
    error] = useDeleteBookingMutation()

    const onDeleteTodo = async () => {
        await deleteBooking({ id: bookingId })
        handleCloseDelete()
    }  

  return (
    <div>
      <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDelete}
        aria-describedby="alert-dialog-slide-description" sx={{zIndex:1301}}
      >
        <DialogTitle>{"Are you sure you want to delete the booking?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          This action will permanently delete the booking. Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelDelete}>Cancel</Button>
          <Button onClick={onDeleteTodo}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteBookingDialog