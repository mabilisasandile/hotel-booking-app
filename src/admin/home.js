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
                <table>
                    <tr>
                        <td>
                            <Map />
                        </td>
                        <td>
                            <img src={homeImage} alt="banner" className="img-home" />
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default Home;

