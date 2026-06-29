import React from "react";
import Carousel from "../components/Carousel"
import BrandBanner from "../components/BrandBanner"
import Images from "./ImagesScreen";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

function DeafultScreen() {
    return (
        <div>
            <section>
                <Carousel />
                <hr />
                <BrandBanner />
                <hr />
                <Container className="d-flex justify-content-center align-items-center ShopNowbg"  data-aos="fade-up"data-aos-delay="15">
                    <div className="d-flex flex-column">
                        <h3 className="txt-color">IT IS TIME TO LEVEL UP !</h3>
                        <Link to="/productList">
                            <Button className="w-100 btn-color">Shop Now</Button>
                        </Link>
                    </div>
                </Container>
                <hr />
                <Images />
                <hr />
            </section>
        </div>
    )
}

export default DeafultScreen;