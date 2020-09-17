import { ALL_PRODUCTS, ADD_PRODUCTS, UPDATE_PRODUCTS, DELETE_PRODUCTS } from "./constants";
import axios from "axios";


export const getAllProducts = () => {
    return {
        type: ALL_PRODUCTS,
        payload: async () => {
            try {
                const data = await axios.get('/allproduct')
                .then(function (res) {
                    return res.data.result;
                })
                .catch(function (error) {
                    return error
                })
                
                console.log(data)
                return data
            } catch (error) {
                console.log(error)
                
            }
        },
    };
};

export const addProducts = (item) => {
    return {
        type: ADD_PRODUCTS,
        payload: async () => {
            try {
                
                const data = await axios.post('/createproduct',item)
                .then(function (res) {
                    return res.data.result;
                })
                .catch(function (error) {
                    return error
                })
                console.log(data)
                return data
            } catch (error) {
                console.log(error)
                
            }
        },
    };
};

export const updateProducts = (item) => {
    return {
        type: UPDATE_PRODUCTS,
        payload: async () => {
            try {
                const data = await axios.put('/updateproduct',item)
                .then(function (res) {
                    return res.data.result;
                })
                .catch(function (error) {
                    return error
                })
                console.log(data)
                return data
            } catch (error) {
                console.log(error)
                
            }
        },
    };
};

export const deleteProducts = (ids) => {
    return {
        type: DELETE_PRODUCTS,
        payload: async () => {
            try {
                const data = await axios.delete('/deleteproduct/'+ids)
                .then(function (res) {
                    return res.data.result;
                })
                .catch(function (error) {
                    return error
                })
                console.log(data)
                return data
            } catch (error) {
                console.log(error)
                
            }
        },
    };
};


// {
//     headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjU1OTYxYmQxMmNmNTI1OTAzNGQ3MGIiLCJpYXQiOjE1OTk0NDQ2Mjl9.pLMqYv4TcGRAzGn4QoY-iCdCkIcEiZRUBB7VHw_wQAc'},
// }