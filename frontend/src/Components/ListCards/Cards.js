import React,{useState,useEffect} from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import Popover from '@material-ui/core/Popover';
import useForceUpdate from 'use-force-update';
import './Cards.css'

const Cards = (props)=>{
    const forceUpdate = useForceUpdate()
    const [cards,setCards] = useState([])
    const getCards = ()=>{
        axios.post('https://peaceful-anchorage-63634.herokuapp.com/cardsonlist', {
        listId:props.listId
        })
        .then(function (response) {
            console.log(response.data)
            setCards(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    useEffect(()=>{
        getCards()
    },[])
    const allCards = (cards?cards.map((card)=>{
        return(
            <div id="board-list-card">
                <h4 className="card-description">{card.description}</h4>
            </div>
        )
    }):"")



    const [addcard, setaddcard] = React.useState(null);

    const handleAddCardClick = event => {
        setaddcard(event.currentTarget);
    };
    const handleCloseAddCard = () => {
        setaddcard(null);
    };

    const open = Boolean(addcard);
    const id = open ? 'simple-popover' : undefined;

    const addCardClick = ()=>{
        const duedate = document.getElementById('duedatepicker').value
        const carddesc = document.getElementById('dashboard-addcard-cardname').value
        axios.post('https://peaceful-anchorage-63634.herokuapp.com/card', {
        Authorization:localStorage.getItem('authentication'),
        OwnerId:localStorage.getItem('_id'),
        description:carddesc,
        listId:props.listId,
        duedate:duedate
        })
        .then(function (response) {
            console.log(response.data)
            setCards([...cards,response.data])
            document.getElementById('dashboard-addcard-cardname').value = ""
            handleCloseAddCard()
            forceUpdate();
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    return(
        <div className="baord-list-cards">
            {allCards}
            <Button variant="contained" color="primary" id="add-card-btn" aria-describedby={id} onClick={handleAddCardClick}><AddIcon/>Add Card</Button>
            <Popover
                        id={id}
                        open={open}
                        anchorEl={addcard}
                        onClose={handleCloseAddCard}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                    >
                        <input type="text" placeholder="Title of the list" id="dashboard-addcard-cardname"/><br/>
                        <div id="due-date-picker-container">
                        <TextField
                            id="duedatepicker"
                            label="Due Date"
                            type="date"
                            defaultValue="2020-05-24"
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        </div>
                        <center><Button variant='contained' color="primary" id="dashboard-addlist-btn" onClick={addCardClick}><AddIcon/></Button></center>
                    </Popover>
        </div>
    )
}

export default Cards