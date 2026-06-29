import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CheckOutSteps from "../components/CheckOutSteps";
import { Store } from './Store';
import { useNavigate } from "react-router-dom";


export default function PaymentMethodScreen() {

    const navigate = useNavigate();

    // Importing the useContext hook from React to use the global store and its dispatch function
    const { state, dispatch: ctxDispatch } = useContext(Store);

    // Extracting the shipping address and payment method from the global state
    const {
        cart: { shippingAddress, paymentMethod },
    } = state;

    // Initializing the paymentMethodName state with the value of the paymentMethod from the global state or 'PayPal' if not set
    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'PayPal');

    // Using useEffect hook to check if the shipping address is set, if not redirecting the user to the shipping page
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    // Handling the change event of the payment method selection and updating the paymentMethodName state accordingly
    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    // Handling the submission of the payment method form, dispatching the SAVE_PAYMENT_METHOD action to the global store, saving the payment method to local storage and redirecting the user to the place order page
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