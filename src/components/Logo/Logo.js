 import React from 'react';

 import classes from './Logo.css'
 import burgerLogo from "../../assets/img/burger-logo.png"
 const logo = (props) => (
     <div className = {classes.Logo} style = {{height : props.height}}>
         <img src = {burgerLogo} alt ='my burger'/>
     </div>
 )
 export default logo;