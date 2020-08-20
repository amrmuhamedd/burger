import React , { Component } from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Ar';
import classes from './Layout.css'
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"
import Footer from '../../components/Ui/footer/footer'
class Layout extends Component{
    state = {
        showSideDrawer : false 
    }
    sideDrawerCloserHandler = () => {
        this.setState({showSideDrawer : false})
    }
    sideDrawerTogglerHandler = () => {
        this.setState(( prevState ) => {
           return{ showSideDrawer : !prevState.showSideDrawer}
        })
    }
render () {

    return(
        <Aux>
            <Toolbar 
            isAuth = {this.props.isAuthenticated}
            drowerTogglerClicked = {this.sideDrawerTogglerHandler}/>
            <SideDrawer 
            isAuth = {this.props.isAuthenticated}
            closed = {this.sideDrawerCloserHandler}
            open = {this.state.showSideDrawer}
            />
            <main className ={classes.content} >
                {this.props.children}
            </main>
            <Footer/>
       </Aux>
    )
}
}
   
const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);