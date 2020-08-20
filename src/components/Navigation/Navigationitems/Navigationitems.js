import React from "react"
import classes from './NavigationItems.css'
import NavigationItem from './Navigationitem/Navigationitem'
const navigationItems = (props) => (
    <ul className = {classes.NavigationItems}>
       <NavigationItem link = "/" > Burger Builder </NavigationItem>
       {props.isAuthenticated ?  <NavigationItem link = "/orders"> orders </NavigationItem> : null}
     {!props.isAuthenticated ?  <NavigationItem link = "/auth"> Authentication </NavigationItem> : <NavigationItem link ="/logout"> log out</NavigationItem>}
    </ul>
)

export default navigationItems;