import React, {useState} from 'react';
import { Pagination } from 'react-bootstrap';


const PaginationTransactions = ({size, queryTransaction, month}) => {
    
    const [number, setNumber] = useState(5)
    const [start, setStart] = useState(1)
    const [active, setActive] = useState(1)

    
    let items = []

    for (let i = start; i <= Math.round(size/10); i++) {
        items.push(
                <Pagination.Item key={i} active={i === active} onClick={() => {
                    setActive(i)
                    queryTransaction(month,(i-1)*10,10)
                }} >
                    {i}
                </Pagination.Item>,
            );  
    }

    return (
        <>  
            <Pagination>
                <Pagination.Prev onClick={() => {
                    setNumber(5)
                    setStart(1)
                }} />
                    {items}
                    <Pagination.Ellipsis 
                        onClick={() => {
                            setNumber(number+5)
                            setStart(start+5)
                        }}
                        disabled={number === size ? true : false}
                    />
                    <Pagination.Item onClick={() => {
                        setNumber(size)
                        setStart(size-5)
                    }}> last </Pagination.Item>
                <Pagination.Next />
            </Pagination>
        </>
    )

}

export default PaginationTransactions;