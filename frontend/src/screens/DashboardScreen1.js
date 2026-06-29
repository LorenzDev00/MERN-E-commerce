import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import React, { useContext, useEffect, useReducer } from 'react';
import { Store } from './Store';
import { Tab } from 'bootstrap';
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

export default function UserListScreen() {
// Define state and dispatch using the useReducer hook and initial state
const [{ loading, error, users }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
});

// Retrieve user information from the global state using the useContext hook
const { state } = useContext(Store);
const { userInfo } = state;

// Use the useEffect hook to fetch user data when the component mounts or when the user information changes
useEffect(() => {
    const fetchData = async () => {
        try {
            // Dispatch an action to indicate that data is being fetched
            dispatch({ type: 'FETCH_REQUEST' });

            // Fetch user data from the server
            const { data } = await axios.get(`/api/users`, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });

            // Dispatch an action to update the state with the fetched data
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
        } catch (err) {
            // Dispatch an action to indicate that fetching data failed
            dispatch({
                type: 'FETCH_FAIL',
                payload: err,
            });
        }
    };
    fetchData();
}, [userInfo]); // Only refetch user data if the user information changes


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