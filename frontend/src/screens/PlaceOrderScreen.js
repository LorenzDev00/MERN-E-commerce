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

// Final checkout step: order review, price calculation, and order submission
export default function PlaceOrder() {

    const navigate = useNavigate();

    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
    });

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    // Derive items/shipping/tax/total prices from the current cart contents
    cart.itemsPrice = round2(
        cart.cartItems.reduce((a,c) => a + c.quantity * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice ;

    // Submits the order to the backend, clears the cart, and redirects to the order page
    const placeOrderHandler = async () => {
        try {
            dispatch({ type : 'CREATE_REQUEST'});

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
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                      },
                }
            );

            ctxDispatch({ type: 'CART_CLEAR'});
            dispatch({ type: 'CREATE_SUCCESS'});
            localStorage.removeItem('cartItems');
            navigate(`/order/${data.order._id}`);


        } catch (err) {
            dispatch({ type: 'CREATE_FAIL'});
            alert("Errore : " + err);
        }
    };

    // Redirect back to payment step if no payment method has been chosen
    useEffect(() => {
        if (!cart.paymentMethod) {
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
