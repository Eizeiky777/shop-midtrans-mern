import { ADD_TO_CART_USER, BUY_PRODUCTS } from "../_actions/constants";
import { ActionType } from "redux-promise-middleware";

const initialState = {
    data: {},
    loading: false,
    error: null,
};

const ADD_TO_CART_USER_PENDING = `${ADD_TO_CART_USER}_${ActionType.Pending}`;
const ADD_TO_CART_USER_FULFILLED = `${ADD_TO_CART_USER}_${ActionType.Fulfilled}`;
const ADD_TO_CART_USER_REJECTED = `${ADD_TO_CART_USER}_${ActionType.Rejected}`;

const BUY_PRODUCTS_PENDING = `${BUY_PRODUCTS}_${ActionType.Pending}`;
const BUY_PRODUCTS_FULFILLED = `${BUY_PRODUCTS}_${ActionType.Fulfilled}`;
const BUY_PRODUCTS_REJECTED = `${BUY_PRODUCTS}_${ActionType.Rejected}`;

export const buyProducts = (state = initialState, action) => {
    switch (action.type) {
        case BUY_PRODUCTS_PENDING:
        return {
            ...state,
            loading: true,
        };
        case BUY_PRODUCTS_FULFILLED:
        return {
            ...state,
            loading: false,
            data: action.payload,
        };
        case BUY_PRODUCTS_REJECTED:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
        default:
        return state;
    }
};

export const addToCartUser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART_USER_PENDING:
        return {
            ...state,
            loading: true,
        };
        case ADD_TO_CART_USER_FULFILLED:
        return {
            ...state,
            loading: false,
            data: action.payload,
        };
        case ADD_TO_CART_USER_REJECTED:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
        default:
        return state;
    }
};
