import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Filter(props) {
  const [filter, setFilter] = useState("ALL");
  const [year, setYear] = useState(new Date().getFullYear());

  const handleFilterChange = () => {
    let formatedFilter = filter;
    switch (filter) {
      case "YEAR":
        formatedFilter = filter + "&year=" + year;
        break;

      default:
        formatedFilter = "ALL"
        break;
    }
    props.onFilterChange(formatedFilter);
  }
  const yearItems = [];
  for (let i = new Date().getFullYear(); i >= 2000; i--) {
    yearItems.push(
      <MenuItem value={i} key={i}>{i}</MenuItem>
    );
  }
  return (
    <FilterWrapper>

      <Stack spacing={2} direction="row" className='inputs'> 

        <FormControl>
          <InputLabel id="filter-label">Filtre</InputLabel>
          <Select
            labelId="filter-label"
            id="filter"
            value={filter}
            label="Filter"
            onChange={(e) => setFilter(e.target.value)}
            size="small"
          >
            <MenuItem value={"ALL"}>Tous les locataires</MenuItem>
            <MenuItem value={"YEAR"}>En une année</MenuItem>
            <MenuItem value={"RANGE"}>Entre deux dates</MenuItem>
          </Select>
        </FormControl>

        {filter == "YEAR" ?
          <FormControl>
            <InputLabel id="year-label">Annee</InputLabel>
            <Select
              labelId="year-label"
              id="year"
              value={year}
              label="Year"
              onChange={(e) => setYear(e.target.value)}
              size="small"
            >
              {
                yearItems
              }
            </Select>
          </FormControl> : ""}

        <Button variant="contained" disableElevation onClick={handleFilterChange}>metre a jour la liste</Button>
      </Stack>

    </FilterWrapper>
  );
}

const FilterWrapper = styled.div`
  .inputs{
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: 0;
    justify-content: right;
  }
`;