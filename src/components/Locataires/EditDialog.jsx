import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SuccessSnackBar from '../common/SuccessSnackBar';
import axios from 'axios';

export default function EditDialog(props) {
  const [loc, setLoc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openSnack, setOpenSnack] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get(`/locataire?id=${props.locId}`);
      setLoc(res.data);
      setIsLoading(false);
    };

    fetchData();
    console.log(loc);
  }, [props.locId])


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${axios.defaults.baseURL}/locataire?id=${props.locId}`, {
      method: 'POST', 
      body: JSON.stringify(loc)
    })
      .then(res => {
      console.log(res.json());
      setOpenSnack(true);
      props.onClose();
    }).catch(err => {
      console.log(err);
    })

  }
  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        {
          isLoading ? <h2>Loading...</h2> : (
            <form action="" onSubmit={(e) => handleSubmit(e)}>
              <DialogTitle>Modifier un locataire</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="nom"
                  label="Nom"
                  type="text"
                  fullWidth
                  variant="standard"
                  required
                  value={loc.nom}
                  onChange={(e) => {
                    setLoc(prevLoc => {
                      return { ...prevLoc, nom: e.target.value }
                    });
                  }}
                />
                <TextField
                  margin="dense"
                  id="adresse"
                  label="Adresse"
                  type="text"
                  fullWidth
                  variant="standard"
                  required
                  value={loc.adresse}
                  onChange={(e) => {
                    setLoc(prevAp => {
                      return { ...prevAp, adresse: e.target.value }
                    });
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={props.onClose} >Annuler</Button>
                <Button type="submit" color="primary" variant="contained" >Modifier</Button>
              </DialogActions>
            </form>
          )
        }

      </Dialog>
      <SuccessSnackBar open={openSnack} message="Locataire modifié avec succes!" close={() => setOpenSnack(false)} />
    </div>
  );
}