import React from "react";
import '../App.css';
import NavBar from "./NavBar";
import Footer from "./Footer";
import Map from "./Map";


const Contact = () => {

    return (
        <div>
            <NavBar />
                <div style={{ alignItems:'center', justifyContent:'center', height: '400px'}}>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h2>Contact Us</h2>
                    <br></br>
                    <h4>Phone: 0734908931</h4> 
                    <br></br>
                    <h4>Email: mabilisasandile@gmail.com</h4>
                    <br></br>
                    <h3>Our Location: ZA, Gauteng, Pretoria</h3>
                </div>
            
                <div>
                    <Map />
                </div>
            
                <Footer />
            
        </div>

    );
}

export default Contact;
