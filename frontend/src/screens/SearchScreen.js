import axios from "axios";
import Alert from "react-bootstrap/Alert";
import React, { useEffect, useReducer, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Product from "../components/Product";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                products: action.payload.products,
                countProducts: action.payload.countProducts,
                loading: false,
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}


export default function SearchScreen() {

    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const category = sp.get('category') || 'all';
    const query = sp.get('query') || 'all';

    const [{ loading, error, products, countProducts }, dispatch] =
        useReducer(reducer, {
            loading: true,
            error: ' ',
        });

    const [categories, setCategories] = useState([]);

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const { data } = await axios.get(`productsList/api/products/categories`);
    //             setCategories(data);
    //         } catch (err) {
    //             alert("Errore 2 " + err);
    //         }
    //     };
    //     fetchCategories();
    // }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `productsList/api/products/search?category=${category}`
                );
                dispatch({ type: 'FETCH_SUCCESS', payload: data });

            } catch (err) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: err,
                });
                alert("Errore 1 " + err );
            }
        }
        fetchData();
    }, [category, error, query])

    const getFilterUrl = (filter, skipPathname) => {
        const filterCategory = filter.category || category;
        return `${skipPathname ? '' : '/search?'
            }category=${filterCategory}`;
    };

    return (
        <div>
            <Row>
                <Col md={3}>
                    <h3>Categories</h3>
                    <div>
                        <ul>
                            <li>
                                <Link
                                    className={'all' === category ? 'text-bold' : ''}
                                    to={getFilterUrl({ category: 'all' })}
                                >
                                    Any
                                </Link>
                            </li>
                            {categories.map((c) => (
                                <li key={c}>
                                    <Link
                                        className={c === category ? 'text-bold' : ''}
                                        to={getFilterUrl({ category: c })}
                                    >
                                        {c}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Col>
                <Col md={9}>
                    {
                        loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <Alert variant="danger">{error}</Alert>
                        ) : (
                            <Row className="justify-content-between mb-3">
                                <Col md={6}>
                                    <div>
                                        prova
                                        {/* {countProducts === 0 ? 'No' : countProducts} Results
                                        {query !== 'all' && ' : ' + query}
                                        {category !== 'all' && ' : ' + category}
                                        {category !== 'all' ? (
                                            <Button
                                                variant="light"
                                                onClick={() => navigate('/search')}
                                            >
                                                <i className="fas fa-times-circle"></i>
                                            </Button>
                                        ) : null} */}
                                    </div>
                                </Col>
                                <Row>
                                    {products.map((product) => (
                                        <Col sm={6} lg={4} className="mb-3" key={product._id}>
                                            <Product product={product} />
                                        </Col>
                                    ))}
                                </Row>

                            </Row>

                        )
                    }
                </Col>
            </Row >
        </div>
    )
}