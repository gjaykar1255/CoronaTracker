import React,{useState,useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import 'chart.js';
import {HistoricalChart} from '../../Links/Link';
import { Button, Container, ThemeProvider, createTheme, CircularProgress} from '@material-ui/core';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import {moment} from 'moment'
import {makeStyles} from '@material-ui/core/styles';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff"
        },
        type: "dark"
    }
})
const useStyles=makeStyles((theme)=>({
container:{
    display:"flex",
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-between"
    ,marginTop:"4rem"
},
btn:{
    width:"22%",
    border:"1px solid gold",
    padding:"0.8rem",
    fontWeight: "bold",
    marginBottom:"2rem",
    "&:hover":{
        color:"black",
        backgroundColor:"gold",
        fontWeight:"lighter"
    },
    [theme.breakpoints.down("lg")]:{
        width:"22%",
        padding:"0.4rem"
    } 
},
    chart: {
        [theme.breakpoints.down("lg")]:{
            width:"100%"
        }
    },
})) ;

const CoinInfo = ({id,currency}) => {
    const classes=useStyles();
    const[histData,setHistData]=useState([]);
    const[day,setDay]=useState(1);
    const [color,setColor]=useState(1);
    const setButtonProperties = (e) => {
        console.log(e.currentTarget.value);
            setDay(e.currentTarget.value);
            setColor(e.currentTarget.value);
    }
    const getHistorialData=async()=>{
        const response=await (await fetch(HistoricalChart(id,day,currency))).json();
        setHistData(response.prices);
        console.log(response.prices);
    }
    useEffect(()=>{
        getHistorialData();
    },[day,currency]);
  return (
     <ThemeProvider  theme={darkTheme}>
          <Container style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"4rem"}}>
         <Chart style={{height:"900px"}} className={classes.chart} histData={histData} day={day} />
             <div className={classes.container}>
                  <Button value={1} onClick={(e) => setButtonProperties(e)} style={{ backgroundColor: color == 1 ? "gold" : "initial", color: color == 1 ? "black" : "white" }} className={classes.btn} variant="contained">24 Days</Button>
                  <Button value={30} onClick={(e) => setButtonProperties(e)} style={{ backgroundColor: color == 30 ? "gold" : "", color: color == 30 ? "black" : "white" }} className={classes.btn} variant="outlined">1 Month</Button>
                  <Button value={90} onClick={(e) => setButtonProperties(e)} style={{ backgroundColor: color == 90 ? "gold" : "", color: color == 90 ? "black" : "white" }} className={classes.btn} variant="outlined">3 Month</Button>
                  <Button value={365} onClick={(e) => setButtonProperties(e)} style={{ backgroundColor: color == 365 ? "gold" : "", color: color == 365 ? "black" : "white" }} className={classes.btn} variant="outlined">1 Year</Button>
             </div>
          </Container> 
      </ThemeProvider>
  )
};
const Chart=({histData,day})=>{
    return (
     
            <Line
                data={
                    {
                        labels: histData.map((element) => {
                            let date = new Date(element[0]);
                            let time = date.getHours() > 12 ? `${date.getHours() - 12} : ${date.getMinutes()}PM` : `${date.getHours()} : ${date.getMinutes()}AM`
                            return day > 1 ? date.toLocaleDateString(): time;
                        }),
                        datasets: [
                            {
                                label: `Price (Past ${day} in INR)`,
                                data: histData.map((element) => {
                                    return element[1];
                                }),
                                borderColor: "gold",
                                pointRadius: 0
                            },

                        ],
                    }
                }
            />
    )
}

export default CoinInfo;
