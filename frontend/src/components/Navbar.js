import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/esm/Badge';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SearchBox from './SearchBox';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Store } from '../screens/Store';
import Logo from '../images/BuzzPitLogo.jpg';

function NavScrollExample() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    function signoutHandler() {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        window.location.href = '/signin';
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img
                            src={Logo}
                            width="100"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mx-auto"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <SearchBox />
                    </Nav>
                    <Nav className="ml-auto">
                        {
                            userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="admin-nav-dropdown">
                                    <NavDropdown.Item>
                                        <Link to="/admin/orders" className='nav-link'>
                                            Placed Orders
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link to="/admin/users" className='nav-link'>
                                            Registered users
                                        </Link>
                                    </NavDropdown.Item>
                                </NavDropdown>)
                        }
                    </Nav>
                    <Nav className="ml-auto">

                        {
                            userInfo ? (

                                <NavDropdown title={userInfo.name} id="navbarScrollingDropdown">
                                    <NavDropdown.Item>
                                        <Link to='/profile' className='nav-link'>
                                            Your Profile
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link to='/orderhistory' className='nav-link'>
                                            Order History
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <Link
                                        className="dropdown-item"
                                        to="#signout"
                                        onClick={signoutHandler}
                                    >
                                        Sign Out
                                    </Link>
                                </NavDropdown>

                            ) : (
                                <Link className="nav-link" to="/signin" >
                                    <i className="fa-solid fa-user"></i>{' '}
                                    Sign In
                                </Link>
                            )}
                        <Link to="/cart" className='nav-link'>
                            <i className="fa-solid fa-cart-shopping"></i>{' '}
                            Cart
                            {cart.cartItems.length > 0 &&
                                (<Badge pill bg="danger">
                                    {cart.cartItems.length}
                                </Badge>)}
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;