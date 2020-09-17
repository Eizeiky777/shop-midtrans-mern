import { GET_ALL_TRANSACTIONS } from './constants';
import axios from 'axios';

export const getAllTransactions = (month,skip=0,limit=10) => {
    return {
        type: GET_ALL_TRANSACTIONS,
        payload: async () => {
            try {
                const { data } = await axios.get(`/alltransactions/${month}?pageNo=${skip}&size=${limit}`,{
                    headers: {"Authorization": "Bearer " + localStorage.getItem('token') }
                })
                
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