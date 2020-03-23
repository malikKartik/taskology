import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Home from './Container/Home/Home'
import Footer from './Components/Footer/Footer'
import Login from './Container/Login/Login'
import Signup from './Container/Signup/Signup'
import Dashboard from './Container/Dashboard/Dashboard'
import Board from './Container/Board/Board'
import DragDrop from './Container/DragDrop/DragDrop'
import axios from 'axios'
const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    paddingTop: '80px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));
const App = ()=>{
  const classes = useStyles()
  const logoutHandler = ()=>{
    console.log(localStorage.getItem('token'))
    axios.post('https://peaceful-anchorage-63634.herokuapp.com/users/logoutall', {
      Authorization:localStorage.getItem('authentication')
    })
    .then(function (response) {
      console.log(response)
      localStorage.clear()
      window.location.href = './'
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return(
    <Router>
      <AppBar>
          <Toolbar>
            <Link to="/dashboard"><Button color="inherit">Dashboard</Button></Link>
            <Link to="/login"><Button color="inherit">Login</Button></Link>
            <Link to="/signup"><Button color="inherit">Signup</Button></Link>
            {/* <Link to="/account"><Avatar alt="Remy Sharp" src="/images/avatar.jpg" /></Link> */}
            <Button color="inherit" onClick={logoutHandler}>Logout</Button>
          </Toolbar>
        </AppBar>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/signup">
          <Signup/>
        </Route>
        <Route exact path="/dashboard">
          <Dashboard/>
        </Route>
        <Route exact path="/dragdrop">
          <DragDrop/>
        </Route>
        <Route path="/board" component={Board}/>
      </Switch>
      <Footer/>
    </Router>  
  )
}


export default App