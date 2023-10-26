import {useState} from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'

const SignUpPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { error, loading } = userRegister

    const handleSignIn = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
            setMessage('')
        }
    };

  return (
    <Container maxWidth="xs" sx={{marginTop:'15vh'}}>
        <Typography variant="h4" align="center" gutterBottom>
            Sign Up
        </Typography>
        {message && <Message>{message}</Message>}
        {error && <Message variant='error'>{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={handleSignIn}>
            <TextField
            label="Name"
            type="text"
            fullWidth
            margin="normal"
            required
            autoComplete='false'
            onChange={(e) => setName(e.target.value)}
            />
            <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            autoComplete='false'
            required
            onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            autoComplete='false'
            required
            onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
            label="Confrim Password"
            type="password"
            fullWidth
            margin="normal"
            autoComplete='false'
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="success" fullWidth>
            Sign Up
            </Button>        
        </form>      
        <Grid container justifyContent="flex-end" sx={{marginTop:1}}>
            <Grid item>
            <LinkContainer to="/signin">
                <Button type="button" variant="contained" color="success">
                    Sign In
                </Button>
            </LinkContainer>
            </Grid>
        </Grid>
    </Container>
  );
};

export default SignUpPage;
