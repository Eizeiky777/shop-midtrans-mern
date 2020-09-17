import {ADD_TO_CART_USER} from '../_actions/constants';


export const cartMiddleware = ({ dispatch }) => {
    return (next) => {
        return (action) => {
            // do your stuff
            if (action.type === ADD_TO_CART_USER) {
                // console.log('at middleware add to cart user')
                
                // return dispatch({type: 'error_cart'})
                // if (foundWord.length) return dispatch({ type: "FOUND_BAD_WORD" });
            }
            return next(action);
        };
    };
};