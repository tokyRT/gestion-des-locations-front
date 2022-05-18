import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import All from '../components/Locataires/All';
import Button from '@mui/material/Button';
import CreateDialog from '../components/Locataires/CreateDialog';
import axios from 'axios';
import TextField from '@mui/material/TextField';

export default function Locataires() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [all, setAll] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchData = () => {
    axios.get('/locataire').then(res => {
      setAll(res.data);
      setFiltered(res.data);
    }).catch(err => {
      console.log(err);
    });
  }
  useEffect(fetchData, []);

  const handleSearch = () => {
    let filteredTmp = all.filter((loc) => {
      if(loc.nom.toLowerCase().includes(searchQuery.toLowerCase()) || String(loc.id).includes(searchQuery)){
        return loc;
      }
    });
    setFiltered(filteredTmp);
  }

  return (
    <Main>
      <h1>Locataires</h1>
      <div className="buttonSection">
        <Button variant="contained" onClick={() => setOpenCreateDialog(true)}>Ajouter</Button>
        <CreateDialog
          open={openCreateDialog}
          onClose={() => setOpenCreateDialog(false)}
          fetchData={fetchData}
        />
      </div>
      <div className="search">
        <TextField
          margin="dense"
          id="search"
          label="Rechercher un locataire par son numero ou son nom"
          type="text"
          fullWidth
          variant="standard"
          value={searchQuery}
          onChange={(e) => {
            // handleSearch(e);
            setSearchQuery(e.target.value);
          }}
          onKeyUp={handleSearch}
          sx={{
            maxWidth: '500px'
          }}
        />
      </div>
      <All className="all" all={filtered} fetchData={fetchData} />
    </Main>
  );
}

const Main = styled.div`
  .buttonSection{
    text-align: right;
  }
`;