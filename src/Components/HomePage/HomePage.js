import React from 'react';
import {Container,Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import Image from './banner2.jpg'
import Carowsel from '../Carowsel/Carowsel'
import CryptoTable from '../CryptoTable/CryptoTable'
const useStyles=makeStyles(()=>({
    banner:{
        backgroundImage: `url(${Image})`,
        minHeight:'400px'
    },
    headings:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        paddingTop:"3.3rem"
    }
}))
const HomePage = ({currency}) => {
const classes=useStyles();
  return (
    <>
        <div className={classes.banner}>
            <Container className={classes.headings}>
                <Typography xs={12} variant="h2" style={{
                    textAlign:"center",
                    fontWeight:"bold",
                    fontFamily:"Montserrat"
                }}>Crypto Punk</Typography>
                <Typography  variant="subtitle2" style={{
                    marginTop:"1rem",
                  fontFamily: "Montserrat",
                  textTransform:"capitalize",
                  color:"darkgrey"
                }}>
                  Get all the Info regarding your favorite Crypto Currency
                </Typography>
               <Carowsel currency={currency}/>
            </Container>
        </div>
        <CryptoTable currency={currency}/>
        </>
  )
};

export default HomePage;
