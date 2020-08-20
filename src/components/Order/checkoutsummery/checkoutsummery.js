import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../Ui/Button/Button';
import classes from './Checkuotsummery.css'
const checkOutSummery = (props) => {
    return (
        <div className = {classes.CheckoutSummery}>
            <h1> we hope it tastes well </h1>
            <div style = {{width : '100%' , margin : 'auto'}}>
                <Burger ingredients = {props.ingredients} /> 
            </div>
            <Button  
            btnType = "Danger" 
            clicked = {props.checkoutCancelled} > CANCEL </Button>
            <Button  
            btnType = "Success"
            clicked = {props.checkoutContinued } >CONTENUE</Button>
        </div>
    )
}

export default checkOutSummery; 