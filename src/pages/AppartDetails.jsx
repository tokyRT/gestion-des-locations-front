import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LocataireActuel from '../components/AppartDetails/LocataireActuel';
import Locataires from '../components/AppartDetails/Locataires';
import Filter from '../components/AppartDetails/Filter';

export default function AppartDetails() {
  let params = useParams();
  const [appart, setAppart] = useState(null);
  const [formatedFilter, setFormatedFilter] = useState("YEAR&year=2022");
  useEffect(() => {
    axios.get("/appartement?id=" + params.apId).then(res => {
      setAppart(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, []);
  const onFilterChange = (newFilter) => {
    setFormatedFilter(newFilter);
    // console.log(filter);
  };
  return (
    <PageWrapper>
      {
        appart ?
          <div className="main">
            <div className="header">
              <h1>AppartDetails {params.apId}</h1>
            </div>
            <div className="body">
              <LocataireActuel appart={appart} />
              <h3>Liste des locataires</h3>
              <Filter onFilterChange={onFilterChange}/>
              <Locataires apId={params.apId} filter={formatedFilter} />
            </div>
          </div> : ""
      }
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  .main{
    max-width: 1000px;
    margin: auto;
    margin-top: 7vh;
    padding: 40px;
    /* border-radius: 20px; */
    box-shadow:
      0px 0.7px 3.7px rgba(0, 0, 0, 0.01),
      0px 1.8px 7.8px rgba(0, 0, 0, 0.015),
      0px 3.7px 13.2px rgba(0, 0, 0, 0.02),
      0px 7.7px 21.7px rgba(0, 0, 0, 0.027),
      0px 21px 45px rgba(0, 0, 0, 0.04)
    ;

  }
`;
