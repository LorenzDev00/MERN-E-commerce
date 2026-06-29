import { useContext } from "react";
import Col from "react-bootstrap/esm/Col";
import React from 'react';
import Row from "react-bootstrap/esm/Row";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "./Store";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import emptyBox from '../images/empty-box.png';


function CartScreen() { 
// Destructure state and dispatch from the global Store context using useContext hook
const { state, dispatch: ctxDispatch } = useContext(Store);

// Use the useNavigate hook to get access to the navigation object
const navigate = useNavigate();

// Destructure the cartItems array from the cart object in the state
const {
    cart: { cartItems },
} = state;

// Define an async function to update the cart with a new item and its quantity
const updateCartHandler = async (item, quantity) => {
    // Send a GET request to the backend to retrieve the updated product data
    const { data } = await axios.get(`/productsList/api/products/${item._id}`);

    // Check if the requested quantity is greater than the available stock
    if (data.countInStock < quantity) {
        // Display an alert message to the user indicating the product is out of stock
        window.alert('Sorry, the product is out of stock');
        return;
    }

    // Dispatch an action to add the item and its quantity to the cart in the global state
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
}

// Define a function to remove an item from the cart in the global state
const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
}

// Define a function to handle the checkout process
function checkOutHandler() {
    // Redirect the user to the sign-in page with a redirect URL to the shipping page
    navigate('/signin?redirect=/shipping')
}

    
    
    return (
        <div>
            <h1>Your Shopping Cart</h1>
            <Row>
                {

                    cartItems.length === 0 ? (
                        <div>
                            <Alert variant="info">
                                <h6>Hey it seems your cart is empty. It's time to go <Link to="/">Shopping</Link></h6>
                            </Alert>
                            <div className="text-center p-5">
                                <img src={emptyBox} alt="empty box" className="emptyBox"/>
                            </div>

                        </div>
                    )
                        :
                        (
                            <div className="d-flex justify-content-space-around">
                                <Col md={8}>

                                    {/* Prodoct details: img, quantity, remove */}
                                    <ListGroup>
                                        {
                                            cartItems.map((item) => (
                                                <ListGroup.Item key={item._id}>
                                                    <Row className="align-items-center">

                                                        {/* Product image section */}
                                                        <Col md={4}>
                                                            <img src={item.image} alt={item.productName} className="img-fluid rounded img-thumbnail"></img>{' '}
                                                            <Link to={`/product/${item.slug}`}>{item.productName}</Link>
                                                        </Col>

                                                        {/* Quantitiy managment section */}
                                                        <Col md={3}>
                                                            <Button variant="light" disabled={item.quantity === item.countInStock} onClick={() => updateCartHandler(item, item.quantity + 1)}>
                                                                <i className="fa-solid fa-plus"></i>
                                                            </Button>{' '}
                                                            <span>{item.quantity}</span>{' '}
                                                            <Button variant="light" disabled={item.quantity === 1} onClick={() => updateCartHandler(item, item.quantity - 1)}>
                                                                <i className="fa-solid fa-minus"></i>
                                                            </Button>{' '}
                                                        </Col>

                                                        {/* Remove product section */}
                                                        <Col md={3}><strong>{item.price}€</strong></Col>
                                                        <Col md={2}>
                                                            <Button variant="light" onClick={() => removeItemHandler(item)}>
                                                                <i className="fa-solid fa-trash"></i>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup>
                                </Col>

                                {/* Purchase details: total items, total price, checkout */}
                                <Col md={3}>
                                    <Card>
                                        <Card.Body>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    <h5>Items: {cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}</h5>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <h5>Total purchase : {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}€</h5>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Button variant="success" disabled={cartItems.length === 0} onClick={checkOutHandler}>
                                                        Proceed to Checkout
                                                    </Button>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            </div>
                        )

                }
            </Row>
        </div >
    )

}        

export default CartScreen; 