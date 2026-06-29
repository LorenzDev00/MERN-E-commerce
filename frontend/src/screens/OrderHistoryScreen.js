import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import React, { useContext, useEffect, useReducer } from "react";
import { Store } from './Store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';

// Define a reducer function that handles state updates based on dispatched actions
const reducer = (state, action) => {
    switch (action.type) {
        // When a FETCH_REQUEST action is dispatched, set the 'loading' property to true
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        // When a FETCH_SUCCESS action is dispatched, set the 'orders' property to the action payload and set 'loading' to false
        case 'FETCH_SUCCESS':
            return { ...state, orders: action.payload, loading: false };
        // When a FETCH_FAIL action is dispatched, set the 'error' property to the action payload and set 'loading' to false
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        // If an unknown action type is dispatched, simply return the current state
        default:
            return state;
    }
}

// Define a functional component called OrderHistoryScreen
export default function OrderHistoryScreen() {
    // Use the useContext hook to retrieve state from a context provider
    const { state } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();

    // Use the useReducer hook to manage state with the reducer function defined above
    // Initialize state with a 'loading' property set to true and an empty 'error' property
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    // Use the useEffect hook to perform a side effect, fetching data from an API endpoint
    // The effect will be triggered whenever the 'userInfo' property changes
    useEffect(() => {
        // Define an asynchronous function to fetch data from the API
        const fetchData = async () => {
            // Dispatch a FETCH_REQUEST action to indicate that the fetch operation has started
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                // Use the axios library to make an HTTP GET request to an API endpoint, passing the user's auth token in the request headers
                const { data } = await axios.get(
                    `/api/orders/mine`,
                    { headers: { Authorization: `Bearer ${userInfo.token}` } }
                );
                // If the request is successful, dispatch a FETCH_SUCCESS action with the fetched data as the payload
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                // If the request fails, dispatch a FETCH_FAIL action with the error object as the payload
                dispatch({ type: 'FETCH_FAIL', payload: error });
            }
        };
        // Call the fetchData function to initiate the fetch operation
        fetchData();
    }, [userInfo]);

    return (
        <div>
            <h1>Your orders history</h1>
            {
                loading ?
                    (<p>Loading...</p>)
                    : error ?
                        (<Alert variant='danger'>{error}</Alert>)
                        :
                        (
                            <Table className='table' striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAYMENT STATUS</th>
                                        <th>DELIVERY STATUS</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map((order) => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                <td>{order.totalPrice.toFixed(2)}</td>
                                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Not paid'}</td>
                                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'Not delivered'}</td>
                                                <td><Button variant='light' onClick={() => navigate(`/order/${order._id}`)}>Show details</Button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        )
            }
            <Card>
                <Card.Body>
                    <Card.Title>We care bout you !</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Check our Customer service</Card.Subtitle>
                    <Card.Text>
                    For any need, do not hesitate to contact us by <Link to='#'>Email</Link> or through our <Link to='#'>Customer Service Form</Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}