import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';


export default function SearchBox() {

    const [searchQuery, setSearchQuery] = useState(" ");

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // function handleInputChange(event) {
    //     setInputValue(event.target.value);
    // }

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     props.onSubmit(inputValue);
    // }


    // const navigate = useNavigate();
    // const [selectedCategory1, setSelectedCategory1] = useState("swimming");
    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     navigate('/productList');
    //     state: selectedCategory1;
    // };


    return (
        <Form className='d-flex'>
            <Form.Control type="text" placeholder="search" value={searchQuery} onChange={handleInputChange} />
            <Link to={`/searchProducts?query=${searchQuery}`}>
                <Button type="submit" variant='outline-warning' className="search"><i className="fa-solid fa-magnifying-glass"></i></Button>
            </Link>
        </Form>
    )

}