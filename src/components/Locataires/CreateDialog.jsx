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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function CreateDialog(props) {
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [nbrMois, setNbrMois] = useState(3);
  const [dateEntree, setDateEntree] = useState("2022-03-20");
  const [openSnack, setOpenSnack] = useState(false);

  const [appartsEnterDate, setAppartsEnterDate] = useState(null);
  const [appartsLibre, setAppartsLibre] = useState(null);
  const [activeAppart, setActiveAppart] = useState(null);

  useEffect(() => {
    axios.get("/appartement?filter=AVAILABLE&enterDate="+dateEntree).then(res => {
      setAppartsEnterDate(res.data);
    }).catch(err => {
      console.log(err);
    });

    axios.get("/appartement?filter=AVAILABLE").then(res => {
      setAppartsLibre(res.data);
    }).catch(err => {
      console.log(err);
    });

  }, [dateEntree]);


  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(activeAppart == null){
      alert("Veuiller choisir un appartement");
      return;
    }
    console.log(activeAppart);
    // return;
    fetch(axios.defaults.baseURL + "/locataire", {
      method: 'POST',
      body: JSON.stringify({
        nom: nom,
        adresse: adresse,
        dateEntree: dateEntree,
        apId: activeAppart,
        nbrMois: nbrMois
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
            <TextField
              margin='dense'
              label="Date d'entrée"
              type="date"
              fullWidth
              variant="standard"
              required
              value={dateEntree}
              onChange={(e) => {setActiveAppart(null); setDateEntree(e.target.value);}}
            />
            <h4>Appartement du locataire: </h4>
            <h5>Appartements libres à la date d'entrée choisie ({appartsEnterDate ? appartsEnterDate.length : 0})</h5>
            <div className="appartements">
              {
                appartsEnterDate ? appartsEnterDate.map(ap => {
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
                      <CheckCircleIcon className='check'/>
                    </div>
                  )
                }) : ""
              }
            </div>
            <h5>Nouveaux appartements({appartsLibre ? appartsLibre.length : 0})</h5>
            <div className="appartements">
              {
                appartsLibre ? appartsLibre.map(ap => {
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
                      <CheckCircleIcon className='check'/>
                    </div>
                  )
                }) : ""
              }
            </div>
            <TextField
              margin='dense'
              label="Nombre de mois de sejour (3 mois minimum)"
              InputProps={{ inputProps: { min: 3} }}
              type="number"
              fullWidth
              variant="standard"
              required
              value={nbrMois}
              onChange={(e) => setNbrMois(e.target.value)}
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
      position: relative;
      .check{
        color: green;
        position: absolute;
        bottom: 5px;
        right: 5px;
        opacity: 0;
        transition: all .15s;
      }
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
        .check{
          opacity: 1;
        }
      }
    }
  }
`;