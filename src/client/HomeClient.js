import React from "react";
import '../App.css';
import NavBarClient from "./NavBarClient";
import HeroesClient from "./HeroesClient";
import homeImage from '../images/home-image.jpg';
import MapClient from './MapClient';
import FooterClient from './FooterClient';
import HomeScreenInfo from "../components/HomeScreenInfo";

const HomeClient = () => {

    return (
        <div>
            <NavBarClient />
            <HeroesClient />
            <div className="container-body">
                <div className="half-width">
                    <MapClient />
                </div>
                <div className="half-width">
                    <HomeScreenInfo />
                </div>
            </div>
            <FooterClient />
        </div>

    );
}

export default HomeClient;
