import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      borderRadius: '6px',
      boxShadow: '0 0 5px rgba(0,0,0,0.5)',
    },
  }));

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
const Sidenav = (props)=>{
    const classes = useStyles();
    return(
        <div className="sidenav">
            <div className={classes.root}>
            <List component="nav" aria-label="application navigation">
                <ListItem button onClick={props.homeClick}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>

                <ListItem button onClick={props.boardsClick}>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Boards" />
                </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="personal navigation">
                <ListItem button onClick={props.profileClick}>
                    <ListItemIcon>
                        <PersonIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={props.connectionsClick}>
                    <ListItemIcon>
                        <GroupIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Connections" />
                </ListItem>
            </List>
            </div>
        </div>
    )
}

export default Sidenav