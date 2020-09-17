import { ALL_PRODUCTS, ADD_PRODUCTS, UPDATE_PRODUCTS, DELETE_PRODUCTS } from "../_actions/constants";
import { ActionType } from "redux-promise-middleware";

const initialState = {
    data: {},
    loading: false,
    error: null,
};

const ALL_PRODUCTS_PENDING = `${ALL_PRODUCTS}_${ActionType.Pending}`;
const ALL_PRODUCTS_FULFILLED = `${ALL_PRODUCTS}_${ActionType.Fulfilled}`;
const ALL_PRODUCTS_REJECTED = `${ALL_PRODUCTS}_${ActionType.Rejected}`;

const ADD_PRODUCTS_PENDING = `${ADD_PRODUCTS}_${ActionType.Pending}`;
const ADD_PRODUCTS_FULFILLED = `${ADD_PRODUCTS}_${ActionType.Fulfilled}`;
const ADD_PRODUCTS_REJECTED = `${ADD_PRODUCTS}_${ActionType.Rejected}`;

const UPDATE_PRODUCTS_PENDING = `${UPDATE_PRODUCTS}_${ActionType.Pending}`;
const UPDATE_PRODUCTS_FULFILLED = `${UPDATE_PRODUCTS}_${ActionType.Fulfilled}`;
const UPDATE_PRODUCTS_REJECTED = `${UPDATE_PRODUCTS}_${ActionType.Rejected}`;

const DELETE_PRODUCTS_PENDING = `${DELETE_PRODUCTS}_${ActionType.Pending}`;
const DELETE_PRODUCTS_FULFILLED = `${DELETE_PRODUCTS}_${ActionType.Fulfilled}`;
const DELETE_PRODUCTS_REJECTED = `${DELETE_PRODUCTS}_${ActionType.Rejected}`;

export const getAllProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_PENDING:
        return {
            ...state,
            loading: true,
        };
        case ALL_PRODUCTS_FULFILLED:
        return {
            ...state,
            loading: false,
            data: action.payload,
        };
        case ALL_PRODUCTS_REJECTED:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
        default:
        return state;
    }
};

export const addProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCTS_PENDING:
        return {
            ...state,
            loading: true,
        };
        case ADD_PRODUCTS_FULFILLED:
        return {
            ...state,
            loading: false,
            data: action.payload,
        };
        case ADD_PRODUCTS_REJECTED:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
        default:
        return state;
    }
};

export const updateProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PRODUCTS_PENDING:
        return {
            ...state,
            loading: true,
        };
        case UPDATE_PRODUCTS_FULFILLED:
        return {
            ...state,
            loading: false,
            data: action.payload,
        };
        case UPDATE_PRODUCTS_REJECTED:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
        default:
        return state;
    }
};

export const deleteProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCTS_PENDING:
        return {
            ...state,
            loading: true,
        };
        case DELETE_PRODUCTS_FULFILLED:
        return {
            ...state,
            loading: false,
            data: action.payload,
        };
        case DELETE_PRODUCTS_REJECTED:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
        default:
        return state;
    }
};