import { AUTH_REGISTER, AUTH_LOGIN, AUTH_CHECK } from "../_actions/constants";
import { ActionType } from "redux-promise-middleware";

const initialState = {
    data: {},
    loading: false,
    error: null,
};

const initialState2 = {
    data: {},
    loading: false,
    error: null,
};

const AUTH_REGISTER_PENDING = `${AUTH_REGISTER}_${ActionType.Pending}`;
const AUTH_REGISTER_FULFILLED = `${AUTH_REGISTER}_${ActionType.Fulfilled}`;
const AUTH_REGISTER_REJECTED = `${AUTH_REGISTER}_${ActionType.Rejected}`;

const AUTH_LOGIN_PENDING = `${AUTH_LOGIN}_${ActionType.Pending}`;
const AUTH_LOGIN_FULFILLED = `${AUTH_LOGIN}_${ActionType.Fulfilled}`;
const AUTH_LOGIN_REJECTED = `${AUTH_LOGIN}_${ActionType.Rejected}`;

const AUTH_CHECK_PENDING = `${AUTH_CHECK}_${ActionType.Pending}`;
const AUTH_CHECK_FULFILLED = `${AUTH_CHECK}_${ActionType.Fulfilled}`;
const AUTH_CHECK_REJECTED = `${AUTH_CHECK}_${ActionType.Rejected}`;


export const authRegister = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REGISTER_PENDING:
        return {
            ...state,
            loading: true,
        };
        case AUTH_REGISTER_FULFILLED:
        return {
            ...state,
            loading: false,
            data: action.payload,
        };
        case AUTH_REGISTER_REJECTED:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
        default:
        return state;
    }
};

export const authLogin = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN_PENDING:
        return {
            ...state,
            loading: true,
        };
        case AUTH_LOGIN_FULFILLED:
        return {
            ...state,
            loading: false,
            data: action.payload,
        };
        case AUTH_LOGIN_REJECTED:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
        default:
        return state;
    }
};

export const authCheck = (state = initialState2, action) => {
    switch (action.type) {
        case AUTH_CHECK_PENDING:
        return {
            ...state,
            loading: true,
        };
        case AUTH_CHECK_FULFILLED:
        return {
            ...state,
            loading: false,
            data: action.payload,
        };
        case AUTH_CHECK_REJECTED:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
        default:
        return state;
    }
};
