import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom'


const Product = ({ product }) => (

  <Col xs={11} md={6} lg={3} key={product.id}>
    <Card style={{ width: '18rem' }} className="my-2" data-aos="fade-up">
      <Link to={`/product/${product.slug}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body>
        {
          product.countInStock > 0 ?
            (<Badge bg="light" className='invisible mb-2'>In Stock</Badge>)
            :
            (<Badge bg="danger" className="mb-2">Out of Stock</Badge>)
        }
        <Card.Title>{product.productName}</Card.Title>
        <Card.Text className="priceNumber1">
          <p>Brand: <strong>{product.brand}</strong></p>
        </Card.Text>
        <Card.Text className="priceNumber">
          {product.price}€
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
)

export default Product;
