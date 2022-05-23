import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SuccessSnackBar from '../common/SuccessSnackBar';
import axios from 'axios';
import styled from 'styled-components';
import appartThumb from '../../assets/img/appart-img.jpg';

export default function CreateDialog(props) {
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [openSnack, setOpenSnack] = useState(false);

  const [apparts, setApparts] = useState(null);
  const [activeAppart, setActiveAppart] = useState(null);

  useEffect(() => {
    axios.get("/appartement").then(res => {
      setApparts(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(axios.defaults.baseURL + "/locataire", {
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
      <Dialog open={props.open} onClose={props.onClose} maxWidth="md">
        <FormWrapper action="" onSubmit={(e) => handleSubmit(e)}>
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
            <h4>Appartements libres</h4>
            <div className="appartements">
              {
                apparts ? apparts.map(ap => {
                  return (
                    <div className={`appart ${ap.id==activeAppart ? "active" : ""}`} key={ap.id} title="Choisir" onClick={() => setActiveAppart(ap.id)}>
                      <div className="left">
                        <img src={appartThumb} alt="" />
                      </div>
                      <div className="right">
                        <strong>{ap.designation}</strong>
                      <div className="details">
                        <small>{ap.lieu} | {ap.loyer} Ar/mois</small>
                      </div>
                      </div>
                    </div>
                  )
                }) : ""
              }
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.onClose}>Annuler</Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
            >Ajouter</Button>
          </DialogActions>
        </FormWrapper>
      </Dialog>
      <SuccessSnackBar open={openSnack} message="Locataire ajouté avec succes!" close={() => setOpenSnack(false)} />
    </div>
  );
}

const FormWrapper = styled.form`
  .appartements{
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    .appart{
      display: flex;
      width: 250px;
      align-items: flex-start;
      cursor: pointer;
      padding: 5px;
      /* border: 1px solid red; */
      gap: 10px;
      .left{
        width: 60px;
        height: 60px;
        img{
          width: 100%;
        }
      }
        border: 3px solid transparent;
      &.active{
        border: 3px solid green;
      }
    }
  }
`;