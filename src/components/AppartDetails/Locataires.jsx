import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function Locataires(props) {
  const [locataires, setLocataires] = useState([]);
  const [filter, setFilter] = useState(props.filter);
  useEffect(() => {
    axios.get("/appartement?id=" + props.apId + "&locataire=" + filter).then(res => {
      setLocataires(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, [filter]);
  return (
    <PageWrapper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Locataires">
          <TableHead>
            <TableRow>
              <TableCell>Locataire</TableCell>
              <TableCell>Date d'entrée</TableCell>
              <TableCell>Date de fin de location</TableCell>
              {/* <TableCell>Nb de mois</TableCell> */}
              <TableCell>Loyer mensuel</TableCell>
              <TableCell>Montant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {

              locataires.map((loc, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {loc.nom}
                  </TableCell>
                  <TableCell>{loc.dateEntree}</TableCell>
                  <TableCell>{"000000"} ({loc.nbrMois}) Mois</TableCell>
                  <TableCell>{loc.loyer}</TableCell>
                  <TableCell>{loc.loyer * loc.nbrMois}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`

`;