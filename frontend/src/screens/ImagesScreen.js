import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import run from "../images/run.jpg";
import hike from "../images/hike.jpg";
import swim from "../images/swim.jpg";
import img1 from "../images/Img1.png";
import img2 from "../images/Img2.png";

function ImagesScreen() {
    return (
      <div>
        <section className="imageSection" data-aos="fade-up"data-aos-delay="15">
            <h2 className="text-center">Stories from our BuzzPiters</h2>
            <p className="text-center">dicovery new people like you</p>
            <Row  data-aos="fade-up"data-aos-delay="15">
                <Col className="text-center">
                    <img src={run} style={{ width: '20rem' }} className="imageDec" />
                    <h5 className="text-center my-2">Javier Ramirez</h5>
                    <p> - Madrid, Spain - </p>
                    <p><i>Never felt so confrotable while running, it's like having a second skin</i></p>
                </Col>
                <Col className="text-center">
                    <img src={hike} style={{ width: '20rem' }} className="imageDec" />
                    <h5 className="text-center my-2">Stefan Hermann</h5>
                    <p> - Innsbruck, Austria - </p>
                    <p><i>I find peace up above the cloud, BuzzPit allows me to reach every peak</i></p>
                </Col>
                <Col className="text-center">
                    <img src={swim} style={{ width: '20rem', height: '29.5rem' }} className="imageDec" />
                    <h5 className="text-center my-2">Behrnard Ernst</h5>
                    <p> - Sonderborg, Denmark - </p>
                    <p><i>Technique is the key in swimming, with these speedos I can slide in the water with no effort</i></p>
                </Col>
            </Row>
        </section>
        <hr />
        <Row className="green py-5"  data-aos="fade-up"data-aos-delay="15">
        <h2 className="text-center">Green and sustainable since the beginning</h2>
        <p className="text-center">Check our policy for environment & manifacturing</p>
        </Row>
        <hr />
        <section className="imageSection1"  data-aos="fade-up"data-aos-delay="15">
        <h2 className="text-center">Coming next season</h2>
            <p className="text-center">Our own brand clohing line</p>
            <Row  data-aos="fade-up"data-aos-delay="15">
               <Col className="text-center">
                <img src={img1} style={{ width: '30rem' }}/>
                <h5 className="text-center my-2">For him</h5>
               </Col> 
               <Col className="text-center">
               <img src={img2} style={{ width: '30rem' }}/>
               <h5 className="text-center my-2">For Her</h5>
               </Col>
            </Row>
        </section>
    </div>
    )
}

export default ImagesScreen;