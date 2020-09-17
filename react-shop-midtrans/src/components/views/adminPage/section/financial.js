import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Table, Container, Row, Col, Button } from 'react-bootstrap';


// connect - reducer
import { connect } from 'react-redux';
import { getAllTransactions } from '../../../../_actions/admin_auth_action';
import './financial.css';

// pagination
import PaginationTransactions from '../../../utils/pagination';

export const YEAR = [
    {month: "January", no:"01" },
    {month: "February", no:"02" },
    {month: "March", no:"03" },
    {month: "April", no:"04" },
    {month: "Mei", no:"05" },
    {month: "Juni", no:"06" },
    {month: "July", no:"07" },
    {month: "Agustus", no:"08" },
    {month: "September", no:"09" },
    {month: "Oktober", no:"10" },
    {month: "November", no:"11" },
    {month: "Desember", no:"12" }
]
export const getDaysInMonth = (month,year) => {
    // 0 is the last day number of month
    return new Date(year, month, 0).getDate();
};

const Financial = ({getAllTransactions, transaction}) => {

    var d = new Date()
    const [data, setData] = useState([]) 
    const [size, setSize] = useState("")
    const [no, setNo] = useState("09")
    
    const getAnnualMonth = (month) => {
        setNo(month)
        getAllTransactions(month).then(res=>{
            console.log(res.value)
            setData(res.value.result)
            setSize(res.value.size)
            
        })
    }

    const queryTransaction = (m,i,l=10) => {
        getAllTransactions(m,i,l).then(res=>{
            console.log(res.value.result)
            setData(res.value.result)
        })
    }


    useEffect(()=>{
        getAllTransactions().then(res=>{
            console.log(res.value.result)
            setData(res.value.result)
            setSize(res.value.size)
        })
    },[getAllTransactions])
    
    // console.log(data)
    // console.log(new Date("2020-09-11T09:04:11.368Z").toLocaleDateString())
    return (
        <>
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h1 className="text-center pt-4">{d.getFullYear()}</h1>
                            <div className="month text-center pt-2">
                                {
                                    YEAR.map((item,index)=>{
                                        return(
                                        <Button 
                                        key={index}
                                            variant={d.getMonth() === index ? "success" : "primary" } 
                                            onClick={() => getAnnualMonth(item.no)}
                                        >
                                            {item.month}
                                        </Button>
                                        )
                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div className="mt-5 d-flex w-100 justify-content-center">
                            <PaginationTransactions size={size} queryTransaction={queryTransaction} month={no} />
                        </div>
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                <th style={{width:40}}>No</th>
                                <th>Name</th>
                                <th>Items</th>
                                <th>Total Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                data.length !== 0 ? data.map((item,index) => {
                                    return( 
                                        <tr key={index} style={{position:'relative'}}>
                                                <td>{index+1}</td>
                                                <td>{item.user.name}</td>
                                                <td>
                                                <div>
                                                    {
                                                        item.product.map((prod,index)=>{
                                                            return(
                                                            <span key={index}>{prod.unit} pcs {prod.name}<br /> </span>
                                                            )
                                                        })
                                                    }
                                                    
                                                </div>
                                            </td>
                                            <td className="text-success">$ &nbsp;{item.data.gross_amount}</td>
                                        </tr>
                                    )
                                }) : 
                                
                                size !== "" ?
                                
                                (
                                    <tr>
                                        <td colSpan={4} className="text-center">No sales record for this month right now </td>
                                    </tr>
                                )   :

                                (
                                    <tr>
                                        <td colSpan={4} className="text-center">Loading ...</td>
                                    </tr>
                                )

                            }
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </div>
        </>
    )
}

///////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        transaction: state._transaction
    }
}

export default connect(mapStateToProps, { getAllTransactions })(Financial)

