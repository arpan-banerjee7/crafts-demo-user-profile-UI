import {useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import { LinkContainer } from "react-router-bootstrap";
import { login } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const SignInPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading } = userLogin
    const dispatch = useDispatch()

  const handleSignIn = (e) => {
    e.preventDefault();    
    dispatch(login(email, password))
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: "15vh" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign In
      </Typography>
            {error && <Message>{error}</Message>}
            {loading && <Loader />}
      <form onSubmit={handleSignIn}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          autoComplete="false"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          autoComplete="false"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="success" fullWidth>
          Sign In
        </Button>
      </form>

      <Grid container justifyContent="flex-end" sx={{ marginTop: 1 }}>
        <Grid item>
          <LinkContainer to="/signup">
            <Button type="button" variant="contained" color="success">
              Sign Up
            </Button>
          </LinkContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignInPage;
