import React from 'react'
import './Login.css'
import axios from 'axios'
import { useHistory } from "react-router-dom";
const Login = ()=>{
    let history = useHistory();
    const loginClickHandler = () =>{
        axios.post('https://peaceful-anchorage-63634.herokuapp.com/users/login', {
            email: document.getElementById('email').value,
            password: document.getElementById('pass').value
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
        <div className="login-page">
            <div className="login-form">
                <h2>Login</h2>
                <input type="text" id="email" placeholder="Enter your email ID.."/><br/>
                <input type="password" id="pass"placeholder="Enter your password.."/><br/>
                <button onClick={()=>loginClickHandler()}>Login</button>
            </div>
        </div>
    )
}

export default Login