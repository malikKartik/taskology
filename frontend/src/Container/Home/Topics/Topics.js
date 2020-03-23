import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Topic from './Topic/Topic'
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles(theme => ({
    root: {
      position: 'relative',
    },
    heading:{
      marginLeft: '24px',
      marginBottom: '24px',
      marginTop: '50px',
    },
    gridContainer:{
        width: 'calc(100% - 24px)',
        margin: '-12px auto',
      },
  }));
const Topics = ()=>{
    const classes = useStyles()
    return(
        <div className={`home-topics ${classes.root}`}>
            <Typography variant="h4" component="h4" className={classes.heading}>Topics</Typography>
            <Grid container spacing={3} className={classes.gridContainer}>
            <Topic></Topic>
            <Topic></Topic>
            <Topic></Topic>
            <Topic></Topic>
            </Grid>
        </div>
    )
}

export default Topics
