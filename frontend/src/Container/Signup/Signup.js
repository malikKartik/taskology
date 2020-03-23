import React from 'react'
import './Signup.css'
import axios from 'axios'
import { useHistory } from "react-router-dom";

const Signup = ()=>{
    let history = useHistory();
    const signupClickHandler = () =>{
        axios.post('https://peaceful-anchorage-63634.herokuapp.com/users', {
            email: document.getElementById('email').value,
            password: document.getElementById('pass').value,
            username: document.getElementById('username').value
          })
          .then(function (response) {
            localStorage.setItem('authentication',response.data.token)
            localStorage.setItem('_id',response.data.user._id)
            localStorage.setItem('friends',response.data.user.friends)
            history.push("/dashboard")
          })
          .catch(function (error) {
            alert("some error occured");
          });
    }
    return(
        <div className="signup-page">
            <div className="signup-form">
              <h2>Signup</h2>
                <input type="text" id="username" placeholder="Enter unique username"/><br/>
                <input type="text" id="email" placeholder="Email"/><br/>
                <input type="password" id="pass" placeholder="Password"/><br/>
                <button onClick={()=>signupClickHandler()}>Singup</button>
            </div>
        </div>
    )
}

export default Signup