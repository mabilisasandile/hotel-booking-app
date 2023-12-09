import React from "react";
import '../App.css';
import NavBar from "./NavBar";
import Heroes from "./Heroes";
import Footer from "./Footer";
import homeImage from '../images/home-image.jpg';
import Map from "./Map";
import HomeScreenInfo from "../components/HomeScreenInfo";

const Home = () => {

    return (
        <div>
            <div>
                <NavBar />
                <Heroes />
            </div>

            <div className="container-body">
                <div className="half-width">
                    <Map />
                </div>
                <div className="half-width">
                    <HomeScreenInfo />
                </div>
            </div>
            
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default Home;

