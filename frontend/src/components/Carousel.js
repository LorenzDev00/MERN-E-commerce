import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import hiking from '../images/hiking.jpg';
import running from '../images/running.jpg';
import swimming from '../images/swimming.jpg';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} data-aos="zoom-in">
      <Carousel.Item>
        <Container fluid>
        <img
          className="d-block w-100 adj"
          src={running}
        //   src="holder.js/800x400?text=First slide&bg=373940"
          alt="First slide"
          />
        </Container>
        <Carousel.Caption>
          <h3>Ready, Steady, Run</h3>
          <p>Top quality sportwear to run everywhere, everytime</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <Container fluid>
        <img
          className="d-block w-100 adj"
          src={hiking}
          alt="Second slide"
        />
        </Container>
        <Carousel.Caption>
          <h3>Inhale and Exhale</h3>
          <p>Enjoy the high fresh air, check for the beast gear for a trip</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <Container fluid>
        <img
          className="d-block w-100 adj"
          src={swimming}
          alt="Third slide"
        />
        </Container>
        <Carousel.Caption>
          <h3>Under the water</h3>
          <p>
            Reach a strong performance underwater with our products
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;