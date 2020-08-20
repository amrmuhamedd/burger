import React, { Component } from 'react';
import Layout from './container/Layout/Layout';
import BurgerBuilder from './container/BrgerBuilder/BurgerBuilder';
import {Route, Switch , Redirect } from 'react-router-dom';
import Logout from './container/Auth/logout/logout';
import { connect } from 'react-redux';
import * as action from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asynicCheckout = asyncComponent(() => {
  return import('./container/Checkout/checkout')
});

const asynicOrder = asyncComponent(() => {
  return import('./container/Orders/Orders')
});

const asynicAuth = asyncComponent(() => {
  return import('./container/Auth/Auth')
});


class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup()
  }
  render() {
    let routs = (
      <Switch>
      <Route path = "/auth" component = {asynicAuth} />
      <Route path = "/" exact component = {BurgerBuilder} />
      <Redirect to ="/" />
      </Switch>
    )
    if (this.props.isAuthenticated){
     routs = ( 
     <Switch>
       <Route path = "/auth" component = {asynicAuth} />
     <Route path = "/orders" component = {asynicOrder} />
      <Route path = "/logout" component = {Logout} />
      <Route path = "/"  exact component = {BurgerBuilder} />
      <Route path = "/checkout" component = {asynicCheckout} />
      <Redirect to ="/" />
      </Switch>
      )
    }
    return (
      <div className="App">
       <Layout>
      {routs}
       </Layout>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup : () => dispatch(action.authCheckState())
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token !==null
  }
}
export default connect(mapStateToProps , mapDispatchToProps)(App);
