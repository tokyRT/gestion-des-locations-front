import React from 'react';
import styled from 'styled-components';
import * as styles from '../../styles/variables';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

export default function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  }
  return (
    <div>
      <FormWrapper onSubmit={handleSubmit}>
        <TextField
          required
          id='email'
          label="Votre email"
          type="email"
          fullWidth={true}
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          id='password'
          label="Votre mot de passe"
          type="password"
          fullWidth={true}
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
          variant='contained' 
          disableElevation 
          color='primary'
          size='large'
          type='submit'
          >Se connecter</Button>
      </FormWrapper>
    </div>
  );
}

const FormWrapper = styled.form`
  input{
    border-radius: ${styles.size.borderRadius} !!important;
  }
  button{
    width: 100%;
  }
`;
