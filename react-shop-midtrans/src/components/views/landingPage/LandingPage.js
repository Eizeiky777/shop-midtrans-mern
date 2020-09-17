import React from 'react'
import { Carousel,Container,Col,Row 
} from 'react-bootstrap';
import Movies from '../../images';
import ProductPage from '../productPage/ProductPage';


const LandingPage = () => {
    return (
        <>
        <div>
            <h3 className='text-center my-4'>NEW MOVIE EVERYDAY</h3>
            <Container>
                <Row>
                    <Col xs={12} md={12}>
                        <Carousel className="mb-5 mt-1">
                        {
                            Movies.map((item,index) => {
                                
                                return( 
                                    <Carousel.Item key={index} className='text-center'>
                                        <img
                                        className="my-2 mx-1"
                                        src={Movies[Math.floor(Math.random() * Movies.length)].image}
                                        alt="First slide"
                                        style={{width: 300, height: 400}}
                                        />
                                        <img
                                        className="my-2 mx-1"
                                        src={Movies[Math.floor(Math.random() * Movies.length)].image}
                                        alt="First slide"
                                        style={{width: 300, height: 400}}
                                        />
                                        <img
                                        className="my-2 mx-1"
                                        src={Movies[Math.floor(Math.random() * Movies.length)].image}
                                        alt="First slide"
                                        style={{width: 300, height: 400}}
                                        />
                                    </Carousel.Item>
                                )
                            })
                        }
                        </Carousel>
                    </Col>
                </Row>
            </Container>
        </div>
        <ProductPage />
        </>
    )
}

export default LandingPage;