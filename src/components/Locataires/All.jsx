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
import axios from 'axios';


function All(props) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const [activeLoc, setActiveLoc] = useState(null);

  const handleOpenEditDialog = (locId) => {
    setActiveLoc(locId);
    setOpenEditDialog(true);
  }
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false); 
    setActiveLoc(null);
    props.fetchData();
  }

  const handleDelete = (locId) => {
    if(window.confirm("Voulez vous vraiment supprimer ce locataire?")){
      axios.get("/locataire?id="+locId+"&delete=true").then(res => {
        setOpenSnack(true);
        props.fetchData();
      }).catch(err => {
        console.log(err);
      });

    } else{
      console.log("not");
    }
  }
  return (
    <>
    {
     activeLoc != null ? <EditDialog open={openEditDialog} locId={activeLoc} onClose={handleCloseEditDialog} /> : ""
    }
      
      <TableContainer component={Paper} sx={{ mt: '30px' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>n° locataire</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {
              props.all.map(loc => {
                return (
                  <TableRow
                    key={loc.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {loc.id}
              </TableCell>
                    <TableCell>{loc.nom}</TableCell>
                    <TableCell>{loc.adresse}</TableCell>
                    <TableCell>
                      <IconButton title="modifier" sx={{ color: 'blue' }} onClick={() => handleOpenEditDialog(loc.id)}>
                        <EditRoundedIcon />
                      </IconButton>
                      <IconButton title="supprimer" sx={{ color: 'red' }} onClick={() => handleDelete(loc.id)}>
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
      <SuccessSnackBar open={openSnack} message="Locataire supprimé avec succes!" close={() => setOpenSnack(false)} />
    </>
  );
}

export default All;