import React, { useContext, useState, useReducer } from "react";
import axios from "axios";
import { Store } from "./Store";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false };

        default:
            return state;
    }
};

export default function ProfileScreen() {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const [name, setName] = useState(userInfo.name);
    const [surname, setSurname] = useState(userInfo.surname);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    });


    const submitHandler = async (e) => {
        // Destructure the loadingUpdate state variable and dispatch function from the useReducer hook, and set the initial value of loadingUpdate to false
        e.preventDefault();
        const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
            loadingUpdate: false,
        });
        
        // Define the submitHandler function, which is called when the form is submitted
        const submitHandler = async (e) => {
            e.preventDefault(); // Prevent the default form submission behavior
        
            try {
                // Make a PUT request to update the user profile data, passing in the name, surname, email, and password as data and the user's authorization token as a header
                const { data } = await axios.put(
                    '/api/users/profile',
                    {
                        name,
                        surname,
                        email,
                        password,
                    },
                    {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    }
                );
        
                // If the request is successful, dispatch an UPDATE_SUCCESS action to the reducer, update the user info in the context using ctxDispatch, save the updated user info to local storage, and display a success message to the user
                dispatch({
                    type: 'UPDATE_SUCCESS',
                });
                ctxDispatch({ type: 'USER_SIGNIN', payload: data });
                localStorage.setItem('userInfo', JSON.stringify(data));
                alert('User updated successfully');
            } catch (err) {
                // If there is an error, dispatch a FETCH_FAIL action to the reducer and display an error message to the user
                dispatch({
                    type: 'FETCH_FAIL',
                });
                alert(err);
            }
        }
        
        try {
            const { data } = await axios.put(
                '/api/users/profile',
                {
                    name,
                    surname,
                    email,
                    password,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            dispatch({
                type: 'UPDATE_SUCCESS',
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            alert('User updated successfully');
        } catch (err) {
            dispatch({
                type: 'FETCH_FAIL',
            });
            alert(err);
        }
    }
    return (
        <div>
            <h1>Your Profile board</h1>
            <Row className="d-flex justify-content-between my-2">
                <Col md={3} >
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="surname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className="mb-3">
                            <Button type="submit">Update</Button>
                        </div>
                    </Form>
                </Col>
                <Col md={7}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Privacy <label><i class="fa-solid fa-lock"></i></label></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Your data at safe</Card.Subtitle>
                            <Card.Text>
                                You can change your personal data whenever you want, we will take care of making them secure and accessible only to you.
                                Our privacy parameters and policies are aligned with the <em>GDPR - General Data Protection Regulation EU 2016/679</em>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>

    );

}
