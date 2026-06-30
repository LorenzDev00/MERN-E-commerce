import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import React, { useContext, useEffect, useReducer } from "react";
import { Store } from './Store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, orders: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

// Lists the orders placed by the currently authenticated user
export default function OrderHistoryScreen() {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();

    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    // Fetch the authenticated user's own orders
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const { data } = await axios.get(
                    `/api/orders/mine`,
                    { headers: { Authorization: `Bearer ${userInfo.token}` } }
                );
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error });
            }
        };
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
