import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Table, Container, Row, Col, Button } from 'react-bootstrap';

// connect - reducer
import { connect } from 'react-redux';
import { getAllTransactions } from '../../../../_actions/admin_auth_action';

// pagination
import PaginationTransactions from '../../../utils/pagination';
import './transaction.css';

const CheckTransactions = ({ transaction, getAllTransactions }) => {

    const [data,setData] = useState([])
    const [size,setSize] = useState(0)

    const queryTransaction = (m,i,l) => {
        
        getAllTransactions(m,i,l).then(res=>{
            setData(res.value.result)
        })
    }

    useEffect(()=>{
        getAllTransactions().then(res=>{
            
            setData(res.value.result)
            setSize(res.value.size)
        })
    },[getAllTransactions])


    return (
        <>
        <div className='my-5'>
            <Container>
                <Row>
                    <Col>
                        <div style={{width: 150, marginBottom: 50}}>
                            <Link to='/admin'>
                                <Button variant='info' block >Back</Button>
                            </Link>
                        </div>
                        <div className="d-flex justify-content-center">
                            <PaginationTransactions size={size} queryTransaction={queryTransaction}  />
                        </div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th style={{width:40}}>No</th>
                                <th>Name</th>
                                <th>Items</th>
                                <th>Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                data.length !== 0 ? data.map((item,index) => {
                                    return( 
                                        <tr key={index} style={{position:'relative'}}>
                                                <td>{index+1}</td>
                                                <td>{item.user.name}</td>
                                                <td id="detail-item">
                                                <div>
                                                    {
                                                        item.product.map((prod,index)=>{
                                                            return(
                                                                prod.name + ","
                                                            )
                                                        })
                                                    }
                                                    
                                                </div>
                                            </td>
                                            <td className="text-success">$ &nbsp;{item.data.gross_amount}</td>
                                        </tr>
                                    )
                                }) : (
                                    <tr>
                                        <td colSpan={4} className="text-center">Loading ...</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        transaction: state._transaction
    }
}

export default connect(mapStateToProps, { getAllTransactions })(CheckTransactions)
