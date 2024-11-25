// src/components/footer/Footer.jsx
import React from 'react';
import classes from './Footer.module.css';
import { Divider } from '@mui/material';
import dayjs from 'dayjs';

const Footer = () => {
  return (
    <>
     <Divider sx={{ backgroundColor: 'black' }}></Divider>
    <footer className={classes.footer}>
      <div>{dayjs(new Date()).format('YYYY')} &copy; <b>Vspace Software</b> - Save your time, choose the best</div>
    </footer>
    </>

  );
};

export default Footer;