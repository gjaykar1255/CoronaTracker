import React,{useState} from 'react'
import { BrowserRouter as Router,Routes,Link,Route} from 'react-router-dom'
import CoinPage from './Components/CoinPage/CoinPage';
import Header from './Components/Header/Header';
import Homepage from './Components/HomePage/HomePage';
import { LoginBox } from '../src/Components/UserTemplates/ToggleBar';
import { makeStyles } from "@material-ui/core";
const App = () => {
    const[currency,setCurrency]=useState('inr');
   const [show, setShow] = useState(false);
    const useStyles = makeStyles((theme) => ({
        main: {
            backgroundColor:'#14161a',
            color: 'white',
            minHeight:"100vh",
            maxHeight: show ? "600px" : "initial",
            overflow:show?"hidden":"visible",
            position:"relative",
        },
    }));
    const classes = useStyles();  
    const handleClick=(cur)=>{
        console.log(cur);
        setCurrency(cur);  
    }
    return ( 
        <div className={classes.main} >
            <Header show={show} setShow={setShow} currency={currency} handleClick={handleClick} />
            {show && <LoginBox show={show} setShow={setShow} />}
            <Router>
           <Routes>
               <Route path='/'element={<Homepage currency={currency}/>}/>
               <Route path='/coins/:id' element={<CoinPage currency={currency}/>}/>
           </Routes>
            </Router>
        </div>
    )
}

export default App
