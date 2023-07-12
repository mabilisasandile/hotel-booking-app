import React from "react";
import '../App.css';
import { useState } from "react";
import { Link } from 'react-router-dom';
import hotelLogo from '../images/hotel-logo.jpg';
import NewRoom from "./NewRoom";
import NavBar from "./NavBar";
import Heroes from "./Heroes";
import homeImage from '../images/home-image.jpg';

const Home = () => {

    return (
        <div>
            <NavBar />
            <Heroes />
            <body>
                <div className="container-body">
                    <img src={homeImage} alt="banner" className="img-home" />
                </div>
            </body>
            <footer>
                <div className="container-footer">
                    <table>
                        <thead>
                            <tr>
                                <th>Address</th>
                                <th>Legal</th>
                                <th>Essentials</th>
                                <th>Social media</th>
                            </tr>
                            <tr>
                                <td>Gauteng</td>
                                <td>Copyright</td>
                                <td>Email</td>
                                <td>Twitter</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </footer>
        </div>

    );
}

export default Home;

