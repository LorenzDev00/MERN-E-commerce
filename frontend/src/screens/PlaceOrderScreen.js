import React, { useContext, useEffect, useReducer } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate } from "react-router-dom";
import { Store } from './Store';
import CheckOutSteps from "../components/CheckOutSteps";
import axios from "axios";

// Define reducer function for updating state based on dispatched action
const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_REQUEST' :
            return {...state, loading: true};
        
        case 'CREATE_SUCCESS' :
            return {...state, loading: false};

        case 'CREATE_FAIL' :
            return {...state, loading: false};
        
        default :
            return state; 
    }
}

export default function PlaceOrder() {

    // Use the useNavigate hook from react-router-dom to navigate to other pages
    const navigate = useNavigate();

    // Use the useReducer hook to handle state changes based on dispatched actions
    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
    });

    // Use the useContext hook to access data stored in the global store
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    // Define a function to round a number to two decimal places
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    // Calculate the total cost of all items in the cart
    cart.itemsPrice = round2(
        cart.cartItems.reduce((a,c) => a + c.quantity * c.price, 0)
    );

    // Calculate the shipping price based on the total cost of all items in the cart
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);

    // Calculate the tax price based on the total cost of all items in the cart
    cart.taxPrice = round2(0.15 * cart.itemsPrice);

    // Calculate the total price, including the cost of all items, shipping, and tax
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice ;

    // Define a function to handle placing an order
    const placeOrderHandler = async () => {
        try {
            // Dispatch the CREATE_REQUEST action to indicate a new order is being created
            dispatch({ type : 'CREATE_REQUEST'});

            // Send a POST request to the server with the order details
            const { data } = await axios.post(
                '/api/orders',
                {
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.paymentMethod,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice
                },
                {
                    // Set the authorization header to include the user's token
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                      },
                }
            );

            // Dispatch the CART_CLEAR action to remove all items from the cart
            ctxDispatch({ type: 'CART_CLEAR'});

            // Dispatch the CREATE_SUCCESS action to indicate the order was successfully created
            dispatch({ type: 'CREATE_SUCCESS'});

            // Remove the cart items from local storage
            localStorage.removeItem('cartItems');

            // Navigate to the page showing the newly created order
            navigate(`/order/${data.order._id}`);


        } catch (err) {
            dispatch({ type: 'CREATE_FAIL'});
            alert("Errore : " + err);
        }
    };

    useEffect(() => {
        // It checks if the payment method is not set in the cart state.
        if (!cart.paymentMethod) {
            // If payment method is not set, it redirects the user to the payment page.
            navigate('/payment');
        }
    },[cart,navigate]);

    return (
        <div>
            <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
            <h1 className="my-3">Order Preview</h1>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Shipping details</Card.Title>
                            <Card.Text>
                                <strong>Customer: </strong> {cart.shippingAddress.fullName} <br />
                                <strong>Address: </strong> {cart.shippingAddress.address}, {cart.shippingAddress.city},
                                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                            </Card.Text>
                            <Link to="/shipping">Edit</Link>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment details</Card.Title>
                            <Card.Text>
                                <strong>Method: </strong> {cart.paymentMethod}
                            </Card.Text>
                            <Link to="/payment">Edit</Link>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Items selected</Card.Title>
                            <ListGroup variant="flush">
                                {
                                    cart.cartItems.map((item) => (
                                        <ListGroup.Item key={item._id}>
                                            <Row className="align-items-center">
                                                <Col md={6}>
                                                    <img src={item.image} alt={item.productName} className="img-fluid rounded img-thumbnail"></img>{' '}
                                                    <Link to={`/product/${item.slug}`}>{item.productName}</Link>
                                                </Col>
                                                <Col md={3}><span>{item.quantity}</span></Col>
                                                <Col md={3}><span>{item.price}€</span></Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                       <Card.Body>
                        <Card.Title>Order Summary</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>{cart.itemsPrice.toFixed(2)}€</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>{cart.shippingPrice.toFixed(2)}€</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>{cart.taxPrice.toFixed(2)}€</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Order Total</strong></Col>
                                    <Col>{cart.totalPrice.toFixed(2)}€</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="d-grid">
                                    <Button
                                    type="button"
                                    variant="success"
                                    onClick={placeOrderHandler}
                                    disabled={cart.cartItems.length === 0}>Place Order</Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                        </Card.Body> 
                    </Card>
                </Col>
            </Row>
        </div>
    )
}