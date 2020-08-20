import React , { Component } from 'react';
import Button from '../../../components/Ui/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios.order';
import Spinner from '../../../components/Ui/Spinner/Spinner';
import Input from '../../../components/Ui/input/input';
import {connect } from 'react-redux' ;
import withErorrHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionstype from '../../../store/actions/index';
import { updateObject , checkValidity } from '../../../shared/utility'
class ContactData extends Component {
    state = {
        orderForm : {
            name : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder :'your name'
                },
                value : '',
                validation : {
                    required :true,
                },
                valid : false,
                touched : false
            },
            country : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder :'your country'
                },
                value : '',
                validation : {
                    required :true,
                },
                valid : false,
                touched : false
            },
            street : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder :'your street'
                },
                value : '',
                validation : {
                    required :true,
                },
                valid : false,
                touched : false
            },
            email : {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder :'your email'
                },
                value : '',
                validation : {
                    required :true,
                    isEmail : true
                },
                valid : false,
                touched : false
            },
            zipcode : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder :'your zipcode'
                },
                value : '',
                validation : {
                    required :true,
                    minLength : 5,
                    maxLength : 8,
                    isNumeric: true
                },
                valid : false,
                touched : false
            },
            deliveryMethod : {
                elementType : 'select',
                elementConfig : {
                    options : [
                        {value : 'fastest', displayValue : 'fastest' },
                        {value : 'cheapest', displayValue : 'cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid : true,
            },
        },
        formIsValid : false
    }

    // handel form subimt  
    orderHandler = (e) => {
        e.preventDefault();
          
          const formData = {};
          for (let formElementIdentifier in this.state.orderForm){
              formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
          }

        const order = {
            ingredients : this.props.ings,
            price : this.props.totalPrice,
            orderData : formData,
            userId : this.props.userId
        };
      this.props.onOrderBurger(order , this.props.token);
    }
   //check validity of input 

    inputChangedHandler = (event , inputIdentifier ) => {
    
     const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier] , {
         value : event.target.value,
         valid : checkValidity(event.target.value  , this.state.orderForm[inputIdentifier].validation), 
         touched : true
     });

     const updatedOrderForm = updateObject(this.state.orderForm ,{
        [inputIdentifier] : updatedFormElement
      } )

       
        let formIsValid = true ;
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid : formIsValid
        })

    }
    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm){
            formElementArray.push({
                id : key,
                config: this.state.orderForm[key]
            })
        }
        let form = (  
        <form onSubmit = {this.orderHandler}>
            <h4> enter your contact Data </h4>
            {
                formElementArray.map(formElement => (
                    <Input 
                    key = {formElement.id}
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value ={formElement.config.value}
                    invalid = {!formElement.config.valid}
                    touched = {formElement.config.touched}
                    shouldValidat = {formElement.config.validation}
                    changed = {(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))
            }
            <Button btnType = 'Success' disabled = {!this.state.formIsValid}> order </Button>
        </form>
        );
        if (this.props.loading){
            form = <Spinner />
        }
        return(
            <div className = {classes.ContactData}>
              {form}
            </div>
        )
    }
}



const mapStateToProps = state => {
    return{
        ings : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    };
};
const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger : (orderData , token) => dispatch(actionstype.purchasingBurger(orderData , token))
    }
   }
export default connect(mapStateToProps , mapDispatchToProps)(withErorrHandler( ContactData, axios));