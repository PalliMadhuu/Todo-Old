import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideDeleteModal } from '../UsingRedux/PopUpSlice';
import { AllTodos, deleteToDoById } from '../UsingRedux/ToDosSlice';
import { AppDispatch } from '../UsingRedux/TodosStrore';
// import Typography from '@mui/material/Typography';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import { useState } from 'react';




export default  function DeletePopUp()
{
    const {showDelete}=useSelector((state:any)=>state.popUps)
    const dispatch=useDispatch<AppDispatch>();
    const {idToDelete}=useSelector((state:any)=>state.popUps)
    // const [open, setOpen] = useState(false);

    // const handleClickOpen = () => {
    //   setOpen(true);
    // };
    // const handleClose = () => {
    //   setOpen(false);
    // };
  
   
    return(
        <div>
             {/* <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showDelete}      >
        <DialogTitle id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>dispatch(hideDeleteModal())}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog> */}
     <Modal show={showDelete} style={{marginTop:"10%"}}>

           <Modal.Body style={{textAlign:"center"}}>
        <h3>Do You Want To Delete</h3>

       <Button style={{marginRight:"10px"}} variant='info' onClick={()=>{dispatch(deleteToDoById(idToDelete));dispatch(hideDeleteModal());dispatch(AllTodos())}}>Yes</Button>
       <Button variant='info' onClick={()=>dispatch(hideDeleteModal())}>No</Button>

        </Modal.Body>


     </Modal>

      </div>
    )
}