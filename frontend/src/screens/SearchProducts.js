import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Product from "../components/Product";
import Container from "react-bootstrap/esm/Container";
import { useLocation } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

export default function SearchProducts() {
    // Import the useLocation hook from the react-router-dom library
    const location = useLocation();

    // Create a new instance of URLSearchParams using the search string from the current URL
    const searchParams = new URLSearchParams(location.search);

    // Get the value of the "query" parameter from the searchParams object
    const query = searchParams.get("query");

    // Define a state variable called "products" and a function to update it called "setProducts"
    const [products, setProducts] = useState([]);

    // Use the useEffect hook to fetch data from the API and update the "products" state variable
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('productsList/api/products');
            setProducts(res.data);
        };
        fetchData();
    }, []);

    // Filter the "products" array to only include items that have a "category" property matching the "query" value
    const filteredCardData = products.filter(
        (card) => card.category == query
    );


    return (
        <Container>
            <br />
            <h2 style={{ color: "#0E2C4B" }}>Results for : <em style={{ color: "#FF7755" }}>{query}</em></h2>
            <hr />
            {

                query === "running" || query === "hiking" || query === "swimming" ?
                    (<Row>
                        {
                            filteredCardData.map(product => (
                                <Product key={product.slug} product={product} />
                            ))
                        }
                    </Row>)
                    :
                    (<Alert variant="danger">
                        <h6>No results</h6>
                        Try to type a more specific input next time !
                    </Alert>)


            }


        </Container>
    );
}