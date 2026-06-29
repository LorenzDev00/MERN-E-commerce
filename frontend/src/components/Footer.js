import React from "react";

function Footer() {
    return(
        <footer className="text-center text-lg-start">
  <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

    <div className="me-5 d-none d-lg-block">
      <span>Stay tuned on our socials</span>
    </div>

    <div>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-google"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-instagram"></i>
      </a>
    </div>
  
  </section>

  <section className="">
    <div className="container text-center text-md-start mt-5">
   
      <div className="row mt-3">

        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
  
          <h6 className="text-uppercase fw-bold mb-4">
            <i className="fas fa-gem me-3"></i>BuzzPit
          </h6>
          <p>
            The E-commerce for selling sport clothing and releated gear
          </p>
        </div>

        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
     
          <h6 className="text-uppercase fw-bold mb-4">
            Products
          </h6>
          <p>
            <a href="#!" className="text-reset">Running</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Hiking</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Swimming</a>
          </p>
        </div>
     
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
    
          <h6 className="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
            <a href="#!" className="text-reset">Pricing</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Settings</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Orders</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Help</a>
          </p>
        </div>
  
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
         
          <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i className="fas fa-home me-3"></i> University of Parma, (PR) 45789, IT</p>
          <p>
            <i className="fas fa-envelope me-3"></i>
            lorenzTheKing@gmail.com
          </p>
          <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
          <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
        </div>
        
      </div>
  
    </div>
  </section>

  <div className="text-center p-4" >
    © 2023 Copyright:
    <a className="text-reset fw-bold" href="https://github.com/LorenzDev00">Lorenzo Bignami</a>
  </div>
 
        </footer>
    )
}

export default Footer;