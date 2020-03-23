import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import data from '../../Data/popular.json'

const useStyles = makeStyles(theme => ({
    root: {
      position: 'relative',
      paddingTop: '80px'
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



 
const Cards = ()=>{
    const classes = useStyles()
    const allCards = data.map(movie=>{
        
        return(
            <Grid item xs={3}>
            <Card>
                <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={movie.img}
                    title={movie.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    Intesteller
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {movie.desc}
                    </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
                </CardActions>
            </Card>
            </Grid>
        )
    })
    return(
        <div>
            <Grid container 
            spacing={3}
            direction="row"
            justify="space-around"
            className={classes.gridContainer}>
                {allCards}
            </Grid>
        </div>
    )
}

export default Cards