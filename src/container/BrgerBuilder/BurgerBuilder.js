import React , {Component} from 'react';
import Aux from '../../hoc/Ar';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/Ui/modal/modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import axios from '../../axios.order';
import Spinner from '../../components/Ui/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect } from 'react-redux';
import * as burgerBiulderAction from '../../store/actions/index';


class BurgerBuilder extends Component {
     state = {
         purchasing : false,
     }
     componentDidMount() {
         this.props.onInitIngredient();
     }
     updatPurchaseState (ingredients) {
         const sum = Object.keys(ingredients)
         .map(igKey => {
             return ingredients[igKey];
         })
         .reduce( (sum , el) => {
             return sum + el;
         },0);
         return sum > 0
     }
    purchaseHandler  = () => {
        if (this.props.isAuthenticated){
            this.setState({
                purchasing : true
            })
        } else {
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth')
        }
    }
    purchaseCancelHandler  = () => {
            this.setState({
                purchasing : false
            }) 
    }
    purchaseContenueHandler = () => {
        this.props.onOrderPurchased();
        this.props.history.push('/checkout');
    }
    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummery = null ;
        let burger = this.props.error ? <h2> can't load ingreidient </h2> : <Spinner />;
        
        if (this.props.ings ) {
            burger = (
                <Aux>
                <Burger ingredients = {this.props.ings} />
                <BuildControls 
                ingredientAdded = {this.props.onGredientAdded}
                ingredientRemoved = {this.props.onGredientRemoved}
                disabled = {disabledInfo}
                price = {this.props.totalPrice}
                purchasable = {this.updatPurchaseState(this.props.ings)}
                purchasing = {this.purchaseHandler}
                isAuth = {this.props.isAuthenticated}
                />
            </Aux>
            );
            orderSummery =   <OrderSummery 
            ingredients = {this.props.ings} 
            price = { this.props.totalPrice}
            purchaseCancel = {this.purchaseCancelHandler}
            purchaseContenue = {this.purchaseContenueHandler}
            /> 
        }
        return (
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler} >
                    {orderSummery}
                </Modal >
                 {burger}
            </Aux>
           
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGredientAdded : (ingName) => dispatch(burgerBiulderAction.addIngredient(ingName)),
        onGredientRemoved: (ingName) => dispatch(burgerBiulderAction.removeIngredient(ingName)),
        onInitIngredient : () => dispatch(burgerBiulderAction.initIngredients()),
        onOrderPurchased : () => dispatch(burgerBiulderAction.purchasedBurger()),
        onSetRedirectPath : (path) => dispatch(burgerBiulderAction.authRedirect(path))
    }
    
    }
    
    const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        totalPrice  : state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null,
        
    }}
export default connect(mapStateToProps , mapDispatchToProps) (withErrorHandler(BurgerBuilder , axios))