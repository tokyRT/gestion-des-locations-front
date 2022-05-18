import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert  from '@mui/material/Alert';

function SuccessSnackBar(props) {
    const [open, setOpen] = React.useState(props.open);
    const handleClose = () => {
        props.close();
    }
    return ( 
        <Snackbar open={props.open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }} variant="filled" elevation={6}>
          {props.message}
        </MuiAlert>
      </Snackbar>
     );
}

export default SuccessSnackBar;