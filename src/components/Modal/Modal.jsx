import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
//   const [open, setOpen] = React.useState(false);
    const {open, close} = props
//   const handleClose = () => {
//     setOpen(false);
//   };

  return (
    <div>
      <Dialog
        open={open}
        // onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Pirámide de Seguros informa"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Su proceso a culminado de manera satisfactoria. Para culminar por favor dar click en el boton de "Terminar Proceso." y dirijase a su sección del portal. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} autoFocus>
            Terminar Proceso.
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}