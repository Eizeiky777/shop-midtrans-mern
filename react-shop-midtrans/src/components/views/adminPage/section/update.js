import React, {useState} from 'react';
import {Form, Button, Container, Row, Col, Modal} from 'react-bootstrap';

// action - redux
import { connect } from "react-redux";
import { updateProducts } from '../../../../_actions/product_action';

const UpdateProducts = ({show, handleClose, products, _upd, updateProducts}) => {

    const [title, setTitle] = useState(null)
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState([])

    const onSubmitData = () => {
        let arr = []
        // const _item = products.filter(item => item._id === _upd )
        const data = new FormData()
        for(var x = 0; x<image.length; x++) {
            data.append("file", image[x])
            data.append("upload_preset", "midtrans_888")
            data.append("cloud_name", "dzrhkpwph")
            fetch("https://api.cloudinary.com/v1_1/dzrhkpwph/image/upload", {
                method:"post",
                body:data
            })
            .then(res => res.json())
            .then(data => {
                arr.push(data.url)
                if(arr.length === image.length){
                    const newData = {
                        productId:_upd,
                        title,
                        price,
                        stock,
                        pic:arr,
                        description
                    }
                    updateProducts(newData).then(res=>{
                        console.log(res.value)
                        handleClose()
                    })
                }
            })
            .catch(err => {
                console.log(err)
                return
            })
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col md={12}>
                                <div>
                                    <h4 className='text-center my-4'>Update Products</h4>
                                    <Form>
                                        <Form.Group controlId="exampleForm.ControlInput1" >
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control type="text" placeholder="title here" onChange={(e) => setTitle(e.target.value)}/>
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control type="number" onChange={(e) => setPrice(e.target.value)}/>
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Stock</Form.Label>
                                            <Form.Control type="number" onChange={(e) => setStock(e.target.value)}/>
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Image</Form.Label>
                                            <Form.Control type="file" multiple onChange={(e) => setImage(e.target.files)}/>
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows="3" placeholder="add description" type="text" onChange={(e) => setDescription(e.target.value)}/>
                                        </Form.Group>
                                    </Form>
                                    <Button variant='success' className='mb-3' block onClick={() => onSubmitData()}>ADD NOW</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
            
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        product: state._updateProducts
    };
};

export default connect(mapStateToProps, { updateProducts })(UpdateProducts);