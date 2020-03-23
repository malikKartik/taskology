import React from 'react'
import './Footer.css'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';

const Footer = ()=>{
    return(
        <div className="footer">
                <div className="footer-col1">
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Feedback</li>
                        <li>Reach us</li>
                    </ul>
                </div>
                <div className="footer-col2">
                    <ul>
                        <li>Website achitecture</li>
                        <li>Code</li>
                        <li>Technology stack</li>
                    </ul>
                </div>
                <div className="footer-col3">
                    <p>Made by Kartik Malik</p>
                    <h5>VIT, Vellore</h5>
                    <p>Reach me</p>
                    <p><a href="https://www.linkedin.com/in/kartik-malik-375254155/"><LinkedInIcon></LinkedInIcon></a> <a href="https://www.github.com/malikkartik"><GitHubIcon></GitHubIcon></a> <a href="https://www.instagram.com/kartik._malik/"><InstagramIcon></InstagramIcon></a></p>
                </div>
        </div>
    )
}

export default Footer