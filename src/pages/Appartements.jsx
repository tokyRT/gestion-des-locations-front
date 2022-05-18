import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import All from '../components/Appartements/All';
import Button from '@mui/material/Button';
import CreateDialog from '../components/Appartements/CreateDialog';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function Appartements() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [all, setAll] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchData = () => {
    axios.get('/appartement').then(res => {
      setAll(res.data);
      setFiltered(res.data);
    }).catch(err => {
      console.log(err);
    });
  }
  useEffect(fetchData, []);

  const handleSearch = () => {
    let filteredTmp = all.filter((ap) => {
      if(ap.designation.toLowerCase().includes(searchQuery.toLowerCase()) || String(ap.id).includes(searchQuery)){
        return ap;
      }
    });
    setFiltered(filteredTmp);
  }

  return (
    <Main>
      <h1>Appartements</h1>
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
          label="Rechercher un appartement par son numero ou sa designation"
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