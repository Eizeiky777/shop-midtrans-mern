import { AUTH_REGISTER, AUTH_LOGIN, AUTH_CHECK } from './constants';
import axios from 'axios';

export const authSignUp = (item) => {
    return {
        type: AUTH_REGISTER,
        payload: async () => {
            try {
                const { data } = await axios.post('/signup',item)
                
                return data
            } catch (error) {
                if (error.response) {
                const { data, status } = error.response;

                if (status > 399) throw data.error;
                }
            }
        },
    };
};

export const authSignIn = (item) => {
    return {
        type: AUTH_LOGIN,
        payload: async () => {
            try {
                const { data } = await axios.post('/signin',item)
                
                return data
            } catch (error) {
                if (error.response) {
                const { data, status } = error.response;

                if (status > 399) throw data.error;
                }
            }
        },
    };
};

export const authCheck = () => {
    return {
        type: AUTH_CHECK,
        payload: async () => {
            try {

                if(localStorage.getItem('token')){
                    const { data } = await axios.get('/usercheck',{
                        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token') }
                    })
                    
                    return data
                }else{
                    let message = false
                    return message
                }

                
            } catch (error) {
                if (error.response) {
                const { data, status } = error.response;

                if (status > 399) throw data.error;
                }
            }
        },
    };
};


