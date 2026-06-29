import Container from "react-bootstrap/Container"
import Button from 'react-bootstrap/Button';
import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Store } from './Store';
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';


function SignIn() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(' ');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state; 

    // Define an asynchronous function called `submitHandler` that takes an event object as an argument.
const submitHandler = async (e) => {
    
    // Prevent the default behavior of the event (in this case, submitting a form).
    e.preventDefault();

    try {
        // Make a POST request to the server with the user's email and password.
        const { data } = await axios.post('/api/users/signin', {
            email,
            password,
        });
        // If the request is successful, dispatch an action to update the user's authentication status.
        ctxDispatch({type: 'USER_SIGNIN', payload: data})

        // Store the user's information in local storage as a JSON string.
        localStorage.setItem('userInfo', JSON.stringify(data));

        // Navigate to the specified URL, or the home page if no URL is specified.
        navigate(redirect || '/');
    } catch (err) {
        // If there's an error, alert the user that their email or password is incorrect.
        alert('Ops! your email or passowrd are incorrect');
    }
}


    //Avoid the SignIn page if you're logged in
    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    },[navigate, redirect, userInfo]);

    return (
        <Container style={{ width: '25rem'}} className="p-5">
            <h1>Sign In</h1>
            <Form className="AddToCart" onSubmit={submitHandler}>
                {/* Email Section */}
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required 
                    onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                {/* Password Section */}
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