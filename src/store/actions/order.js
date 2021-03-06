import * as actionTypes from './actiontyps';
import axios from '../../axios.order';



export const purchaseBurgerSuccess = (id , orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL, 
        error : error
    };
};
export const purchasingBurgerStart = () => {
    return{
        type : actionTypes.PURCHASE_BURGER_START
    }
}
export const purchasingBurger = (orderData , token) => {
    return dispatch => {
        dispatch(purchasingBurgerStart());
        axios.post('/orders.json?auth=' + token  , orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name , orderData))
        }
        
        )
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        }
        )
    }
}
export const purchasedBurger = () => {
    return{
        type : actionTypes.PURCHASED_BURGER
        
    }
}


export const fetchOrdersSuccess = (orders) => {
    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders : orders
    }
}


export const fetchOrdersFail = (error) => {
    return {
        type : actionTypes.FETCH_ORDERS_FAIL,
       error : error
    }
}

export const fetchOrderStart = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_START
    }
}

export const fetchOrder = (token , userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id : key,
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        }).catch(err => {
           dispatch(fetchOrdersFail(err))
        })
    }
    
} 