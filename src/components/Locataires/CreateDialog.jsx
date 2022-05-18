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
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(axios.defaults.baseURL+"/locataire", {
      method: 'POST',
      body: JSON.stringify({
        nom: nom,
        adresse: adresse,
      })
    }).then(res => {
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
          <DialogTitle>Ajouter un nouveau locataire</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="nom"
              label="Nom"
              type="text"
              fullWidth
              variant="standard"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <TextField
              margin="dense"
              id="adresse"
              label="Adresse"
              type="text"
              fullWidth
              variant="standard"
              required
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
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
      <SuccessSnackBar open={openSnack} message="Locataire ajouté avec succes!" close={() => setOpenSnack(false)} />
    </div>
  );
}