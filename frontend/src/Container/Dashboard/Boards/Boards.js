import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover';
import axios from 'axios'
import useForceUpdate from 'use-force-update';
import './Boards.css'
import {
  Link
} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    Heading: {
      fontWeight:"600",
      marginBottom:"30px",
  },
  paper: {
    position:'relative',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
  },
  boardcontent:{
      position:'absolute',
      top:'50%',
      left:'50%',
      transform:'translate(-50%,-50%)',
  },
  Button: {
    textAlign: 'center',
    height: '100%',
    width: '100%',
  },
  Board:{
      height:'120px',
  }
}));

const Boards = ()=>{
    const classes = useStyles();
    const [boards,setBoards] = useState([])
    const forceUpdate = useForceUpdate();


    const getBoards = ()=>{
        axios.post('https://peaceful-anchorage-63634.herokuapp.com/boards', {
        Authorization:localStorage.getItem('authentication'),
        OwnerId:localStorage.getItem('_id')
        })
        .then(function (response) {
            console.log(response.data)
            setBoards(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    useEffect(()=>{
        getBoards()
    },[])


    const allBoards = (boards?boards.map((board)=>{
        return(
        <Grid className={classes.Board} item xs={4} id = {board._id}>
            <Link to={{
                pathname: '/board',
                state: {
                    boardId: board._id
                }
                }}>
            <Paper className={classes.paper}>
                <div className={classes.boardcontent}>
                    {board.name}
                </div>
            </Paper>
            </Link>
        </Grid>
        )
    }):"")


    const [addboard, setaddboard] = React.useState(null);

    const handleAddBoardClick = event => {
        setaddboard(event.currentTarget);
    };
    const handleCloseAddBoard = () => {
        setaddboard(null);
    };

    const open = Boolean(addboard);
    const id = open ? 'simple-popover' : undefined;

    const addBoardClick = ()=>{
        const boardname = document.getElementById('dashboard-addboard-boardname').value
        axios.post('https://peaceful-anchorage-63634.herokuapp.com/board', {
        Authorization:localStorage.getItem('authentication'),
        OwnerId:localStorage.getItem('_id'),
        name:boardname
        })
        .then(function (response) {
            console.log(response.data)
            setBoards([...boards,response.data])
            document.getElementById('dashboard-addboard-boardname').value = ""
            handleCloseAddBoard()
            forceUpdate();
        })
        .catch(function (error) {
            console.log(error);
        })
    }


    return(
        <div className="dashboard-boards">
            <Typography variant="h5" className={classes.Heading}>Boards</Typography>
            <Grid container spacing={2}>
                {allBoards}
                <Grid className={classes.Board} item xs={4}>
                    <Button variant='contained' className={classes.Button} aria-describedby={id} onClick={handleAddBoardClick}><AddIcon/></Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={addboard}
                        onClose={handleCloseAddBoard}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                    >
                        <input type="text" placeholder="Title of the board" id="dashboard-addboard-boardname"/><br/>
                        <center><Button variant='contained' color="primary" id="dashboard-addboard-btn" onClick={addBoardClick}><AddIcon/> Add board</Button></center>
                    </Popover>
                </Grid>
            </Grid>
        </div>
    )
}

export default Boards
