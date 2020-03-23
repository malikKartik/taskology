import React,{useState,useEffect} from 'react'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/button'
import './Profile.css'
import axios from 'axios'
const Profile = ()=>{
    const [data, setdata] = useState(null);
    const me = () =>{
        axios.post('https://peaceful-anchorage-63634.herokuapp.com/users/me', {
            _id:localStorage.getItem('_id'),
            Authorization:localStorage.getItem('authentication')
          })
          .then(function (response) {
            setdata({username:response.data.username,email:response.data.email})
          })
          .catch(function (error) {
            alert("some error occured");
          });
    }
    useEffect(()=>{
        me()
    },[])

    return(
        <div className="dashboard-profile">
            <Typography variant="h5">User</Typography>
            <Typography variant="subtitle1">Username: {(data?data.username:'')}</Typography>
            <Typography variant="subtitle1">Email: {(data?data.email:'')}</Typography>
            <br/>
            <Divider></Divider>
            <br/>
            <Typography variant="h5">Change password</Typography>
            <input type="password" className="textfield" id="old-password" placeholder="Old password"/><br/>
            <input type="password" className="textfield" id="new-password" placeholder="New password"/><br/>
            <Button variant="contained" color="secondary">Submit</Button>
        </div>
    )
}

export default Profile