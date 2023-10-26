import React from 'react';
import { Typography, Grid } from '@mui/material';
// import product5 from "../assets/images/product5.jpg";
import banner1 from "../assets/images/banner4.jpg";

const Slideshow = () => {

  return (
    <Grid container spacing={2} className="homeSection">

      <Grid item xs={7} className='section-center'>
        <Typography variant='h4'>
        Software that keeps you in control 
        </Typography>
        <Typography variant='subtitle1'>
        See how you can track and manage your whole financial picture in one place—from bank transactions, expenses, and beyond.
        </Typography>
      </Grid>
      <Grid item xs={5} className="slider-2">
        <img alt="slide" src={banner1} />
      </Grid>
    </Grid>

  );
};

export default Slideshow;
