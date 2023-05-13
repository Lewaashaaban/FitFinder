import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const MySnackbar = ({ open, handleClose, message, severity }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default MySnackbar;
