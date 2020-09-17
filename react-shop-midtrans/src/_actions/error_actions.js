import { ERROR_CART } from "./constants";

export const errorCartUser = () => {
    return {
        type: ERROR_CART,
        payload: async () => {
            try {
                
                console.log('error item')
                return 
            } catch (error) {
                if (error.response) {
                const { data, status } = error.response;

                if (status > 399) throw data.error;
                }
            }
        },
    };
};

