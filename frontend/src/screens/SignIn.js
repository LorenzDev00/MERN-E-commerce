import Container from "react-bootstrap/Container"
import Button from 'react-bootstrap/Button';
import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Store } from './Store';
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';

// Sign-in form; on success stores the auth token and redirects back to the originating page
function SignIn() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(' ');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/users/signin', {
                email,
                password,
            });
            ctxDispatch({type: 'USER_SIGNIN', payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        } catch (err) {
            alert('Ops! your email or passowrd are incorrect');
        }
    }

    // Redirect away from this page if the user is already signed in
    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    },[navigate, redirect, userInfo]);

    return (
        <Container style={{ width: '25rem'}} className="p-5">
            <h1>Sign In</h1>
            <Form className="AddToCart" onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required 
                    onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required
                     onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Button variant="warning" type="submit" className="w-100 my-2">
                    Sign in
                </Button>
            <div className="mb-3">
                    Hey there, new here?{' '}
                    <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                </div>
            </Form>
        </Container>
    )

}

export default SignIn;
