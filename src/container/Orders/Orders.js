import React , { Component } from 'react';
import Order from '../../components/Order/order';
import axios from '../../axios.order';
import withErorrHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from  '../../store/actions/index';
import {connect } from 'react-redux';
import Spinner from '../../components/Ui/Spinner/Spinner';

class Orders extends Component {
    componentDidMount () {
       this.props.onFetchOrder(this.props.token , this.props.userId);
    }
    render(){
        let orders = <Spinner />
        if (this.props.orders.length > 0){
            orders =  this.props.orders.map(order => (
                <Order 
                key = { order.id }
                ingredients = {order.ingredients}
                price = {order.price}
                />
            ))
        }
        return (
            <div>
              {orders}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrder : (token , userId) => dispatch(actions.fetchOrder(token , userId))
    };
};

const mapStateToProps = (state) => {
    return {
        orders : state.order.orders,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    };
};
export default connect(mapStateToProps , mapDispatchToProps )(withErorrHandler( Orders , axios));