import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form,Button,Container,Row,Col } from 'react-bootstrap';

// connect - redux
import { connect } from 'react-redux';
import { authSignUp } from '../../../_actions/auth_actions';

const SignUp = ({ authSignUp }) => {

    let history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitSignUp = () => {
        const data = {
            name,
            email,
            password
        }
        
        authSignUp(data).then(res=>{
            console.log(res)
            history.push('/signin')
        })
    }

    return (
        <>
            <div>
                <Container>
                    <h3 className='text-center pt-5 pb-3 font-weight-bold'>SIGNUP</h3>
                    <Row>
                        <Col md={3}></Col>
                        <Col xs={12} md={6} lg={6}>
                            <Form>
                            <Form.Group controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                                    <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check me out" />
                                </Form.Group>
                                <Button variant="primary" onClick={() => submitSignUp()} block>
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                        <Col md={3}></Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        register: state._register
    };
};

export default connect(mapStateToProps, { authSignUp })(SignUp);