import { ADD_TO_CART_USER, BUY_PRODUCTS } from "./constants";
import axios from "axios";


export const addToCartUser = (item) => {
    return {
        type: ADD_TO_CART_USER,
        payload: async () => {
            try {
                // const Deezer = await axios({
                //     "method":"GET",
                //     "url":"https://deezerdevs-deezer.p.rapidapi.com/search",
                //     "headers":{
                //         "content-type":"application/octet-stream",
                //         "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                //         "x-rapidapi-key":"1030f32ad3mshd6595aa1fc97cd5p1f921djsn1fb9290534e7",
                //         "useQueryString":true
                //         },
                //         "params":{
                //             "q":'michael jackson'
                //         }
                //     })
                //     .then((response)=>{
                //         return response
                //     })
                //     .catch((error)=>{
                //         console.log(error)
                //     })

                return item;
            } catch (error) {
                if (error.response) {
                const { data, status } = error.response;

                if (status > 399) throw data.error;
                }
            }
        },
    };
};

export const buyProducts = (item, len) => {
    return {
        type: BUY_PRODUCTS,
        payload: async () => {
            try {
                if( len === 0 ) return null
                
                const data= await axios.post('/buyproduct',item,{
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
                })
                
                
                return data.data.userresult
            } catch (error) {
                console.log({error:"empty list"})
            }
        },
    };
};

