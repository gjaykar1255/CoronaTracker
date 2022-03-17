import React,{useState,useEffect} from 'react'
import {Grid,LinearProgress,Divider,Typography,Container} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { singleCoin } from '../../Links/Link';
import {makeStyles} from '@material-ui/core/styles'
import CoinInfo from './CoinInfo';
import parse from 'html-react-parser';
const useStyles=makeStyles((theme)=>({
    containeer:{
        marginTop:"1.3rem"
    },
    grid1:{
        [theme.breakpoints.up("lg")]:{
            borderRight:"2px solid grey",
            paddingRight:"2.9rem"
        }
    },
    name:{
        fontWeight:"bold",
        fontFamily: "Montserrat",
        marginTop:"1rem",
        marginBottom:"1.34rem"
    },
    about:{
       
        fontFamily: "Montserrat",
        lineHeight:'2',
        fontSize:"1rem",
        
    },
    second:{
        margin:"auto"
    },
    co:{
        marginTop:"1.3rem",
        fontFamily:"Montserrat",
        display: "flex",
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
        [theme.breakpoints.up('lg')]:{
            justifyContent:"left"
        }
    },
    p:{
        marginLeft:"0.9rem",
        fontSize:"1.6rem"
    },
    n:{
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "left"
        },
        [theme.breakpoints.up("lg")]: {
            display: "flex",
            flexDirection: "column",
            justifyContent:"left"
        }
    }
}))
const CoinPage = ({currency}) => {
    console.log(currency)
    const classes=useStyles();
    const data=useParams().id;
    console.log(data);
    const[coin,setCoin]=useState([]);
    const [display,setDisplay]=useState(false);
    const getCoinData=async ()=>{
        const response=await (fetch(singleCoin(data.substring(1,data.length))));
        const coinData= await response.json();
        setCoin(coinData);
        setDisplay(true);
    }
   
    useEffect(()=>{
        getCoinData();
    },[])
    return (display?<Container>
                <Grid container style={{minHeight:"100vh"}} className={classes.containeer}>
                    <Grid className={classes.grid1} lg={4} xs={12} item style={{
                        height:"100%",
                        textAlign:"center"
                    }}>
                     <div className={classes.second}>
                        <img height={200} src={coin.image.large} alt={coin.id}/>
                        <Typography  className={classes.name} variant='h3'>{coin.name}</Typography>
                        <div style={{textAlign:"justify"}}>
                        <Typography className={classes.about} variant='subtitle1'>{parse(coin.description.en.split(". ")[0])}</Typography>
                        </div>
                     </div>
                     <div className={classes.n}>
                    <div className={classes.co}>
                        <Typography variant="h5" style={{ fontWeight: "bold", fontSize: "1.3rem", fontFamily: "Montserrat" }}>
                            Rank :
                        </Typography>
                        <Typography variant='h5' className={classes.p}>
                            {coin.market_cap_rank}
                        </Typography>
                    </div>
                    <div className={classes.co}>
                        <Typography variant="h5" style={{ fontWeight: "bold", fontSize: "1.3rem", fontFamily: "Montserrat" }}>
                            Current Price :
                        </Typography>
                        <Typography variant='h5' className={classes.p}>
                            {currency == "inr" ? `₹ ${coin.market_data.current_price[`${currency}`.toLowerCase()]}` : `$ ${coin.market_data.current_price[`${currency}`.toLowerCase()]}`}
                        </Typography>
                    </div>
                    <div className={classes.co}>
                        <Typography variant="h5" style={{ fontWeight: "bold", fontSize: "1.3rem", fontFamily: "Montserrat" }}>
                            Market Cap :
                        </Typography>
                        <Typography variant='h5' className={classes.p}>
                            {currency == "inr" ? `₹ ${(coin.market_data.market_cap[`${currency}`.toLowerCase()] / 1000000).toFixed(2)} M` : `$ ${(coin.market_data.market_cap[`${currency}`.toLowerCase()] / 1000000).toFixed(2)} M`}
                        </Typography>
                    </div>

                     </div>
                    </Grid>
                    <Grid lg={8} xs={12} item>
                      <CoinInfo id={data.substring(1, data.length)} currency={currency}/>
                    </Grid>
                </Grid>
            </Container>:<LinearProgress style={{backgroundColor:'gold'}}/>
    )
}

export default CoinPage
