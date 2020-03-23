import React,{useState,useEffect} from 'react'
import './Connections.css'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import axios from 'axios'
import useForceUpdate from 'use-force-update';
const Connections = ()=>{
    const [searchResults,setSearchResults] = useState(null)
    const [friends,setFriends] = useState([])
    const forceUpdate = useForceUpdate()

    const friendlist = () =>{
        
        axios.post('https://peaceful-anchorage-63634.herokuapp.com/user/getfriends', {
            _id:localStorage.getItem('_id')
          })
          .then(function (response) {
            setFriends(response.data)
            forceUpdate()
          })
          .catch(function (error) {
              console.log(error)
            alert("some error occured");
          });
    }
    useEffect(() => {
        friendlist()
        
    }, []);
    const addFriend = (_id,username) =>{
        console.log({
            _id:localStorage.getItem('_id'),
            friendId:_id,
            username:username,
          })
        axios.post('https://peaceful-anchorage-63634.herokuapp.com/user/addfriend', {
            _id:localStorage.getItem('_id'),
            friendId:_id,
            username:username,
          })
          .then(function (response) {
            document.getElementById('user-to-search').value==''
            console.log(response)
            setFriends([...friends,response.data])
            forceUpdate()
          })
          .catch(function (error) {
              console.log(error)
            alert("some error occured");
          });
    }

    const serachUser = () =>{
        const toSearch = document.getElementById('user-to-search').value
        axios.post('https://peaceful-anchorage-63634.herokuapp.com/username', {
            username:toSearch
          })
          .then(function (response) {
            console.log(response)
            setSearchResults(response.data)
            document.getElementById('user-to-search').value==''
            forceUpdate()
          })
          .catch(function (error) {
            alert("some error occured");
          });
    }
    // const displayFriends = (friends.length>0?friends.map((friend)=>{
    //     return(
    //         <div>
    //             {friend}
    //         </div>
    //     )
    // }):'')
    const displayFriends = (friends.length>0?friends.map((friend)=>{
        return(
            <div className="friend-list">
                <div className="friend">{friend.username}</div>
            </div>
        )
    }):"")
    return(
        <div className="dashboard-connections">
            <Typography variant="h5">Search user</Typography>
            <input type="text" className="textfield" id="user-to-search"/>
            <Button variant="contained" color="primary" onClick={serachUser}>Search</Button>
            {(searchResults?(<div className="searched-user">
                <div className="serached-user-name">{searchResults.username}</div>
                <Button className="add-serached-user" onClick={()=>addFriend(searchResults._id,searchResults.username)}><AddIcon/></Button>
            </div>):
            '')}
            <Typography variant="h5">Friend list</Typography>
            {displayFriends}
            {console.log(friends)}
        </div>
    )
}

export default Connections