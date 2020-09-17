import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// redux - connect
import { connect } from 'react-redux';
import { buyProducts, addToCartUser } from '../../../_actions/user_actions';



const TransactionPage = ({add, buyProducts, addToCartUser}) => {
    let history = useHistory()
    const [dataX, setDataX] = useState()

    var totalCart = 0;
    var totalUnit = 0;
    if(add.data.length){
        add.data.map((item) => {
            return(
                totalCart = totalCart + item.price * item.unit
            )
        })
    }
    if(add.data.length){
        add.data.map((item) => {
            return(
                totalUnit += item.unit
            )
        })
    }
    
    const submitBack = () => {
        // history.push('/')
        const trans = {
            snaps:'pay',
            items:add.data
        }
        buyProducts(trans, add.data.length)
    }

    const submitNow = (pay) => {   
        const trans = {
            snaps:pay,
            items:add.data
        }
        // redux
        buyProducts(trans, add.data.length)
    }

    useEffect(() => {
        if(dataX){
            submitNow(dataX)
            history.push('/')
            addToCartUser([])
        }
    }, [dataX,addToCartUser,history])

    const submitPayment = () => {
        
        axios.get(`/simple_checkout/${totalCart}`)
            .then(function (res) {
                console.log(res.data.token)
                // setMytoken(res.data.token)
                window.snap.pay(res.data.token, {
                    // Optional
                    onSuccess: function(result){
                        setDataX(result)
                    },
                    // Optional
                    onPending: function(result){
                        console.log(result)
                        submitNow(result)
                    },
                    // Optional
                    onError: function(result){
                        console.log(result)
                    }
                });
            })
            .catch(function (error) {
                return error
            })
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{textAlign:'center'}} className='py-4'>
                            <h4>List Items</h4>
                        </div>
                        <div >
                            {
                                
                                Object.keys(add.data).length ? add.data.map((item,index) => {
                                    return(
                                        <div key={index} className='d-flex justify-content-between '>  
                                            {

                                            }
                                            <h5>{item.unit} pcs {item.name}</h5>
                                            <h5>$ {item.price * item.unit}</h5>
                                        </div>
                                    )
                                }) : null
                            }
                        </div>
                        <div className='d-flex justify-content-between mt-4 '>
                            <h5>total items: {totalUnit}</h5>
                            <div>
                            <h5>total price :  &nbsp; ${totalCart}</h5>
                            </div>
                        </div>
                    </Col>
                </Row>
                <hr/>
                <Row className='my-5'>
                    <Col xs={12} md={4} >
                    </Col>
                    <Col xs={12} md={4} >
                        <Button variant='success' onClick={() => submitPayment()} block>Pay Now</Button>
                        <Button variant='danger' onClick={() => submitBack()}  block >Cancel</Button>
                    </Col>
                    <Col xs={12} md={4} >
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        add: state.addCart,
        buy: state._buy
    };
};

export default connect(mapStateToProps, { buyProducts, addToCartUser })(TransactionPage);

