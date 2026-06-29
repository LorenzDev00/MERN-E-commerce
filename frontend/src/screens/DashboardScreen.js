import Alert from 'react-bootstrap/Alert';
import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from './Store';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from 'react-bootstrap/esm/Table';

// Define a reducer function that handles state updates based on dispatched actions
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                orders: action.payload,
                loading: false,
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

// Define a functional component called DashboardScreen
export default function DashboardScreen() {

    // Import required hooks from React Router
    const navigate = useNavigate();

    // Import required context and state variables from Store component
    const { state } = useContext(Store);
    const { userInfo } = state;
    const { userInfo1 } = state;

    // Define a state variables with their initial values
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    // Use the useEffect hook to fetch data from the server when the component mounts or when userInfo changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Dispatch an action to indicate that the request is being made
                dispatch({ type: 'FETCH_REQUEST' });

                // Make a GET request to the server to fetch the user's orders
                const { data } = await axios.get(`/api/orders`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });

                // Dispatch an action to update the state with the fetched orders
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                // Dispatch an action to update the state with the error message
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: err,
                });
            }
        };
        fetchData();
    }, [userInfo]);


    return (
        <div>
            <h1>Administration Dashboard</h1>
            <hr />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <Table className="table" striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAYMENT STATUS</th>
                            <th>DELIVERY STATUS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user ? order.user.name : 'DELETED USER'}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td><strong>{order.totalPrice.toFixed(2)} € </strong></td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Not Paid'}</td>
                                <td>
                                    {order.isDelivered
                                        ? order.deliveredAt.substring(0, 10)
                                        : 'Not Delivered'}
                                </td>
                                <td>
                                    <Button
                                        type="button"
                                        variant="light"
                                        onClick={() => {
                                            navigate(`/order/${order._id}`);
                                        }}
                                    >
                                        Details
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}