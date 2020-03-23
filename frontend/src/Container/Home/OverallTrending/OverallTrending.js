import React from 'react'
import Typography from '@material-ui/core/Typography'
import Cards from '../../../Components/Cards/Cards'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    root: {
      position: 'relative',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    gridContainer:{
      width: 'calc(100% - 24px)',
      margin: '-12px auto',
    },
    heading:{
      marginLeft: '24px',
      marginBottom: '24px',
    },
    media: {
      height: 140,
    },
  }));
const OverallTreanding =()=>{
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <Typography variant="h4" component="h4" className={classes.heading}>Most popular movies</Typography>
            <Cards></Cards>
        </div>
    )
}

export default OverallTreanding