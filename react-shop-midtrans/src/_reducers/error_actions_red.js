import { ERROR_CART} from "../_actions/constants";
import { ActionType } from "redux-promise-middleware";

const initialState = {
    data: {},
    loading: false,
    error: null,
};

const ERROR_CART_PENDING = `${ERROR_CART}_${ActionType.Pending}`;
const ERROR_CART_FULFILLED = `${ERROR_CART}_${ActionType.Fulfilled}`;
const ERROR_CART_REJECTED = `${ERROR_CART}_${ActionType.Rejected}`;

export const errorCartUser = (state = initialState, action) => {
    switch (action.type) {
        case ERROR_CART_PENDING:
        return {
            ...state,
            loading: true,
        };
        case ERROR_CART_FULFILLED:
        return {
            ...state,
            loading: false,
            data: 'action.payload',
        };
        case ERROR_CART_REJECTED:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
        default:
        return state;
    }
};

