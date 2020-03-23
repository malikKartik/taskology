import React,{useState} from 'react'
import './Dashboard.css'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Sidednav from './Sidenav/Sidenav'
import Home from './Home/Home'
import Boards from './Boards/Boards'
import Profile from './Profile/Profile'
import Connections from './Connections/Connections'
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    gridItem: {
        padding: theme.spacing(0),
      },
  }));
  
  
const Dashbaord = (props) =>{
    // axios.post('http://localhost:5000/board', {
    //   Authorization:localStorage.getItem('authentication'),
    //   OwnerId:localStorage.getItem('_id'),
    //   name:"Board1"
    // })
    // .then(function (response) {
    //     console.log(response.data)
    // })
    // .catch(function (error) {
    //     console.log(error);
    // })
    const [component,changeComponent] = useState("home")
    const renderComponent = () =>{
        if(component === "home"){
            return <Home/>
        }
        if(component === "boards"){
            return <Boards/>
        }
        if(component === "connections"){
            return <Connections/>
        }
        if(component === "profile"){
            return <Profile/>
        }
    }

    const classes = useStyles();
    return(
        <div className="dashboard">
            <Container maxWidth="md" style={{ backgroundColor: '#cfe8fc', height: '100vh',paddingTop:'40px' }}>
            <Grid container item xs={12} spacing={3}>
                <Grid item xs={4} className={classes.gridItem}>
                    <Sidednav homeClick={()=>changeComponent("home")}
                              boardsClick={()=>changeComponent("boards")}
                              profileClick={()=>changeComponent("profile")}
                              connectionsClick={()=>changeComponent("connections")}
                    />
                </Grid>
                <Grid item xs={8}>
                    {renderComponent()}
                </Grid>
            </Grid>

            </Container>
        </div>
    )
}

export default Dashbaord