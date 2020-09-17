import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { cartMiddleware } from "../_middleware";
import promise from "redux-promise-middleware";

// user //
import { addToCartUser, buyProducts } from './user_actions_red';

// products //
import { getAllProductsReducer, addProductsReducer, updateProductsReducer, deleteProductsReducer } from './product_actions_red';
import { authRegister, authLogin, authCheck } from './auth_actions_red';

// admin //
import { getAllTransactions } from './admin_actions_red';

// error
import { errorCartUser } from './error_actions_red';

const rootReducer = combineReducers({
    addCart: addToCartUser,

    _getProducts: getAllProductsReducer,
    _addProducts: addProductsReducer,
    _updateProducts: updateProductsReducer,
    _deleteProducts: deleteProductsReducer,

    _register: authRegister,
    _login: authLogin,
    _auth: authCheck,

    _buy: buyProducts,

    _transaction: getAllTransactions,

    errorCart: errorCartUser
});

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    storeEnhancers(applyMiddleware(cartMiddleware, promise))
);

export default store;

// NO ACTIONS, NO CONSTANT FOLDER IN HERE BROO , OJOK LALI 