import { GET_ALL_TRANSACTIONS } from "../_actions/constants";
import { ActionType } from "redux-promise-middleware";

const initialState = {
    data: {},
    loading: false,
    error: null,
};

const GET_ALL_TRANSACTIONS_PENDING = `${GET_ALL_TRANSACTIONS}_${ActionType.Pending}`;
const GET_ALL_TRANSACTIONS_FULFILLED = `${GET_ALL_TRANSACTIONS}_${ActionType.Fulfilled}`;
const GET_ALL_TRANSACTIONS_REJECTED = `${GET_ALL_TRANSACTIONS}_${ActionType.Rejected}`;

export const getAllTransactions = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TRANSACTIONS_PENDING:
        return {
            ...state,
            loading: true,
        };
        case GET_ALL_TRANSACTIONS_FULFILLED:
        return {
            ...state,
            loading: false,
            data: action.payload,
        };
        case GET_ALL_TRANSACTIONS_REJECTED:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
        default:
        return state;
    }
};

