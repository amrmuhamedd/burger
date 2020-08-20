import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigationitems/Navigationitems';
import classes from './SideDrawer.css';
import Backdrop from '../../Ui/Backdrop/Backdrop';
import Aux from '../../../hoc/Ar'
const sidedrawer = (props) => {
      let attachedClasses = [classes.SideDrawer , classes.Close];
      if (props.open) {
             attachedClasses = [classes.SideDrawer , classes.open]
      }
    return (
        <Aux>
            <Backdrop 
            show = {props.open} 
            clicked = {props.closed} />
        <div className = {attachedClasses.join(' ')} onClick ={props.closed}>
            <Logo height = "11%" />
            <nav>
                <NavigationItems isAuthenticated = {props.isAuth}/>
            </nav>
        </div>
        </Aux>
        
    );
}

export default sidedrawer;