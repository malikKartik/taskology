import React,{useState,useEffect} from 'react'
import './Board.css'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import Cards from '../../Components/ListCards/Cards'
import Popover from '@material-ui/core/Popover';
import useForceUpdate from 'use-force-update';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles(theme => ({
    Heading: {
      fontWeight:"600",
      marginBottom:"30px",
  },
  gridItem:{
    width:'100%',
    height:'fit content'
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
    height: '200px',
    width: '100%',
  },
  Board:{
      height:'200px',
  }
}));
const board = (props)=>{
    const forceUpdate = useForceUpdate()
    const classes = useStyles();
    const [lists,setLists] = useState([])
    const getLists = ()=>{
        axios.post('https://peaceful-anchorage-63634.herokuapp.com/listsonboard', {
        boardId:props.location.state.boardId
        })
        .then(function (response) {
            console.log(response.data)
            setLists(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    useEffect(()=>{
        getLists()
    },[])
    const allLists = (lists?lists.map((list)=>{
        return(
            <Grid className={classes.Board} item xs={12} key = {list._id}  spacing={3}>
                <div className="board-list">
                    <h4 className="list-heading">{list.name}</h4>
                    <hr/>
                    <Cards listId = {list._id}></Cards>
                </div>
            </Grid>
        )
    }):"")



    const [addlist, setaddlist] = React.useState(null);

    const handleAddListClick = event => {
        setaddlist(event.currentTarget);
    };
    const handleCloseAddList = () => {
        setaddlist(null);
    };

    const open = Boolean(addlist);
    const id = open ? 'simple-popover' : undefined;

    const addListClick = ()=>{
        const listname = document.getElementById('dashboard-addlist-listname').value
        axios.post('https://peaceful-anchorage-63634.herokuapp.com/list', {
        Authorization:localStorage.getItem('authentication'),
        OwnerId:localStorage.getItem('_id'),
        name:listname,
        boardId:props.location.state.boardId
        })
        .then(function (response) {
            console.log(response.data)
            setLists([...lists,response.data])
            document.getElementById('dashboard-addlist-listname').value = ""
            handleCloseAddList()
            forceUpdate();
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    return(
        <div className="board">
            <Container maxWidth="lg" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
            
            <div className="board-lists-grid">
                {allLists}
                <Grid className="board-list-button" item xs={12}>
                    <Button variant='contained' className="add-list-btn" aria-describedby={id} onClick={handleAddListClick}><AddIcon/></Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={addlist}
                        onClose={handleCloseAddList}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                    >
                        <input type="text" placeholder="Title of the list" id="dashboard-addlist-listname"/><br/>
                        <center><Button variant='contained' color="primary" id="dashboard-addlist-btn" onClick={addListClick}><AddIcon/> Add list</Button></center>
                    </Popover>
                </Grid>
            </div>
            
            </Container>
        </div>
    )
}

export default board