import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDeleteCustomerMutation } from './customersApiSlice';
import { ColorRing } from 'react-loader-spinner';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomerDeleteDialog = ({openDelete, handleCloseDelete, handleCloseCancelDelete, customerId}) => {
 
    const [deleteCustomer,{
    isLoading:deleteCustomerIsLoading,
    isSuccess,
    isError,
    error}] = useDeleteCustomerMutation()

    const onDeleteCustomer = async () => {
        await deleteCustomer({ id: customerId })
        handleCloseDelete()
    }  

  if(deleteCustomerIsLoading){
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
            This action will permanently delete the customer. Are you sure you want to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCancelDelete}>Cancel</Button>
            <Button onClick={onDeleteCustomer}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }  

  
}

export default CustomerDeleteDialog