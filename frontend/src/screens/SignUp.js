import Container from "react-bootstrap/Container"
import Button from 'react-bootstrap/Button';
import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Store } from './Store';
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';


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

   // This function is an event handler for submitting a form that signs up a user
const submitHandler = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Check if the password and confirm password fields match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return; // Exit the function if passwords do not match
    }
  
    try {
      // Make a POST request to the server to sign up the user
      const { data } = await axios.post('/api/users/signup', {
        name,
        surname,
        email,
        password,
      });
  
      // Dispatch an action to update the user state in the global context
      ctxDispatch({ type: 'USER_SIGNIN', payload: data })
  
      // Store the user information in the local storage
      localStorage.setItem('userInfo', JSON.stringify(data));
  
      // Navigate the user to the redirect path or the home page
      navigate(redirect || '/');
    } catch (err) {
      // Alert the user if there is an error with the sign-up process
      alert('Ops! your email or passowrd are incorrect');
    }
  }
  

    //Avoid the SignIn page if you're logged in
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <Container style={{ width: '25rem' }} className="p-5">
            <h1>Sign Up</h1>
            <Form className="AddToCart" onSubmit={submitHandler}>
                {/* Generics Section */}
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

                {/* Password Section */}
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