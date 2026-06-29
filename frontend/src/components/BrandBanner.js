import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import adidas from '../icons/adidas.svg'
import nike from '../icons/nike.svg'
import puma from '../icons/puma.svg'
import thenorthface from '../icons/thenorthface.svg'
import underarmour from '../icons/underarmour.svg'


function BrandBanner() {
    return(
        <Container className="brand-section">
        <h3>TRENDING BRANDS</h3>
        <Row>
          <Col className="text-center">
            <img src={adidas} />
          </Col>
          <Col className="text-center">
            <img src={underarmour} />
          </Col>
          <Col className="text-center">
            <img src={thenorthface} />
          </Col>
          <Col className="text-center">
            <img src={nike} />
          </Col>
          <Col className="text-center">
            <img src={puma} />
          </Col>
        </Row>
      </Container>
    )
}

export default BrandBanner;