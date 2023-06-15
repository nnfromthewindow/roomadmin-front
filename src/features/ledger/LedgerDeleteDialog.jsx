import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDeleteLedgerItemMutation } from './ledgerApiSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LedgerDeleteDialog = ({openDelete, handleCloseDelete, handleCloseCancelDelete, selectedIds, numSelected}) => {
 console.log(selectedIds)
    const [deleteLedgerSelectedItem,
    isLoading,
    isSuccess,
    isError,
    error] = useDeleteLedgerItemMutation()

    const onDeleteSelectedLedgerItems = async () => {
        await deleteLedgerSelectedItem({ids:selectedIds})
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
          This action will permanently delete {numSelected} {numSelected == 1 ? 'item' : 'items'} from the ledger. Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelDelete}>Cancel</Button>
          <Button onClick={onDeleteSelectedLedgerItems}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LedgerDeleteDialog