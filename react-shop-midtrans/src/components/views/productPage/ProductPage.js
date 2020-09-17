import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container,Col,Row, Button
} from 'react-bootstrap';
import CartModal from './section/CartModal';


// action
import { connect } from "react-redux";
import { addToCartUser } from '../../../_actions/user_actions';
import { getAllProducts } from '../../../_actions/product_action';


const ProductPage = ({add, buy, addToCartUser, getAllProducts}) => {

    let history = useHistory()
    const [show, setshow] = useState(false)
    const [total, setTotal] = useState([])
    const [products, setProducts] = useState([])

    const handleClose = () => {
        setshow(false)
        
    }

    const handleProceed = () => {
        history.push('/transactions')
    }

    const addTotal = (name,ids,price) => {
        document.getElementById(ids).disabled = !show
        setshow(true)

        const data = {
            ids,
            name,
            price,
            unit:1
        }
        const myTotal = [...total, data]
        setTotal([...total, data])
        
        // redux
        addToCartUser(myTotal)
        
    }

    const addItemCart = (id) => {
        let newCart = total
        for(let i=0; i<total.length; i++){
            if(newCart[i].ids === id){
                newCart[i].unit += 1 
            }
        }

        console.log(newCart)
        setTotal(newCart)
        addToCartUser(newCart)
    }
    
    useEffect(() =>{
        getAllProducts()
            .then(res=>{
                setProducts(res.value)
            })
        
    },[getAllProducts, buy])

    return (
        <div>
            <h3 className='text-center my-4'>Movie Ready Stock</h3>
            <Container>
                <Row>
                {
                    products.map((item,index)=>{
                        return(                
                            
                            <Col xs={6} md={2} key={index} className='py-2 text-center'>
                                <img src={item.pic[0]} style={{width: 120, height: 170}} alt={index}/>
                                <div className='mt-2'>
                                <h6>$ {item.price}</h6>
                                <h6 style={{fontSize:12}}>{item.stock} units</h6>
                                    <Button variant="primary" onClick={() => addTotal(item.title, item._id, 1500) } id={item._id}>Add to Cart</Button>
                                </div>
                            </Col>
                            
                        )
                    })
                }
                </Row>
            </Container>
            <CartModal show={show} handleClose={handleClose} handleProceed={handleProceed} total={total} add={add} extra={addItemCart}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        add: state.addCart,
        product: state._getProducts,
        buy: state._buy
    };
};

export default connect(mapStateToProps, { addToCartUser, getAllProducts })(ProductPage);
