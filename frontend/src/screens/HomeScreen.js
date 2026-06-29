import { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import Container from 'react-bootstrap/esm/Container';
import Button from "react-bootstrap/Button";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import SearchBox from '../components/SearchBox';

// import data from '../data';

function HomeScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('productsList/api/products');

            setProducts(res.data);
        };
        fetchData();
    }, [])

    const [selectedCategory, setSelectedCategory] = useState("all");

    

    const filteredCardData = products.filter(
        (card) => selectedCategory === "all" || card.category === selectedCategory 
    );

    return (
        <Container>
            <Row>
                <ButtonGroup className="mb-2 my-4">
                    <Button value="all"  variant="light"
                        onClick={(event) => setSelectedCategory(event.target.value)}>All <i class="fa-solid fa-globe"></i></Button>
                    <Button value="running"  variant="light"
                        onClick={(event) => setSelectedCategory(event.target.value)}>Running <i class="fa-solid fa-person-running"></i></Button>
                    <Button value="hiking"  variant="light"
                        onClick={(event) => setSelectedCategory(event.target.value)}>Hiking <i class="fa-solid fa-person-hiking"></i></Button>
                    <Button value="swimming"  variant="light"
                        onClick={(event) => setSelectedCategory(event.target.value)}>Swimming <i class="fa-solid fa-person-swimming"></i></Button>
                </ButtonGroup>

            </Row>

            {

                <Row>
                    {filteredCardData.map(product => (
                        <Product key={product.slug} product={product} />
                    ))}
                </Row>

            }


        </Container>
    );
}

export default HomeScreen