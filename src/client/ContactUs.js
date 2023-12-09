import React from "react";
import '../App.css';
import NavBarClient from "./NavBarClient";
import MapClient from './MapClient';
import FooterClient from './FooterClient';

const ContactUs = () => {

    return (
        <div>
            <NavBarClient />
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
                    <MapClient />
                </div>
            
                <FooterClient />
            
        </div>

    );
}

export default ContactUs;
