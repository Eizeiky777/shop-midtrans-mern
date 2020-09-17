import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Button, Container, Row, Col} from 'react-bootstrap';
import AddNewProducts from './section/add';
import UpdateProducts from './section/update';


// action
import { connect } from "react-redux";
import { getAllProducts, deleteProducts } from '../../../_actions/product_action';

const AdminPage = ({ getAllProducts,addproduct,updateproduct, deleteproduct, deleteProducts }) => {

    const [upd, setUpd] = useState(false)
    const [add, setAdd] = useState(false)
    const [products, setProducts] = useState([])

    // update state //
    const [_upd, set_Upd] = useState('')

    const submitUpdate = (ids) => {
        setUpd(!upd)
        set_Upd(ids)
    }

    const submitAdd = () => {
        setAdd(!add)
    }

    // delete inventory
    const submitDelete = (ids) =>{
        deleteProducts(ids).then(res=>{
            console.log(res.value)
        })
    }


    useEffect(() =>{
        getAllProducts()
            .then(res=>{
                setProducts(res.value)
            })
    },[getAllProducts,addproduct,updateproduct, deleteproduct])

    return (
        <>
            <div className='py-4'>

            <Container>
                <Row>
                    <Col xs={12} md={3}>
                        <div style={{width: '100%', marginBottom: 20}}>
                            <Link to='/admin/transactions'>
                                <Button variant='info' block >customer transaction</Button>
                            </Link>
                            <Button variant="primary" onClick={() => submitAdd() } block className="mt-2">add new product</Button>
                        </div>
                    </Col>
                    <Col md={6}></Col>
                    <Col xs={12} md={3}>
                        <div style={{width: '100%', marginBottom: 20}}>
                            <Link to='/admin/financial'>
                                <Button variant='success' block >financial report</Button>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={12} md={12}>
                        <h5 className='text-center py-3'>- STORE INVENTORY -</h5>
                    </Col>
                </Row>
                <Row>
                {
                    products.map((item,index)=>{
                        return(                
                            
                            <Col xs={6} md={3} lg={2} key={index} className='py-2 text-center'>
                                <img src={item.pic[0]} style={{width: 120, height: 170}} alt={index}/>
                                <div className='mt-2'>
                                <h6>$ {item.price}</h6>
                                <h6 style={{fontSize:12}}>{item.stock} units</h6>
                                    <Button variant="success" onClick={() => submitUpdate(item._id) } block>UPDATE</Button>
                                    <Button variant="danger" onClick={() => submitDelete(item._id) } block>DELETE</Button>
                                </div>
                            </Col>
                            
                        )
                    })
                }
                </Row>
            </Container>
            {
                <>
                <UpdateProducts show={upd} handleClose={submitUpdate} products={products} _upd={_upd} />
                <AddNewProducts show={add} handleClose={submitAdd} />
                </>
            }
            
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        product: state._getProducts,
        addproduct: state._addProducts,
        updateproduct: state._updateProducts,
        deleteproduct: state._deleteProducts
    };
};

export default connect(mapStateToProps, { getAllProducts, deleteProducts })(AdminPage);

