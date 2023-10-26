import React from 'react';
import { Avatar, Typography, Container, Grid, Button } from '@mui/material';
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ProfilePage = () => {
  const theme = createTheme({
    palette: {
        primary: {main:'#7ea68c',light:'#fff', contrastText: '#fff'},
        secondary: {main:'#7ea68c',light:'#fff',contrastText: '#fff'}
    },
    typography: {
      fontSize: 12
    }
  });
  const userData = useSelector(state => state.userDetails);
  const { name, email, businessProfile } = userData.userInfo;
 
  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="md" padding={5}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar alt="Profile Picture" sx={{ width: 100, height: 100, border: '2px solid #7ea68c' }} />
        </Grid>
        <Grid item>
          <Typography variant="h4">{name}</Typography>
          <Typography variant="subtitle1">{email}</Typography>
        </Grid>
      </Grid>

      <Grid paddingY={3}>
      <Typography variant="subtitle1">
        CompanyName : {businessProfile.companyName}
      </Typography>
      <Typography variant="subtitle1">
        Website : {businessProfile.website}
      </Typography>
      </Grid>
      <LinkContainer to="/editProfile">
        <Button variant="contained" color='primary' sx={{marginTop: '10px', color:'#fff'}}>Edit Profile</Button>
      </LinkContainer>
    </Container>
    </ThemeProvider>
  );
};

export default ProfilePage;
