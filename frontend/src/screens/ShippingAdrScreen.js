import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from './Store';
import CheckOutSteps from '../components/CheckOutSteps';


export default function ShippingAddressScreen() {
    // Import the 'useNavigate' and 'useContext' hooks from the React Router and React libraries, respectively.
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);

    // Destructure the user's shipping information from the global state.
    const {
        userInfo,
        cart: { shippingAddress },
    } = state;

    // Use the 'useState' hook to set the initial state of the component's shipping information fields.
    const [fullName, setFullName] = useState(shippingAddress.fullName || ' ');
    const [address, setAddress] = useState(shippingAddress.address || ' ');
    const [city, setCity] = useState(shippingAddress.city || ' ');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || ' ');
    const [country, setCountry] = useState(shippingAddress.country || ' ');

    // Use the 'useEffect' hook to redirect the user to the sign-in page if they are not signed in.
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping');
        }
    }, [userInfo, navigate])

    // Define a function that handles the submission of the shipping information form.
    const submitHandler = (e) => {
        e.preventDefault();
        // Use the 'dispatch' function from the context to save the user's shipping information to the global state.
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country,
            },
        });

        // Use the 'localStorage' API to save the user's shipping information to the browser's local storage.
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country,
            })
        );

        // Use the 'navigate' function to redirect the user to the payment page.
        navigate('/payment');
    };


    return (
        <div>
            <CheckOutSteps step1 step2></CheckOutSteps>
            <div className="d-flex justify-content-center">
                <div style={{ width: '25rem' }}>
                    <h1 className='my-3'>Your Shipping Address</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group class="mb-3" controlId="fullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required />
                        </Form.Group>
                        <Form.Group class="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required />
                        </Form.Group>
                        <Form.Group class="mb-3" controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required />
                        </Form.Group>
                        <Form.Group class="mb-3" controlId="postalCode">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required />
                        </Form.Group>
                        <Form.Group class="mb-3" controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required />
                        </Form.Group>
                        <div className='mb-3'>
                            <Button variant="warning" type="submit">
                                Continue
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}