import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SuccessSnackBar from '../common/SuccessSnackBar';
import axios from 'axios';

export default function CreateDialog(props) {
  const [designation, setDesignation] = useState("");
  const [lieu, setLieu] = useState("");
  const [loyer, setLoyer] = useState(0);
  const [openSnack, setOpenSnack] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(axios.defaults.baseURL+"/appartement", {
      method: 'POST',
      body: JSON.stringify({
        designation: designation,
        lieu: lieu,
        loyer: loyer
      })
    }).then(res => {
      console.log(res.json());
      props.fetchData();
      props.onClose();
      setOpenSnack(true);
    }).catch(err => {
      console.log(err);
    });

  }
  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <DialogTitle>Ajouter un nouvel appartement</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="designation"
              label="Designation"
              type="text"
              fullWidth
              variant="standard"
              required
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
            <TextField
              margin="dense"
              id="lieu"
              label="Lieu"
              type="text"
              fullWidth
              variant="standard"
              required
              value={lieu}
              onChange={(e) => setLieu(e.target.value)}
            />
            <TextField
              margin="dense"
              id="loyer"
              label="Loyer mensuel (en ariary)"
              type="number"
              fullWidth
              variant="standard"
              required
              value={loyer}
              onChange={(e) => setLoyer(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.onClose}>Annuler</Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
            >Ajouter</Button>
          </DialogActions>
        </form>
      </Dialog>
      <SuccessSnackBar open={openSnack} message="Appartement ajouté avec succes!" close={() => setOpenSnack(false)} />
    </div>
  );
}