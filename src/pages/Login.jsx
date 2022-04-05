import React from 'react';
import styled from 'styled-components';
import * as styles from '../styles/variables';
import LoginForm from '../components/Login/LoginForm';
import { Paper } from '@mui/material';
import appIcon from '../assets/img/app-icon.svg';
import eniBg from '../assets/img/eni-bg.png';
import appLogo from '../assets/img/analytica.svg'
import eniLogo from '../assets/img/eni-logo.png'
import aeeniLogo from '../assets/img/aeeni-logo-xs.png'

export default function Login() {
  return (
    <PageWrapper>
      <img src={appIcon} alt="app icon " />
      <Paper elevation={0} className="container">
        <div className="left">
          <img className='appLogo' src={appLogo} alt="app logo" />
          <p>
            Application de gestion des trucs de l’ENI
          </p>
          <div className="footer">
            <img src={eniLogo} alt="eni logo" />
            <img src={aeeniLogo} alt="aeeni logo" className='aeeni'/>
          </div>
        </div>
        <div className="right">
          <div className="content">
            <div className="title">
              <img src={appIcon} alt="app icon " />
              <h2>Se connecter</h2>
            </div>
            <LoginForm />
          </div>
        </div>
      </Paper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  position: relative;
  padding-top: 20vh;
  min-height: 100vh;
  &>img{
    position: absolute;
    top: 30px;
    left: 30px;
  }
  .container{
    max-width: 990px;
    margin: 0 auto;
    min-height: 580px;
    border-radius: 20px;
    display: flex;
    overflow: hidden;
    box-shadow: 0 4px 4px rgba(0,0,0,.1);
    .left{
      width: 355px;
      background-image: url('${eniBg}');
      background-size: cover;
      padding: 27px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .appLogo{
        width: 146px;
      }
      p{
        color: white;
        font-family: Montserrat;
        font-size: 2.2em;
        font-weight: 800;
        margin-top: -40px;
      }
      .footer{
        img{
          width: 65px;
          margin-right: 20px;
        }
        .aeeni{
          width: 75px;
        }
      }
    }
    .right{
      padding: 27px;
      width:  70%;
      .content{
        max-width: 400px;
        margin: auto;
        margin-top: 40px;
        .title{
          text-align: center;
        }
      }
    }
  }
`;