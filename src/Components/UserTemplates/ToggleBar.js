import React,{useState} from 'react';
import {Paper,ThemeProvider,createTheme,Button,Box,Container,TextField,Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core'
import image from '../../images/index.png'
const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff"
        },
        type: "dark"
    }
})
const useStyles=makeStyles(()=>({
    btn:{
        width:"50%",
        paddingTop:"1.2rem",
        paddingRight:"0.2rem",
        paddingLeft:"0.2rem"
        ,"&:hover":{
            backgroundColor:"transparent"
        },
    },
    titles: {
        display: "flex",
    },
    container:{
        display:"flex",
        flexDirection:"column",
        marginTop:"1.5rem"
    },
    gap:{
        marginBottom:"1.3rem"
    },
    img:{
        padding:"0.12rem"
    },
    p:{
        "&:hover":{
            boxShadow: "0px 0px 3px  rgba(76,139,245)"
        }
    }
}))
const DetialsPage=({tap})=>{
    const classes=useStyles();
   var text="LOGIN";
   if(tap)text="LOGIN" 
   else text="SIGN UP"
   return <Container className={classes.container}>
       <TextField  className={classes.gap} id="outlined-basic" label="Enter Email" variant="outlined" />
       <TextField type="password" className={classes.gap} id="outlined-basic" label="Enter Password" variant="outlined" />
       {tap == false && <TextField type="password" className={classes.gap} id="outlined-basic" label="Confirm Password" variant="outlined" />}
       <Button  className={classes.gap} style={{backgroundColor:"gold",color:"black",padding:"0.58rem 0"}} variant="outlined">{text}</Button>
       <Typography variant='h6'  style={{textAlign:"center",marginBottom:"0.49rem"}}>OR</Typography>
       <Box className={classes.p} boxShadow={3} style={{ display: "flex", backgroundColor:"#4285F4"}}>
          <img width="52px" src={image} className={classes.img}/>
           <Box style={{display:"inline-block",flex:1,padding:"0.8rem 0",textAlign:"center"}}>
               <Typography>Sign in with Google</Typography>
           </Box>
       </Box>
   </Container>
}
const Login=(props)=>{
    const classes = useStyles();
    const [tap,setTap]=useState(true);
    return <Paper  style={{width:"400px",height:tap?"410px":"490px"}}>
        <Box className={classes.titles} boxShadow={5}>
            <Button onClick={() => setTap(true)}  style={{borderBottom:tap&&"2px solid red"}} className={classes.btn}>Login</Button>
        <Button onClick={()=>setTap(false)} style={{ borderBottom:tap==false && "2px solid red" }} className={classes.btn}>SIGN UP</Button>
        </Box>
        <DetialsPage tap={tap}/>
    </Paper>
}
export const LoginBox = (props) => {
    return <ThemeProvider  theme={darkTheme}>
        <Paper  style={{
            width: "100%",
            height: "100%",
           color:"white",
           position:"absolute",
            backgroundColor: "tranparent",
            zIndex: 2,display:"flex",
            justifyContent:"center",margin:"2.5rem 0",
        }}>
           <Login {...props}/>
        </Paper>
    </ThemeProvider>
};
export default LoginBox;
