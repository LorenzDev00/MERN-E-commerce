import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import React, { useContext, useEffect, useReducer } from 'react';
import { Store } from './Store';
import Table from 'react-bootstrap/esm/Table';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

// Admin screen listing all registered users
export default function UserListScreen() {
    const [{ loading, error, users }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    const { state } = useContext(Store);
    const { userInfo } = state;

    // Fetch all users (admin-only endpoint)
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/users`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
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
            <h1>Registered Users</h1>
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
                            <th>NAME</th>
                            <th>SURNAME</th>
                            <th>EMAIL</th>
                            <th>IS ADMIN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}
