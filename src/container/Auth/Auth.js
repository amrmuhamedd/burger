import React , {Component} from 'react';
import {connect } from 'react-redux';
import Input from '../../components/Ui/input/input';
import Button from '../../components/Ui/Button/Button';
import classes from './Auth.css';
import * as actionTypes from '../../store/actions/index'
import Spinner from '../../components/Ui/Spinner/Spinner';
import {Redirect} from 'react-router-dom'
import {updateObject ,checkValidity} from '../../shared/utility'
class Auth extends Component {
    state = {
        controls : {
            email : {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder :'mail Address'
                },
                value : '',
                validation : {
                    required :true,
                    isEmail : true
                },
                valid : false,
                touched : false
            },
           password : {
                elementType : 'input',
                elementConfig : {
                    type : 'password',
                    placeholder :'password'
                },
                value : '',
                validation : {
                    required :true,
                    minLength : 6
                },
                valid : false,
                touched : false
            },
        },
        formIsValid : false,
        isSignUp : true
    }
    componentDidMount(){
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath()
        }

    }
    inputChangedHandler = (event , inputIdentifier ) => {
       
       const updatedFormElement = updateObject(this.state.controls[inputIdentifier] ,{
        value  : event.target.value,
        valid: checkValidity(event.target.value  , this.state.controls[inputIdentifier].validation),
        touched : true
       })
       const updatedOrderForm = updateObject(this.state.controls , {
        [inputIdentifier] : updatedFormElement
       } );

          let formIsValid = true ;
          for (let inputIdentifier in updatedOrderForm){
              formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
          }
          this.setState({
              controls: updatedOrderForm,
              formIsValid : formIsValid
          })
  
      }

      onSubmitHandler = (event) => {
          event.preventDefault();
          this.props.onAuth(this.state.controls.email.value ,
             this.state.controls.password.value,
             this.state.isSignUp);
      }

     switchAuthModeHandler = () => {
         this.setState(prevState => {
             return {
                isSignUp : !prevState.isSignUp
             }
         })
     }
    render() {
        const formElementArray = [];
        for (let key in this.state.controls){
            formElementArray.push({
                id : key,
                config: this.state.controls[key]
            })
        }
        let form = (  
        <form onSubmit = {this.onSubmitHandler }>
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
            <Button btnType = 'Success' disabled = {!this.state.formIsValid} > submit </Button>
        </form>
        );
        if (this.props.loading){
            form = <Spinner />
        }
        let errorMessage = null;
        if (this.props.error){
            errorMessage =(
            <p style = {{color : ' red' }}>{this.props.error.message}</p>
           )
        }
        let authRedirect = null;
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to = {this.props.authRedirectPath} />
        }
        return (
            <div className = {classes.Auth}>
                {authRedirect}
                {errorMessage}
                {this.state.isSignUp ? <h1> sign up </h1> : <h1> sign in </h1>}
               {form}
               <Button btnType = "Danger" clicked = {this.switchAuthModeHandler}> switch to {this.state.isSignUp ? 'sign in' : 'sign up'}</Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth : (email , password , isSignup ) => dispatch(actionTypes.auth(email , password, isSignup)),
        onSetAuthRedirectPath : () => dispatch(actionTypes.authRedirect('/'))
    };
};

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.token !== null,
        buildingBurger : state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirectPath
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Auth);