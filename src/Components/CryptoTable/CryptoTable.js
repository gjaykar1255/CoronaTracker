import React,{useState,useEffect} from 'react';
import {Typography,Container,TextField,createTheme,ThemeProvider,Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination'
import {makeStyles} from '@material-ui/core/styles'
import {cryptoList} from '../../Links/Link'
import {useNavigate} from 'react-router-dom';
const useStyles=makeStyles(()=>({
containeer:{
fontFamily:"Montserrat",
marginTop:"3rem",
textAlign:"center",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center"
},
onTouch:{
    fontFamily: "Montserrat",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: '#131111',
    },
},
head: {
    fontFamily: "Montserrat",
        color: "black", fontWeight: "800"
    },
    pagination:{
        "& .MuiPaginationItem-root":{
            color:"gold"
        }
    }
}));  
const CryptoTable = ({currency}) => {
    const[table,setTable]=useState([]);  
    const[table2,setTable2]=useState([]);
    const [page,setPage]=useState(1);
    const classes = useStyles();
    const navigate=useNavigate();
    const changePage=(data)=>{
       if(data!==page)setPage(data);
    }
    const getTableData=async ()=>{
       const tableData=await fetch(cryptoList(currency));
       const response =await tableData.json();   
        setTable2(response);
        setTable(response); 
    }
    const fn1=(e,value)=>{
        changePage(value);
    }
    useEffect(()=>{
       getTableData();
    },[]);
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff"
            },
            type: "dark"
        }
    })
    const changeTable=(e)=>{
        console.log(e.target.value)
        console.log(table[0].name)
        const newTable=table.filter((element) => element.name.toLowerCase().indexOf(e.target.value) >= 0)
        console.log(newTable)
        setTable2(newTable);
    }
  return <ThemeProvider theme={darkTheme}>
  <Container   className={classes.containeer} >
      <Typography variant='h4'>
          Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField onChange={(e)=>{changeTable(e)}} label="Search For a Crypto Currency...." variant='outlined' style={{margin:"2rem",width:"100%"}}></TextField>
      <TableContainer>
      <Table>
          <TableHead style={{
                      backgroundColor: "gold",
          }}>
            <TableRow  >
                 <TableCell align="left" className={classes.head}>
                      Coin
                  </TableCell>
                  <TableCell align="right" className={classes.head}>
                      Price
                  </TableCell>
                <TableCell align="right" className={classes.head}>
                      24th Change
                  </TableCell>
                 <TableCell align='right' className={classes.head}>
                      Markey Cap
                  </TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
                      {
                          table2.slice((page-1)*10,(page)*10).map((eachElement, index) => {
                              const price = eachElement.current_price;
                              const percentChange = eachElement.price_change_percentage_24h;
                              const marketCap = eachElement.market_cap;
                              const marketLength=`${marketCap}`.length;
                              return <TableRow key={index} className={classes.onTouch} onClick={()=>navigate(`/coins/:${eachElement.name}`.toLowerCase())}>
                                  <TableCell style={{ display: "flex", flexDirection: "row",textAlign:"left" }} align="right">
                                      <img src={eachElement.image} alt={eachElement.symbol} height={53} />
                                      <div style={{display:"flex",flexDirection:"column",marginLeft:"1rem",lineHeight:"1.6rem"}}>
                                          <span style={{fontSize:'1.5rem'}}>{`${eachElement.symbol}`.toUpperCase()}</span>
                                          <span style={{color:"darkGrey"}}>{eachElement.name}</span> 
                                      </div>
                                  </TableCell>
                                  <TableCell align='right'>
                                      {currency == "inr" ? `₹ ${price.toFixed(2)}` : `$ ${((price)*(0.013)).toFixed(2)}`}
                                  </TableCell>
                                  <TableCell align='right' style={{ color: percentChange >= 0 ? "rgb(14,203,129)" : "red" }}>
                                      {percentChange >= 0 ? `+${percentChange.toFixed(2)}` : `-${percentChange.toFixed(2)}`}
                                  </TableCell>
                                  <TableCell align='right'>
                                      {`₹ ${marketCap}`.substring(0,marketLength-7)+" M"}
                                  </TableCell>
                              </TableRow>
                          })
                        }
          </TableBody>
      </Table>
          </TableContainer>
          <div style={{textAlign:"center"}} className={classes.page}>
              <Pagination className={classes.pagination} onChange={fn1} style={{ width: "100%",margin:"auto"}} count={Math.ceil(table2.length/10)}/>
          </div>
  </Container>
  </ThemeProvider>
};
export default CryptoTable;
