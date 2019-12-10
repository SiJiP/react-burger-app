import { put } from 'redux-saga/effects'

import axios from "../../axios-orders";
import * as actions from "../actions/index";


export function* purchaseBurgerSaga(action){
    put(actions.purchaseBurgerStart());
    try{
        const response = yield axios.post("/orders.json?auth=" + action.token, action.orderData)
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    }catch(err){
        yield put(actions.purchaseBurgerFail(err));
    }
}

export function* fetchOrdersSaga(action){
    put(actions.fetchOrderStart());
    try{
        const queryParams = yield `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
        const response = yield axios.get(`/orders.json${queryParams}`);
        const fetchedOrders = yield Object.keys(response.data).reduce((accum, keyId) => {
                return [...accum, { ...response.data[keyId], id: keyId }];
              }, []);
              yield put(actions.fetchOrderSuccess(fetchedOrders));
            
    }catch(err){
        yield put(actions.fetchOrderFail(err));
    }
}