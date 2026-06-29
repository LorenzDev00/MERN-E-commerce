import { useContext, useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// Bootstrap 
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/esm/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/esm/Button';
import Alert from 'react-bootstrap/Alert';

import { Store } from './Store';


function ProductSreen() {
    // Importing the 'useNavigate' and 'useParams' hooks from React Router
    const navigate = useNavigate();
    const params = useParams();
    const { slug } = params;

    // Declaring a state variable called 'product' and initializing it as an empty array using the 'useState' hook
    const [product, setProduct] = useState([]);

    // Creating a side effect that triggers a fetch request when the 'slug' parameter changes and updates the 'product' state variable with the response data
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`/productsList/api/products/slug/${slug}`);
            setProduct(res.data);
        };
        fetchData();
    }, [slug])

    // Accessing the 'cart' state variable from the global Store context using the 'useContext' hook and destructuring the 'cart' property
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart } = state;

    // Creating a function that adds a product to the cart
    const addToCartHandler = async () => {
        // Checking if the product already exists in the cart and updating the quantity accordingly
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        // Fetching the full product details from the server to check if it's in stock
        const { data } = await axios.get(`/productsList/api/products/${product._id}`);

        // Checking if the product is in stock and displaying an error message if not
        if (data.countInStock < quantity) {
            window.alert('Sorry, the product is out of stock');
            return;
        }

        // Dispatching an action to add the product to the cart in the global Store context and navigating to the cart page
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: 1 } });
        navigate('/cart');
    };


    return (
        <Container>
            <Row className="my-4">
                <Col md={5}>
                    <img
                        className="img-large"
                        src={product.image}
                        alt={product.productName}
                    />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>{product.productName}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Category: </strong>{product.category}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {product.description}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Delivery: </strong> Set during payment procedure
                            <br />
                            <strong>Return: </strong> Set during payment procedure
                            <br />
                            <br />
                            Ts&Cs apply. <a href='#'>More delivery info</a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Alert variant="secondary">
                                <strong>FABRIC SPECIFICATIONS</strong>
                                <br />
                                Recycled cotton requires less energy and water than producing virgin cotton<br /><a href='#'>Check the details</a>
                            </Alert>
                        </ListGroup.Item>
                    </ListGroup>
                    <Button variant="light" onClick={() => { navigate('/productList') }}>
                        <i className='fa-solid fa-arrow-left'></i> Go Back
                    </Button>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col><strong>{product.price}€</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{product.countInStock > 0 ?
                                            (<Badge bg="success">In Stock</Badge>)
                                            :
                                            (<Badge bg="danger">unavailable</Badge>)
                                        }
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {product.countInStock > 0 ? (
                                        <div className="d-grid AddToCart">
                                            <Button onClick={addToCartHandler} variant="warning">
                                                Add to Cart
                                            </Button>
                                        </div>
                                    )
                                        :
                                        (<Alert variant="primary">
                                            <strong>RESTOCKING</strong>
                                            <br />
                                            We are refilling our stocks for this product <a href='#'>Get notified once ready</a>
                                        </Alert>)}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    )
}

export default ProductSreen;