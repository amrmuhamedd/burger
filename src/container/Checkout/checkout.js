import React , {Component} from 'react';
import CheckOutSummery from '../../components/Order/checkoutsummery/checkoutsummery'
import {Route , Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData'
import {connect } from 'react-redux';
class checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render() {
        let summery = <Redirect to = "/" />;
        

        if (this.props.ings) {
            const purchased = this.props.purchased ? <Redirect to = "/" /> : null ;
           summery = (
               <div>
                   {purchased}
                <CheckOutSummery 
                ingredients ={this.props.ings}
                checkoutCancelled = {this.checkoutCancelledHandler}
                checkoutContinued = {this.checkoutContinuedHandler}
                />
                <Route 
                path ={this.props.match.path + '/contact-data' }
                component = {ContactData} />
                </div>
            )
        }
        return (
            <div>
                {summery}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        ings : state.burgerBuilder.ingredients,
        purchased : state.order.purchased
        
    }
}
export default connect(mapStateToProps)(checkout) ;