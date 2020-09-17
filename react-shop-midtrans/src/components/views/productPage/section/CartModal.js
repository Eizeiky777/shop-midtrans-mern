import React from 'react';
import {Button, Modal, Container, Row, Col} from 'react-bootstrap';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const CartModal = ({add, show, handleClose, handleProceed, extra }) => {

    var totalCart = 0;
    if(add.data.length){
        add.data.map((item) => {
            return(
                totalCart += item.price
            )
        })
    }
    
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className='text-center font-weight-bolder'>ORDER LIST</div>
                    <Container>
                        <Row>
                            <Col>
                                <div>{ add.data.length ? add.data.map((item,index) => {
                                        return (
                                            <div key={index} className="d-flex justify-content-between">
                                            <p >{item.unit} pcs {item.name} </p>
                                                <div>
                                                    <FaMinusCircle style={{color:'red', cursor:'pointer', marginRight:5}} />
                                                    <FaPlusCircle style={{color:'green', cursor:'pointer' }} onClick={() => extra(item.ids)}  />
                                                </div>
                                            </div>
                                        )
                                    }) : 'null' } 
                                </div>
                                <div className="text-right">Total Items: {add.data.length}</div>
                                <div className="text-right">Total Price: {
                                    totalCart.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })
                                }</div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Button variant="success" onClick={handleProceed}>
                    Proceed Now
                </Button>
            </Modal>
        </>
    );
}
    
export default CartModal;