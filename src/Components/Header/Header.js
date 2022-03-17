import React,{useState,useEffect} from 'react'
import {AppBar,Container,Toolbar,Typography,Select,MenuItem,Box,createTheme,ThemeProvider,Button} from '@material-ui/core';
import useStyles from './Header.module'
const Header = (props) =>{
    const classes=useStyles();
    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff"
            },
            type:"dark"
        }
    })
    return (
        <ThemeProvider theme={darkTheme} style={{ zIndex: 4 }}>
            <AppBar position='static' color='transparent' >
                <Container>
                    <Toolbar >
                        <Typography 
                        variant="h6" className={classes.title}>
                            Crypto Punk
                        </Typography>
                        <Box style={{display:"flex",alignItems:"center"}}>
                            <Select value={props.currency} variant='outlined' style={{
                                height:40,
                                width:90,
                                marginRight:15
                                }} onChange={(e)=>props.handleClick(e.target.value)}>
                                <MenuItem  value={'inr'}>INR</MenuItem>
                                <MenuItem value={'usd'}>USD</MenuItem>
                            </Select>
                            <Button onClick={()=>props.setShow(!props.show)} variant="outlined" style={{ backgroundColor: "gold", padding: "0.45rem 1.2rem", color: "black", fontFamily:"Montserrat"}}>Login</Button>
                        </Box>
                    </Toolbar>
                   
                </Container>
            </AppBar>
          
        </ThemeProvider>
    )
}

export default Header
