import React from "react";
import '../App.css';
import image1 from '../images/details-5.jpeg';
import image2 from '../images/details-1.jpeg';
import image3 from '../images/details-4.jpeg';

function HeroesClient() {

    return (
        <div className="container-heroes">
            <span>
            <img src={image1} className="img-heroes" alt="banner" />
            <img src={image2} className="img-heroes" alt="banner" />
            <img src={image3} className="img-heroes" alt="banner" />
            </span>
        </div>
    )
}

export default HeroesClient;