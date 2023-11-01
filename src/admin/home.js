import React from "react";
import '../App.css';
import NavBar from "./NavBar";
import Heroes from "./Heroes";
import Footer from "./Footer";
import homeImage from '../images/home-image.jpg';
import Map from "./Map";

const Home = () => {

    return (
        <div>
            <div>
                <NavBar />
                <Heroes />
            </div>

            <div className="container-body">
            <Map />
            </div>
            
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default Home;

