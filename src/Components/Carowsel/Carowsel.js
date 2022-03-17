import React,{useEffect,useState} from 'react';
import AliceCarousel  from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {trend} from '../../Links/Link'
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
const useStyles=makeStyles(()=>(
  {
    main: {
      marginTop: "4.5rem",
      width: "100%",
      textAlign:"center",
      paddingLeft:"1rem",
      color:'White',
      paddingBottom:"2rem",
      fontFamily: "Montserrat",
      textAlign:"center"
    }
  }
))
const Carowsel = ({currency}) => {
  const navigate=useNavigate();
  const classes=useStyles();
  const [trendData,setTrendData]=useState([]);
  const fetchTrendingData=async()=>{
    const trendingData= await (await fetch(trend(currency))).json();
    setTrendData(trendingData);
  }    
  useEffect(()=>{
  
    fetchTrendingData();
  },[]);
  return <div className={classes.main}>
    <AliceCarousel  mouseTracking 
    mouseTracking    
    infinite
    autoPlayInterval={1000} 
    animationDuration={1300} 
    disableDotsControls
    disableButtonsControls  
    responsive={
      {
        0: { items: 2},
        450:{items:3},
        568: { items: 4 },
      } 
    }
    autoPlay 
    items={trendData.map((eachCoin)=>{
      const percentageChange = eachCoin.price_change_percentage_24h;
      const price=eachCoin.current_price;  
     
      {/*console.log(currency == "inr" ? `₹ ${price.toFixed(2)}` : `$ ${((price) * (0.013)).toFixed(2)}`)*/}
      return (  
        <Link to={`/coins/:${eachCoin.name}`.toLowerCase()}>
        <img src={eachCoin.image} alt={'coins digital image'} height="85" style={{marginBottom:"1rem"}}/>
          <div>
            <span style={{ marginRight: '12px', color: "white"}}>{`${eachCoin.symbol}`.toUpperCase()}    
            </span>
            <span style={{color:percentageChange>=0?"rgb(14,203,129)":"red"}}> 
              {percentageChange>= 0 ? `+${percentageChange.toFixed(2)}` : `-${percentageChange.toFixed(2)}`}</span> 
          </div>
          <div style={{marginTop:"0.5rem",fontSize:"1.3rem",color:"white"}}>
            {currency == "inr" ? `₹ ${price.toFixed(2)}` : `$ ${((price) * (0.013)).toFixed(2)}`}  
          </div>
        </Link>
      )
    })}
    />
  </div>;
};
export default Carowsel;
