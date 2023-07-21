import React from "react";
import '../App.css';
import NavBarClient from "./NavBarClient";
import MapClient from './MapClient';
import FooterClient from './FooterClient';

const ContactUs = () => {

    return (
        <div>
            <NavBarClient />
            <body>
                <div className="container-body">
                    <MapClient />
                </div>
            </body>
            <footer>
                <FooterClient />
            </footer>
        </div>

    );
}

export default ContactUs;
