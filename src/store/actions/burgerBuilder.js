import * as actionTypes from './actiontyps';
import axios from '../../axios.order';
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName : name
    };
};
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName : name
    };
};
export const setIngredient = (ingredients) => {
    return {
        type : actionTypes.SET_INGREDIENTS,
        ingredients : ingredients
    };
};
export const fetchIngredientsFailed = () => {
    return{
        type : actionTypes.FETCH_INGREIDIENTS_FAILD
    };
};
export const initIngredients = () =>  {
    return dispatch => {
        axios.get('https://react-burger-137e8.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredient(response.data))
        }).catch(error => {
           dispatch(fetchIngredientsFailed())
        });
    };
};