import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CheckOutSteps from "../components/CheckOutSteps";
import { Store } from './Store';
import { useNavigate } from "react-router-dom";

// Checkout step 3: choose and persist the payment method
export default function PaymentMethodScreen() {

    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const {
        cart: { shippingAddress, paymentMethod },
    } = state;

    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'PayPal');

    // Redirect to shipping step if no shipping address has been set yet
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    // Save the selected payment method and proceed to order placement
    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder');
    };


    return (
        <div>
            <CheckOutSteps step1 step2 step3></CheckOutSteps>
            <div className="d-flex justify-content-center my-3">
                <div style={{ width: '25rem' }}>
                    <h1>Select Payment Method</h1>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Check
                                    type="radio"
                                    id="PayPal"
                                    label="PayPal"
                                    value="PayPal"
                                    checked={paymentMethodName === 'PayPal'}
                                    onChange={handlePaymentMethodChange} />
                            </Col>
                            <Col>
                                <Form.Check
                                    type="radio"
                                    id="Stripe"
                                    label="Credit Card"
                                    value="Credit Card"
                                    checked={paymentMethodName === 'Credit Card'}
                                    onChange={handlePaymentMethodChange} />
                            </Col>
                        </Row>
                        <Button variant="warning" type="submit" className="w-100 my-2" onClick={submitHandler}>Almost Done &#10140;</Button>
                    </Form>
                </div>
            </div>
        </div>

    )
}
