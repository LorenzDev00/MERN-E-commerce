import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

// Search bar: navigates to the search results page with the query as a URL param
export default function SearchBox() {

    const [searchQuery, setSearchQuery] = useState(" ");

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Form className='d-flex'>
            <Form.Control type="text" placeholder="search" value={searchQuery} onChange={handleInputChange} />
            <Link to={`/searchProducts?query=${searchQuery}`}>
                <Button type="submit" variant='outline-warning' className="search"><i className="fa-solid fa-magnifying-glass"></i></Button>
            </Link>
        </Form>
    )

}
