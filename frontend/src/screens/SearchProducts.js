import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Product from "../components/Product";
import Container from "react-bootstrap/esm/Container";
import { useLocation } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

// Search results page driven by the navbar search box; filters fetched products by category keyword
export default function SearchProducts() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('productsList/api/products');
            setProducts(res.data);
        };
        fetchData();
    }, []);

    // Only matches products whose category equals the search query
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
