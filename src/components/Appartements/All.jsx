import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditDialog from './EditDialog';
import SuccessSnackBar from '../common/SuccessSnackBar';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import ErrorIcon from '@mui/icons-material/Error';
import axios from 'axios';
import { Link } from 'react-router-dom';


function All(props) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const [activeAp, setActiveAp] = useState(null);

  const handleOpenEditDialog = (apId) => {
    setActiveAp(apId);
    setOpenEditDialog(true);
  }
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setActiveAp(null);
    props.fetchData();
  }

  const handleDelete = (apId) => {
    if (window.confirm("Voulez vous vraiment supprimer cet appartement?")) {
      axios.get("/appartement?id=" + apId + "&delete=true").then(res => {
        console.log(res);
        setOpenSnack(true);
        props.fetchData();
      }).catch(err => {
        console.log(err);
      });

    } else {
      console.log("not");
    }
  }
  return (
    <>
      {
        activeAp != null ? <EditDialog open={openEditDialog} apId={activeAp} onClose={handleCloseEditDialog} /> : ""
      }

      <TableContainer component={Paper} sx={{ mt: '30px' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>N°</TableCell>
              <TableCell>designation</TableCell>
              <TableCell>Lieu</TableCell>
              <TableCell>Loyer</TableCell>
              <TableCell>Locataire actuel</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {
              props.all.map(ap => {
                return (
                  <TableRow
                    key={ap.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link to={`/appartements/${ap.id}`}>
                        APP{ap.id}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to={`/appartements/${ap.id}`}>
                        {ap.designation}
                      </Link>
                    </TableCell>
                    <TableCell>{ap.lieu}</TableCell>
                    <TableCell>{ap.loyer} Ar</TableCell>
                    <TableCell>
                      {
                        ap.locataire ?

                          <Chip
                            color="primary"
                            label={ap.locataire.nom}
                            avatar={<Avatar>{ap.locataire.nom[0].toUpperCase()}</Avatar>}
                          />

                          :

                          <Chip color="warning" label="aucun" icon={<ErrorIcon />} />
                      }
                    </TableCell>
                    <TableCell>
                      <IconButton title="modifier" sx={{ color: 'blue' }} onClick={() => handleOpenEditDialog(ap.id)}>
                        <EditRoundedIcon />
                      </IconButton>
                      <IconButton title="supprimer" sx={{ color: 'red' }} onClick={() => handleDelete(ap.id)}>
                        <DeleteRoundedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            }



          </TableBody>
        </Table>
      </TableContainer>
      <SuccessSnackBar open={openSnack} message="Appartement supprimé avec succes!" close={() => setOpenSnack(false)} />
    </>
  );
}

export default All;