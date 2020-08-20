import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
const controls = [
    {label : 'Salad'  , type : 'salad'},
    {label : 'Bacon'  , type : 'bacon'},
    {label : 'Cheese' , type : 'cheese'},
    {label : 'Meat'   , type : 'meat'},
]
const buildControls = (props) => (
    <div className ={classes.BuildControls}>
        <p> price is : <strong>{ props.price.toFixed(1) }</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key = {ctrl.label}
            label = {ctrl.type}
            added = {() => props.ingredientAdded(ctrl.type)}
            removed = {() => props.ingredientRemoved(ctrl.type)}
            disabled = {props.disabled[ctrl.type]}
             />
        ))}
        <button 
        className = {classes.OrderButton}
        disabled = {!props.purchasable}
        onClick ={props.purchasing}
        > {props.isAuth ? 'ORDER NOW' : 'sign up to order' } </button>
    </div>
);
export default buildControls;