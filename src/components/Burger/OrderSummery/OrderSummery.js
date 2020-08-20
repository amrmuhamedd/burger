import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../Ui/Button/Button'
const orderSummery = (props) => {
    
    const ingredientSummery = Object.keys(props.ingredients)
    .map(igKey => {
        return (
        <li key = {igKey}> 
            <span style ={{textTransform : 'capitalize'}}>
                 {igKey} 
            </span> 
            : {props.ingredients[igKey]}
        </li>
            )
    })
    return(
        <Aux>
            <h3> your Order</h3>
            <p> A delicious burger with the following ingridient : </p>
            <ul>
                {ingredientSummery}
            </ul>
    <p><strong>price : {props.price.toFixed(1)}</strong></p>
            <p>contenue to checkout</p>
            <Button btnType = 'Danger' clicked = {props.purchaseCancel}> CANCEL </Button>
            <Button btnType = 'Success' clicked = {props.purchaseContenue}>CONTINUE</Button>
        </Aux>
    )
};
export default orderSummery;