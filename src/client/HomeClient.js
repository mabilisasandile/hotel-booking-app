import React from "react";
import '../App.css';
import NavBarClient from "./NavBarClient";
import HeroesClient from "./HeroesClient";
import homeImage from '../images/home-image.jpg';
import MapClient from './MapClient';
import FooterClient from './FooterClient';

const HomeClient = () => {

    return (
        <div>
            <NavBarClient />
            <HeroesClient />
            <div className="container-body">
            <table>
                    <tr>
                        <td>
                            <MapClient />
                        </td>
                        <td>
                            <img src={homeImage} alt="banner" className="img-home" />
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <FooterClient />
            </div>
        </div>

    );
}

export default HomeClient;
