import Container from "react-bootstrap/Container"
import Button from 'react-bootstrap/Button';
import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Store } from './Store';
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';

// Sign-up form; validates password confirmation, registers the user, and signs them in
function SignUp() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [name, setName] = useState(' ');
    const [surname, setSurname] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(' ');
    const [confirmPassword, setConfirmPassword] = useState(' ');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }

        try {
          const { data } = await axios.post('/api/users/signup', {
            name,
            surname,
            email,
            password,
          });

          ctxDispatch({ type: 'USER_SIGNIN', payload: data })
          localStorage.setItem('userInfo', JSON.stringify(data));
          navigate(redirect || '/');
        } catch (err) {
          alert('Ops! your email or passowrd are incorrect');
        }
      }

    // Redirect away from this page if the user is already signed in
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <Container style={{ width: '25rem' }} className="p-5">
            <h1>Sign Up</h1>
            <Form className="AddToCart" onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" required
                        onChange={(e) => setName(e.target.value)} />
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type="texy" placeholder="Surname" required
                        onChange={(e) => setSurname(e.target.value)} />
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required
                        onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>

                <Button variant="warning" type="submit" className="w-100 my-2">
                    Sign up
                </Button>
                <div className="mb-3">
                    Already have an account?{' '}
                    <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
                </div>
            </Form>
        </Container>
    )

}

export default SignUp;
