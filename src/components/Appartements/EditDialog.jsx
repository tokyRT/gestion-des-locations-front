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
  const [ap, setAp] = useState(null);
  const [designation, setDesignation] = useState("");
  const [lieu, setLieu] = useState("");
  const [loyer, setLoyer] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [openSnack, setOpenSnack] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get(`/appartement?id=${props.apId}`);
      setAp(res.data);
      setIsLoading(false);
    };

    fetchData();
    console.log(ap);
  }, [props.apId])


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${axios.defaults.baseURL}/appartement?id=${props.apId}`, {
      method: 'POST', 
      body: JSON.stringify(ap)
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
              <DialogTitle>Modifier un appartement</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="designation"
                  label="Designation"
                  type="text"
                  fullWidth
                  variant="standard"
                  required
                  value={ap.designation}
                  onChange={(e) => {
                    setAp(prevAp => {
                      return { ...prevAp, designation: e.target.value }
                    });
                  }}
                />
                <TextField
                  margin="dense"
                  id="lieu"
                  label="Lieu"
                  type="text"
                  fullWidth
                  variant="standard"
                  required
                  value={ap.lieu}
                  onChange={(e) => {
                    setAp(prevAp => {
                      return { ...prevAp, lieu: e.target.value }
                    });
                  }}
                />
                <TextField
                  margin="dense"
                  id="loyer"
                  label="Loyer mensuel (en ariary)"
                  type="number"
                  fullWidth
                  variant="standard"
                  required
                  value={ap.loyer}
                  onChange={(e) => {
                    setAp(prevAp => {
                      return { ...prevAp, loyer: e.target.value }
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
      <SuccessSnackBar open={openSnack} message="Appartement modifié avec succes!" close={() => setOpenSnack(false)} />
    </div>
  );
}