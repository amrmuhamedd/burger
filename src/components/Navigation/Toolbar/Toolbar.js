import React from 'react';

import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../Navigationitems/Navigationitems';
import DrowerToggeler from '../SideDrawer/DrawerToggeler/DrawerToggeler'
const toolbar = (props) => (
    <header className ={classes.Toolbar}>
        <DrowerToggeler clicked = {props.drowerTogglerClicked} />
        <Logo height = "70%"/>
        <nav className = {classes.Disktoponly}>
            <NavigationItems isAuthenticated =  {props.isAuth } />
        </nav>
    </header>
)
export default toolbar;